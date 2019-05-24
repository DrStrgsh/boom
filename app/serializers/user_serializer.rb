class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :created_at_format
  has_many :posts
  has_many :comments

  delegate :username, :email, to: :posts

  def created_at_format
    object.created_at.to_time.strftime('%e %B %Y at %H:%M')  
  end

  class PostsController < ActiveModel::Serializer
    attributes :id, :title, :body, :created_at, :username
    belongs_to :user

    def username
      object.user.username
    end
  end

  class CommentSerializer < ActiveModel::Serializer
    attributes :id, :body, :created_at, :post_id
    belongs_to :post
    belongs_to :user

    def post_id
      object.post.id
    end
  end

end
