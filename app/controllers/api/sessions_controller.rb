class Api::SessionsController < Api::ApiController
  skip_before_action :authenticate_request, only: %i[create]

  attr_accessor :current_user

  def create
    command = LoginUser.call(params[:email], params[:password])

    if command.success?
      render json: { auth_token: command.result }
    else
      render json: { error: command.errors }, status: 401
    end
  end

  def destroy
    render json: current_user, status: 200
  end
end
