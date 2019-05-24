class Api::FollowersController < Api::ApiController

  def index
    users = user.followers.all
    render json: users, status: 200
  end

  private

  def user
    @user ||= User.find_by(id: params[:id])
  end

end