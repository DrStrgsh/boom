class Api::ResetPasswordController < Api::ApiController
  skip_before_action :authenticate_request
  before_action :find_user, only: %i[update]
  before_action :valid_user?, only: %i[update]
  before_action :expired?, only: %i[update]

  def create
    @user = User.find_by(email: params[:email].downcase)
    if @user
      @user.create_reset_token
      @user.send_reset_password_email
      render json: { msg: I18n.t('global.success.reset_password.create') }, status: 201
    else
      render json: { msg: I18n.t('global.errors.reset_password.create') }, status: 400
    end
  end

  def update
    user.update(user_params)
    render json: { msg: I18n.t('global.success.reset_password.update') }, status: 200
  end

  private

  def find_user
    params[:reset_pass] == user.reset_pass
  end

  def user_params
    params.require(:user).permit(:password, :password_confirmation)
  end

  def user
    @user ||= User.find_by(reset_pass: params[:reset_pass])
  end

  def valid_user?
    render json: { msg: I18n.t('global.errors.invalid_user') }, status: 400 unless user && user.confirmed?
  end

  def expired?
    render json: { msg: I18n.t('global.errors.reset_password.expired') }, status: 400 if @user.password_reset_expired?
  end
end
