class Api::LikesController < Api::ApiController
  before_action :is_liked, only: %i[show]

  def show; end

  def create
    post.liked_by(current_user)
    render json: { msg: I18n.t('global.success.likes.create') }, status: :ok
  end

  def destroy
    post.unliked_by(current_user)
    render json: { msg: I18n.t('global.succes.likes.destroy') }, status: :ok
  end

  private

  def is_liked
    @is_liked = current_user.voted_for?(post)
    render json: @is_liked, status: :ok
  end

  def post
    @post ||= Post.find_by(id: params[:id])
  end
end
