require 'rails_helper'

RSpec.describe User, type: :model do
  let(:user) { create(:user) }

  describe '.validation' do
    it 'is valid with valid data' do
      expect(user).to be_valid
    end

    it 'is not valid without password' do
      user2 = build(:user, password: nil)
      expect(user2).not_to be_valid
    end

    it 'is not valid without email' do
      user2 = build(:user, email: nil)
      expect(user2).not_to be_valid
    end

    it 'is not valid without username' do
      user2 = build(:user, username: nil)
      expect(user2).not_to be_valid
    end

    it 'is not valid with different password and password confirmation' do
      user2 = build(:user, password: '123456', password_confirmation: '123654')
      expect(user2).not_to be_valid
    end
  end

  describe '#confirm' do
    let(:user2) { create(:user, confirmed: false) }
    it 'user is confirmed' do
      user2.confirm
      expect(user2).to have_attributes(confirmed: true, confirmed_at: Time)
    end
  end

  describe '#token' do
    context 'check token' do
      it 'true if have token' do
        token = 'fddsw123'
        expect(user.have_token?(token)).to eq true
      end
    end
    context 'create reset token' do
      it 'create' do
        user.create_reset_token
        expect(user).not_to have_attributes(reset_pass: nil, reset_pass_send_at: nil)
      end
    end
    context 'check expired' do
      it 'false if reset pass send at < 2 hours' do
        user.create_reset_token
        expect(user.password_reset_expired?).to eq false
      end
    end
    context 'confirm token' do
      it 'confirm token is presence' do
        expect(user.send(:create_confirmation_token)).not_to eq nil
      end
    end
    context 'new token' do
      it 'token is presence' do
        expect(User.new_token).not_to eq nil
      end
    end
    context 'reset token' do
      it 'reset token presence' do
        expect(User.reset_token).not_to eq nil
      end
    end
  end

  describe '#relations' do
    let(:user2) { create(:user, id: 1) }
    context '#following' do
      it 'user following for another user' do
        user.follow(user2)
        expect(user.following?(user2)).to eq true
      end
    end

    context '#follow' do
      it 'user follow for another user' do
        user.follow(user2)
        expect(user.following?(user2)).to eq true
      end
    end
    context '#unfollow' do
      before { user.follow(user2) }
      it 'user unfollow for another user' do
        user.unfollow(user2)
        expect(user.following?(user2)).to eq false
      end
    end
  end

  describe '#feeds' do
    let(:user1) { create(:user) }
    let(:post1) { create(:post, user: user1) }
    let(:user2) { create(:user) }
    let(:post2) { create(:post, user: user2) }
    let(:repost) { create(:repost, post: post1, user: user2) }
    it 'posts feeds' do
      user1.follow(user2)
      expect(user1.feed).to eq [post1, post2]
    end
    it 'reposts feeds' do
      user1.follow(user2)
      expect(user1.feed_reposts).to eq [repost]
    end
  end
end
