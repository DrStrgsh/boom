FactoryBot.define do
  factory :repost do
    name { Faker::Book.title }
  end
end
