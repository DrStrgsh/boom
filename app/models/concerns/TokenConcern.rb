module TokenConcern
  extend ActiveSupport::Concern

  def have_token?(token)
    !token.nil?
  end

  def create_reset_token!
    update_attribute(:reset_pass, User.reset_token)
    update_attribute(:reset_pass_send_at, Time.zone.now)
  end

  private

  def create_confirmation_token
    self.confirmation_token = User.new_token
  end

  class << self
    def new_token
      SecureRandom.urlsafe_base64
    end

    def reset_token
      SecureRandom.hex(6).upcase
    end
  end

end