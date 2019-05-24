class User < ApplicationRecord
  include TokenConcern

  has_many :posts, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :reposts, dependent: :destroy
  has_many :active_relationships, class_name:  "Relationship",
                                  foreign_key: "follower_id",
                                  dependent:   :destroy
  has_many :passive_relationships, class_name:  "Relationship",
                                   foreign_key: "followed_id",
                                   dependent:   :destroy
  has_many :followers, through: :passive_relationships, source: :follower
  has_many :following, through: :active_relationships, source: :followed
  has_secure_password
  before_save { self.email = email.downcase }
  before_create :create_confirmation_token
  attr_accessor :confirmation_token
  acts_as_voter

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i.freeze
  validates :username,
            presence: true,
            uniqueness: true
  validates :email,
            format: { with: VALID_EMAIL_REGEX },
            uniqueness: true,
            presence: true
  validates :password,
            :password_confirmation,
            presence: true,
            length: { in: 6..20 },
            allow_nil: true

  def confirm!
    update_attribute(:confirmed, true)
    update_attribute(:confirmed_at, Time.zone.now)
  end

  def send_confirmation_email
    UserMailer.account_confirmation(self).deliver_now
  end

  def send_reset_password_email
    UserMailer.reset_password(self).deliver_now
  end

  def password_reset_expired?
    reset_pass_send_at < 2.hours.ago
  end

  def follow(other_user)
    active_relationships.create(followed_id: other_user.id)
  end

  def unfollow(other_user)
    active_relationships.find_by(followed_id: other_user.id).destroy
  end

  def following?(other_user)
    following.include?(other_user)
  end

  def feed
    following_ids = "SELECT followed_id FROM relationships
                     WHERE follower_id = :user_id"
    Post.where("user_id IN (#{following_ids})
                OR user_id = :user_id", user_id: id)
  end

  def feed_reposts
    following_ids = "SELECT followed_id FROM relationships
                     WHERE follower_id = :user_id"
    Repost.where("user_id IN (#{following_ids})
                OR user_id = :user_id", user_id: id)
  end
end
