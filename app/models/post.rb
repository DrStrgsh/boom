class Post < ApplicationRecord
  belongs_to :user
  has_many :comments, dependent: :destroy
  has_many :reposts, dependent: :destroy
  acts_as_votable

  validates :title, :body, presence: true
end
