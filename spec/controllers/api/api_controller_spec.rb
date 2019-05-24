require 'rails_helper'

RSpec.describe Api::ApiController, type: :controller do
  describe '#authenticate_request' do
    let(:user1) { create(:user, id: 1) }
    context 'success' do
      before do
        login(user1)
      end
      it 'return user id if user' do
        expect(JsonWebToken.decode(controller.send(:authenticate_request))['user_id']).to eq 1
      end
    end
    context 'failure' do
      it 'return 401 unless current user' do
        expect(response).to have_http_status(401)
      end
    end
  end
end