module Helpers
  def login(user)
    token = JsonWebToken.encode(user_id: user.id).to_s
    allow(controller).to receive(:authenticate_request) { token }
    allow(controller).to receive(:current_user).and_return(user)
  end
end