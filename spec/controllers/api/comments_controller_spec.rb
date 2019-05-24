require 'rails_helper'

RSpec.describe Api::CommentsController, type: :controller do
  let(:user1) { create(:user, confirmed: true) }
  let(:user2) { create(:user, confirmed: true) }
  let!(:post1) { create(:post, user: user1) }
  let!(:post2) { create(:post, user: user2) }
  let!(:comment1) { create(:comment, post: post1, user: user2) }

  before do
    login(user1)
  end

  describe '#index' do
    before do
      get :index, params: {
        post_id: post1.id
      }
    end
    it { expect(response).to have_http_status(200) }
    it { expect(JSON.parse(response.body)[0]).to include('id' => comment1.id) }
  end

  describe '#create' do
    context 'success' do
      before do
        post :create, params: {
          post_id: post2.id,
          comment: {
            body: 'Test'
          }
        }
      end
      it { expect(response).to have_http_status(201) }
      it { expect(JSON.parse(response.body)).to include('body' => 'Test') }
    end
    context 'failure' do
      before do
        post :create, params: {
          post_id: post2.id,
          comment: {
            body: ''
          }
        }
      end
      it { expect(response).to have_http_status(400) }
    end
  end

  describe '#destroy' do
    context 'success' do
      before do
        login(user2)
        delete :destroy, params: {
          post_id: post1.id,
          id: comment1.id
        }
      end
      it { expect(response).to have_http_status(200) }
    end
    context 'failure' do
      before do
        delete :destroy, params: {
          post_id: post1.id,
          id: comment1.id
        }
      end
      it { expect(response).to have_http_status(400) }
    end
  end
end
