class Api::ConfirmationsController < Api::ApiController
  skip_before_action :authenticate_request
  before_action :token_exist?

  def edit
    user.confirm
    render json: { msg: I18n.t('global.success.email_confirmation.confirmed') }, status: 200
  end

  private

  def token_exist?
    user = User.find_by(confirm_token: params[:confirmation_token])
    if user && !user.confirmed? && user.have_token?(params[:id])
      render json: { msg: I18n.t('global.errors.email_confirmation') }, status: 400
    end
  end
end
