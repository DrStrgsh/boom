class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :body, :created_at, :created_at_format, :likes_count, :user_id, :username, :email, :post_id
  has_many :comments
  belongs_to :user

  def created_at_format
    object.created_at.to_time.strftime('%e %B %Y at %H:%M')
  end

  def likes_count
    object.get_likes.size
  end

  def post_id
    object.id
  end

  def user_id
    object.user.id
  end

  class CommentSerializer < ActiveModel::Serializer
    attributes :id, :body, :username, :created_at_format
    belongs_to :user

    def created_at_format
      object.created_at.to_time.strftime('%e %B %Y at %H:%M')
    end

    def username
      object.user.username
    end
  end

end
