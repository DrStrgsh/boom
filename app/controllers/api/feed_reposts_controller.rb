class Api::FeedRepostsController < Api::ApiController
  def index
    @feed_reposts = current_user.feed_reposts.all
    render json: @feed_reposts, status: :ok
  end
end
