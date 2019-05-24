class Api::UsersController < Api::ApiController
  skip_before_action :authenticate_request, only: [:create]

  def index
    users = User.order(created_at: :desc)
    render json: users, status: :ok
  end

  def show
    render json: user, status: :ok
  end

  def create
    created_user = User.create(user_params)
    if created_user.save
      @user.send_confirmation_email
      render json: { msg: I18n.t('global.success.users.confirm') }, status: 201
    else
      render json: { errors: user.errors.full_messages }, status: 400
    end
  end

  def update
    if user.update(user_params)
      render json: user, status: :ok
    else
      render json: { errors: user.errors.full_messages }, status: 400
    end
  end

  def destroy
    if current_user.admin? && user.destroy
      render json: { msg: I18n.t('global.success.users.destroy') }, status: :ok
    else
      render json: { msg: I18n.t('global.errors.users.destroy') }, status: 400
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password, :password_confirmation)
  end

  def user
    @user ||= User.find_by(id: params[:id])
  end
end
