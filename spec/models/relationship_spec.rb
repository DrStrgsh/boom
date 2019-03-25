require 'rails_helper'

RSpec.describe Relationship, type: :model do
  let(:relationship) { create(:relationship) }
  describe '.validations' do
    context 'all validations' do
      it 'is valid with follower_id' do
        expect(relationship).to be_valid
      end
      it 'is not valid without followed_id' do
        rel = build(:relationship, followed_id: nil)
        expect(rel).not_to be_valid
      end
      it 'is not valid without follower_id' do
        rel = build(:relationship, follower_id: nil)
        expect(rel).not_to be_valid
      end
      it 'is not valid without followed user' do
        rel = build(:relationship, followed: nil)
        expect(rel).not_to be_valid
      end
      it 'is not valid without follower user' do
        rel = build(:relationship, follower: nil)
        expect(rel).not_to be_valid
      end
    end
  end
end
