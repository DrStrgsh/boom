require 'rails_helper'

RSpec.describe Api::RelationshipsController, type: :controller do
  let(:user1) { create(:user, confirmed: true) }
  let(:user2) { create(:user, confirmed: true) }
  before do
    login(user1)
  end

  describe '#show' do
    before do
      user1.follow(user2)
      get :show, params: {
        id: user2.id
      }
    end
    it { expect(response).to have_http_status(200) }
    it { expect(JSON.parse(response.body)).to eq true }
  end

  describe '#create' do
    context 'success' do
      before do
        post :create, params: {
          followed_id: user2.id
        }
      end
      it { expect(response).to have_http_status(201) }
    end
    context 'failure' do
      before do
        user1.follow(user2)
        post :create, params: {
          followed_id: user2.id
        }
      end
      it { expect(response).to have_http_status(400) }
    end
  end

  describe '#destroy' do
    before do
      user1.follow(user2)
      delete :destroy, params: {
        id: user2.id
      }
    end
    it { expect(response).to have_http_status(200) }
  end
end
