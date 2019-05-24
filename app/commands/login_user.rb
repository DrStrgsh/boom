class LoginUser
  prepend SimpleCommand

  def initialize(email, password)
    @email = email
    @password = password
  end

  def call
    JsonWebToken.encode(user_id: user.id) if user
  end

  private

  attr_accessor :email, :password

  def user
    @user ||= User.find_by(email: email)
    if @user && @user.authenticate(password)
      @user
    else
      errors.add :user_authentication, I18n.t('global.errors.invalid_credentials') && nil
    end
  end
end
