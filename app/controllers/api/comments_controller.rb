class Api::CommentsController < Api::ApiController
  before_action :if_current_user, only: %i[destroy]

  def index
    @comments = post.comments.order(created_at: :desc)
    render json: @comments, status: :ok
  end

  def create
    @comment = post.comments.build(comment_params.merge!(user_id: current_user.id))
    if @comment.save
      render json: @comment, status: 201
    else
      render json: { msg: I18n.t('global.errors.comments.create') }, status: 400
    end
  end

  def destroy
    @comment.destroy
    render json: { msg: I18n.t('global.success.comments.destroy') }, status: 200
  end

  private

  def comment_params
    params.require(:comment).permit(:body)
  end

  def post
    @post ||= Post.find_by(id: params[:post_id])
  end

  def if_current_user
    @comment = post.comments.find_by(id: params[:id])
    if !(current_user.id == @comment.user_id || current_user.admin)
      render json: { msg: I18n.t('global.errors.comments.destroy') }, status: 400
    end
  end
end