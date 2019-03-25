class Api::FeedsController < Api::ApiController
  def index
    feeds = current_user.feed.order(created_at: :desc)
    render json: feeds, status: :ok
  end
end
