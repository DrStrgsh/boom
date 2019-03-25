require 'rails_helper'

RSpec.describe Comment, type: :model do
  let(:user) { create(:user) }
  let(:user2) { create(:user) }
  let(:post) { create(:post, user: user) }
  let(:comment) { create(:comment, user: user2, post: post) }

  it 'valid with valid data' do
    expect(comment).to be_valid
  end

  it 'is not valid without user' do
    comment2 = build(:comment, user: nil)
    expect(comment2).not_to be_valid
  end

  it 'is not calid without post' do
    comment2 = build(:comment, post: nil)
    expect(comment2).not_to be_valid
  end
end