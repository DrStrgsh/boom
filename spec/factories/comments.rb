FactoryBot.define do
  factory :comment do
    body { Faker::Book.genre }
  end
end