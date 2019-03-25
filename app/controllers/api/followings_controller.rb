class FollowingsController < Api::ApiController

  def index
    users = user.following.all
    render json: users, status: 200
  end

  private

  def user
    @user ||= User.find_by(id: params[:id])
  end

end