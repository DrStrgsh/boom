require 'rails_helper'

RSpec.describe Api::FeedRepostsController, type: :controller do
  let(:user1) { create(:user, confirmed: true) }
  let(:user2) { create(:user, confirmed: true) }
  let!(:post1) { create(:post, user: user1) }
  let!(:post2) { create(:post, user: user1) }
  let!(:respost1) { create(:repost, post: post1, user: user2) }
  let!(:respost2) { create(:repost, post: post2, user: user2) }
  before do
    login(user2)
  end

  describe '#index' do
    before do
      get :index
    end
    context 'reponse' do
      it { expect(response).to have_http_status(200) }
      it { expect(JSON.parse(response.body)[1]).to include('post_id' => post2.id) }
    end
  end
end
