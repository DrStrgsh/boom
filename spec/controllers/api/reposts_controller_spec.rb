require 'rails_helper'

RSpec.describe Api::RepostsController, type: :controller do
  let(:user1) { create(:user, confirmed: true) }
  let(:user2) { create(:user, confirmed: true) }
  let!(:post1) { create(:post, user: user1) }
  let!(:post2) { create(:post, user: user2) }
  let!(:repost1) { create(:repost, user: user1, post: post2) }
  before do
    login(user1)
  end
  
  describe '#index' do
    before do
      get :index
    end
    context 'response' do
      it { expect(response).to have_http_status(200) }
      it { expect(JSON.parse(response.body)[0]).to include('id' => repost1.id) }
    end
  end

  describe '#show' do
    before do
      get :show, params: {
        id: repost1.id
      }
    end
    context 'response' do
      it { expect(response).to have_http_status(200) }
      it { expect(JSON.parse(response.body)).to include('id' => repost1.id) }
    end
  end

  describe '#create' do
    context 'success' do
      before do
        post :create, params: {
          id: post2.id,
          name: 'One'
        }
      end
      it { expect(response).to have_http_status(201) }
      it { expect(JSON.parse(response.body)).to include('post_id' => post2.id) }
    end
    context 'failure by validates' do
      before do
        post :create, params: {
          id: post1.id,
          name: 'One'
        }
      end
      it { expect(response).to have_http_status(400) }
    end
  end

  describe '#update' do
    context 'success' do
      before do
        put :update, params: {
          id: repost1.id,
          name: 'Two'
        }
      end
      it { expect(response).to have_http_status(200) }
      it { expect(JSON.parse(response.body)).to include('name' => 'Two') }
    end
    context 'failure' do
      before do
        login(user2)
        put :update, params: {
          id: repost1.id,
          name: 'Two'
        }
      end
      it { expect(response).to have_http_status(401) }
      it { expect(JSON.parse(response.body)).to include('id' => repost1.id) }
    end
  end

  describe '#destroy' do
    let!(:repostForDelete) { create(:repost, user: user1, post: post1) }
    context 'success' do
      before do
        delete :destroy, params: {
          id: repostForDelete.id
        }
      end
      it { expect(response).to have_http_status(200) }
    end
    context 'failure' do
      before do
        login(user2)
        delete :destroy, params: {
          id: repostForDelete.id
        }
      end
      it { expect(response).to have_http_status(401) }
      it { expect(JSON.parse(response.body)).to include('id' => repostForDelete.id) }
    end
  end
end
