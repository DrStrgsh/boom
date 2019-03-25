class Api::PostsController < Api::ApiController
  before_action :is_user?, only: %i[update destroy]

  def index
    posts = Post.order(created_at: :desc)
    render json: posts, status: :ok
  end

  def show
    render json: post, status: :ok
  end

  def create
    created_post = current_user.posts.create(post_params)
    if created_post.save
      render json: created_post, status: 201
    else
      render json: { errors: I18n.t('global.errors.posts.create') }, status: 400
    end
  end

  def update
    if post.update(post_params)
      render json: post, status: :ok
    else
      render json: { msg: I18n.t('global.errors.posts.update') }, status: 400
    end
  end

  def destroy
    if post.destroy
      render json: { msg: I18n.t('global.success.posts.destroy') }, status: :ok
    end
  end

  private

  def is_user?
    if current_user.id != post.user_id || !current_user.admin?
      render json: { msg: I18n.t('global.errors.not_have_permissions') }, status: 400
    end
  end

  def post_params
    params.require(:post).permit(:title, :body)
  end

  def post
    @post ||= Post.find_by(id: params[:id])
  end
end
