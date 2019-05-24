class Api::RelationshipsController < Api::ApiController
  before_action :user_following?, only: %i[create]

  def show
    is_follow = current_user.following?(User.find_by(id: params[:id]))
    render json: is_follow, status: :ok
  end

  def create
    if current_user.follow(user)
      render json: { msg: I18n.t('global.success.follows.create') }, status: 201
    end
  end

  def destroy
    user = Relationship.find_by(followed_id: params[:id]).followed
    current_user.unfollow(user)
    render json: { msg: I18n.t('global.success.follows.destroy') }, status: 200
  end

  private

  def user_following?
    user = User.find_by(id: params[:followed_id])
    if current_user.following?(user) || user == current_user
      render json: { msg: I18n.t('global.errors.follows.create') }, status: 400
    end
  end
end
