require 'rails_helper'

RSpec.describe Api::PostsController, type: :controller do
  let(:user) { create(:user, confirmed: true) }
  let(:userFail) { create(:user, confirmed: true) }
  let!(:post1) { create(:post, user: user) }
  let!(:post2) { create(:post, user: user) }
  before do
    login(user)
  end
  describe '#index' do
    context 'GET index' do
      before do
        get :index
      end
      it { expect(response).to have_http_status(200) }
      it { expect(JSON.parse(response.body)[1]).to include('id' => post1.id) }
    end
  end

  describe '#show' do
    context 'GET show' do
      before do
        get :show, params: { id: post1.id }
      end
      it { expect(response).to have_http_status(200) }
      it { expect(JSON.parse(response.body)).to include('id' => post1.id) }
    end
  end

  describe '#create' do
    context 'POST create success' do
      before do
        post :create, params: {
          post: {
            title: 'test',
            body: 'test'
          }
        }
      end
      it { expect(response).to have_http_status(201) }
      it { expect(JSON.parse(response.body)).to include('title' => 'test') }
    end
    context 'POST create failure' do
      before do
        post :create, params: {
          post: {
            title: '',
            body: 'test'
          }
        }
      end
      it { expect(response).to have_http_status(400) }
    end
  end

  describe '#update' do
    let!(:postForUpdate) { create(:post, id: 10, user: user) }
    context 'success' do
      before do
        put :update, params: {
          id: 10,
          post: {
            title: 'One',
            body: 'Test One'
          }
        }
      end
      it { expect(response).to have_http_status(200) }
      it { expect(JSON.parse(response.body)).to include('title' => 'One') }
    end
    context 'failure by valid' do
      before do
        put :update, params: {
          id: 10,
          post: {
            title: '',
            body: ''
          }
        }
      end
      it { expect(response).to have_http_status(400) }
    end
    context 'failure by permissions' do
      before do
        login(userFail)
        put :update, params: {
          id: 10,
          post: {
            title: 'Lol',
            body: 'Ololo'
          }
        }
      end
      it { expect(response).to have_http_status(400) }
    end
  end

  describe '#destroy' do
    let!(:postToDelete) { create(:post, id: 6, user: user) }
    context 'success' do
      before do
        delete :destroy, params: {
          id: 6
        }
      end
      it { expect(response).to have_http_status(200) }
    end
    context 'failure' do
      before do
        login(userFail)
        delete :destroy, params: {
          id: 6
        }
      end
      it { expect(response).to have_http_status(400) }
    end
  end
end
