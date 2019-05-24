require 'rails_helper'

RSpec.describe Post, type: :model do
  let(:user) { create(:user) }
  let(:post) { create(:post, user: user) }

  it 'valid with valid data' do
    expect(post).to be_valid 
  end

  it 'is not valid without title' do
    post2 = build(:post, title: nil)
    expect(post2).not_to be_valid
  end

  it 'is not valid without body' do
    post2 = build(:post, body: nil)
    expect(post2).not_to be_valid
  end

  it 'is not create without user' do
    post2 = build(:post, user: nil)
    expect(post2).not_to be_valid
  end
end
