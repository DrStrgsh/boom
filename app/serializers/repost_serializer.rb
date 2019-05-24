class RepostSerializer < ActiveModel::Serializer
  attributes :id, :name, :title, :body, :created_at, :created_at_format, :user_id, :reposted, :email, :post_id 

  def created_at_format
    object.created_at.to_time.strftime('%e %B %Y at %H:%M')
  end

  def post_id
    object.post.id
  end

  def user_id
    object.user.id
  end

  def reposted
    object.user.username
  end

  def email
    object.user.email
  end

end
