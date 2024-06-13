# test/factories/microposts.rb

FactoryBot.define do
  factory :micropost do
    content { "Lorem ipsum" }
    user
  end
end
