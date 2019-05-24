require 'rails_helper'

RSpec.describe Api::ConfirmationsController, type: :controller do
  describe '#edit' do
    let(:user1) { create(:user, confirm_token: '123qwe') }
    context 'success' do
      before do
        get :edit, params: {
          confirmation_token: user1.confirm_token,
          id: user1.id
        }
      end
      it { expect(response).to have_http_status(200) }
    end
    context 'failure' do
      before do
        get :edit, params: {
          confirmation_token: '123123',
          id: user1.id
        }
      end
      it { expect(response).to have_http_status(400) }
    end
  end
end
