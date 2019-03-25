class CommentSerializer < ActiveModel::Serializer
  attributes :id, :body, :created_at_format, :user, :post
  belongs_to :user
  belongs_to :post

  class UserSerializer < ActiveModel::Serializer
    attributes :id, :username
  end

  def created_at_format
    object.created_at.to_time.strftime('%e %B %Y at %H:%M')
  end
end
