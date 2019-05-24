require 'rails_helper'

RSpec.describe Api::FeedsController, type: :controller do
  let(:user1) { create(:user, confirmed: true) }
  let!(:post1) { create(:post, user: user1) }
  let!(:post2) { create(:post, user: user1) }
  before do
    login(user1)
  end

  describe '#index' do
    before do
      get :index
    end
    context 'reponse' do
      it { expect(response).to have_http_status(200) }
      it { expect(JSON.parse(response.body)[0]).to include('post_id' => post2.id) }
    end
  end
end
