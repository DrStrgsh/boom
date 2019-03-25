require 'rails_helper'

RSpec.describe Repost, type: :model do
  let(:user) { create(:user) }
  let(:user2) { create(:user) }
  let(:post) { create(:post, user: user) }
  let(:repost) { create(:repost, post: post, user: user2) }

  it 'is valid with data' do
    expect(repost).to be_valid
  end

  it 'is valid without name of repost' do
    repost2 = build(:repost, name: nil, post: post, user: user2)
    expect(repost2).to be_valid
  end
end
