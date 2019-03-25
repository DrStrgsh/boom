require 'rails_helper'

RSpec.describe Api::SessionsController, type: :controller do
  let(:user) { create(:user, email: 'test@test.io', password: '123456', password_confirmation: '123456', confirmed: true) }
  describe '#create' do
    context 'login success' do
      before do
        post :create, params: { email: user.email, password: user.password }
      end
      it 'status 200' do
        expect(response).to have_http_status(200)
      end
    end
    context 'login failure' do
      before do
        post :create, params: { email: user.email, password: '123654' }
      end
      it 'status 401' do
        expect(response).to have_http_status(401)
      end
    end
  end
  describe '#destroy' do
    context 'logout' do
      before do
        login(user)
        delete :destroy
      end
      it 'logout success' do
        expect(response).to have_http_status(200)
      end
    end
  end
end