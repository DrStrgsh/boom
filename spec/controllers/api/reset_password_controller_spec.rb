require 'rails_helper'

RSpec.describe Api::ResetPasswordController, type: :controller do
  let(:user1) { create(:user, confirmed: true) }
  describe '#create' do
    context 'success' do
      before do
        post :create, params: {
          email: user1.email
        }
      end
      it { expect(response).to have_http_status(201) }
    end
    context 'failure' do
      before do
        post :create, params: {
          email: 'asdas@dasdasd.com'
        }
      end
      it { expect(response).to have_http_status(400) }
    end
  end

  describe '#update' do
    let(:user2) { create(:user, confirmed: true, reset_pass: '123qwe', reset_pass_send_at: Time.now) }
    context 'success' do
      before do
        put :update, params: {
          reset_pass: user2.reset_pass,
          user: {
            password: '654321',
            password_confirmation: '654321'
          }
        }
      end
      it { expect(response).to have_http_status(200) }
    end
    context 'failure' do
      before do
        put :update, params: {
          reset_pass: '312323',
          user: {
            password: '654321',
            password_confirmation: '654321'
          }
        }
      end
      it 'hggffhfh' do 
        expect(response).to have_http_status(400)
        expect(JSON.parse(response.body)).to include("msg" => "Invalid user.")
      end
    end
  end

  describe '#check_expireation' do
    let(:user3) { create(:user, confirmed: true, reset_pass: '123qwe', reset_pass_send_at: ( Time.now - 3.hours ) ) }
      before do
        put :update, params: {
          reset_pass: user3.reset_pass,
          user: {
            password: '654321',
            password_confirmation: '654321'
          }
        }
      end
    it 'failure' do
      expect(response).to have_http_status(400)
    end
  end
end
