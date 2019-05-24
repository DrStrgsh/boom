class Api::RepostsController < Api::ApiController
  before_action :is_origin_post, only: %i[create]
  
  def index
    @reposts = Repost.all
    render json: @reposts, status: :ok
  end

  def show
    render json: repost, status: :ok
  end

  def create
    @repost = current_user.reposts.new(repost_params.merge(origin_post.slice(:title, :body)))
    @repost.post_id = origin_post.id
    if @repost.save
      render json: @repost, status: 201
    end
  end

  def update
    if current_user.id == repost.user_id && repost.update(repost_params)
      render json: repost, status: :ok
    else
      render json: repost, status: 401
    end
  end

  def destroy
    if current_user.id == repost.user_id && repost.destroy
      render json: { msg: 'Repost deleted' }, status: :ok
    else
      render json: repost, status: 401
    end
  end

  private

  def repost_params
    params.permit(:name)
  end

  def repost
    @repost ||= Repost.find_by(id: params[:id])
  end

  def post
    @post ||= Post.find_by(id: params[:id])
  end

  def is_origin_post
    origin_post = post
    if origin_post == current_user.posts.find_by(id: params[:id])
      render json: { msg: I18n.t('global.errors.reposts.create') }, status: 400
    end
  end
end
