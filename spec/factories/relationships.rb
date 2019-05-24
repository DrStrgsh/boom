FactoryBot.define do
  factory :relationship do
    followed { create(:user, id: 1) }
    follower { create(:user, id: 2) }
    followed_id { 1 }
    follower_id { 2 }
  end
end
