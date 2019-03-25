require 'rails_helper'

RSpec.describe Api::LikesController, type: :controller do
  let(:user1) { create(:user, confirmed: true)}
  let!(:post1) { create(:post, user: user1)}
  before do
    login(user1)
  end
  describe '#index' do
    before do
      get :index, params: {
        id: post1.id
      }
    end
    it { expect(response).to have_http_status(200) }
    it { expect(JSON.parse(response.body)).to eq false }
  end

  describe '#create' do
    before do
      post :create, params: {
        id: post1.id
      }
    end
    it { expect(response).to have_http_status(200) }
  end

  describe '#destroy' do
    before do
      delete :destroy, params: {
        id: post1.id
      }
    end
    it { expect(response).to have_http_status(200) }
  end
end
