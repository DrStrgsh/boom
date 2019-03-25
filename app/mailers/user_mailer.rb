class UserMailer < ApplicationMailer
  def account_confirmation(user)
    @user = user
    mail to: @user.email, subject: 'Account confirmation'
  end

  def reset_password(user)
    @user = user
    mail to: @user.email, subject: 'Reset password'
  end
end
