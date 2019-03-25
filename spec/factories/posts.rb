FactoryBot.define do
  factory :post do
    title { Faker::Book.title }
    body { Faker::Book.publisher }
  end
end