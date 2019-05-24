require 'rails_helper'

RSpec.describe Api::UsersController, type: :controller do
  let(:user) { create(:user, id: 1, confirmed: true) }
  before do
    login(user)
  end
  describe '#index' do
    context 'GET index' do
      before do
        get :index
      end
      it 'status 200' do
        expect(response).to have_http_status(200)
      end
      it 'json response' do
        json_response = JSON.parse(response.body)
        expect(json_response[0]).to include('id' => user.id)
      end
    end
  end

  describe '#show' do
    context 'GET show' do
      before do
        get :show, params: { id: user.id }
      end
      it 'status 200' do
        expect(response).to have_http_status(200)
      end
      it 'json response' do
        json_response = JSON.parse(response.body)
        expect(json_response).to include('id' => user.id) 
      end
    end
  end

  describe '#create' do
    context 'POST create' do
      before do
        post :create, params: { user: {
          email: 'test@test.io',
          username: 'test',
          password: '123456',
          password_confirmation: '123456'
          } }
      end
      it 'status 200' do
        expect(response).to have_http_status(201)
      end
    end
    context 'POST create failure' do
      before do
        post :create, params: { user: {
          email: '',
          username: 'test',
          password: '123456'
        } }
      end
      it 'status 400' do
        expect(response).to have_http_status(400)
      end
    end
  end

  describe '#update' do
    context 'PUT update success' do
      let(:params) { { 
          id: user.id,
          user: {
            email: 'test@test.io',
            username: 'test',
            password: '123456',
            password_confirmation: '123456'
          }
          } }
      before do
        put :update, params: params
      end
      it 'status 200' do
        expect(response).to have_http_status(200)
      end
      it 'json response' do
        json_response = JSON.parse(response.body)
        expect(json_response).to include('id' => user.id)
      end
    end
    context 'PUT update failure' do
      let(:params) { {
        id: user.id,
        user: {
          email: '',
          username: '',
          password: '123456',
          password_confirmation: '123456'
        }
      } }
      before do
        put :update, params: params
      end
      it 'status 400' do
        expect(response).to have_http_status(400)
      end
    end
  end

  describe '#destroy' do
    context 'DELETE destroy success' do
      let(:admin) { create(:user, admin: true, confirmed: true) }
      before do
        login(admin)
        delete :destroy, params: { id: user.id }
      end
      it 'status 200' do
        expect(response).to have_http_status(200)
      end
    end
    context 'DELETE destroy failure' do
      let(:user1) { create(:user, id: 2) }
      before do
        login(user1)
        delete :destroy, params: { id: user.id }
      end
      it 'status 400' do
        expect(response).to have_http_status(400)
      end
    end
  end

  describe '#following' do
    let(:user2) { create(:user, confirmed: true, id: 2) }
    context 'response' do
      before do
        user.follow(user2)
        get :following, params: { id: user.id }
      end
      it { expect(response).to have_http_status(200) }

      it 'json response' do
        json_response = JSON.parse(response.body)
        expect(json_response[0]).to include('id' => user2.id)
      end
    end
  end

  describe '#followers' do
    let(:user2) { create(:user, confirmed: true, id: 2) }
    context 'response' do
      before do
        user.follow(user2)
        get :followers, params: { id: user2.id }
      end
      it { expect(response).to have_http_status(200) }

      it 'json response' do
        json_response = JSON.parse(response.body)
        expect(json_response[0]).to include('id' => user.id)
      end
    end
  end
end
