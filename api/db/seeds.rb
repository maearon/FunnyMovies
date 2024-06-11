# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)

# Create a main sample user.
User.create!(name:  "Example User",
             email: "example@railstutorial.org",
             password:              "foobar",
             password_confirmation: "foobar",
             admin:     true,
             activated: true,
             activated_at: Time.zone.now)

# Generate a bunch of additional users.
99.times do |n|
  # name  = "Example User #{n+1}"
  name  = Faker::Name.name
  email = "example-#{n+1}@railstutorial.org"
  password = "password"
  User.create!(name:  name,
              email: email,
              password:              password,
              password_confirmation: password,
              activated: true,
              activated_at: Time.zone.now)
end

# Generate microposts for a subset of users.
users = User.order(:created_at).take(6)
50.times do
  # content = 'Content Micropost'
  # content = Faker::Lorem.sentence(word_count: 5)
  content = "https://www.youtube.com/embed/abPmZCZZrFA?si=CJdRW8sNd5laZsfJ" # id video
  # content = "https://www.youtube.com/embed?listType=playlist&list=UULPlyA28-01x4z60eWQ2kiNbA&index=1" # lastest
  users.each { |user| user.microposts.create!(content: content) }
end

# https://commentpicker.com/youtube-channel-id.php UC --> UU or View page source Search content="https://www.youtube.com/channel/
# users.first.microposts.create!(content:"https://www.youtube.com/embed?listType=playlist&list=UUEpwKlaYn7Li3Nh_kQLmCTA&index=1") # lastest
# users.first.microposts.create!(content:"https://www.youtube.com/embed?list=UULPlyA28-01x4z60eWQ2kiNbA") # most popular
# users.second.microposts.create!(content:"https://www.youtube.com/embed?list=UULPAyH4gCci0K41gNAxzIindg") # most popular
# users.third.microposts.create!(content:"https://www.youtube.com/embed?listType=playlist&list=UUH7RfbP4El0ykEAkvZphBmw&index=1") # lastest

users.first.microposts.create!(content:"https://www.youtube.com/embed/vkcXq6Blh5A?si=bU4V8qDUB2JC_Ggn")
users.first.microposts.create!(content:"https://www.youtube.com/embed/FN7ALfpGxiI?si=UJa9aDGrH2PyADwK")
users.second.microposts.create!(content:"https://www.youtube.com/embed/_FDljyvKDmc?si=n_72DEhz6uP6gjJr")
users.third.microposts.create!(content:"https://www.youtube.com/embed/Di7ViBcuw5k?si=Gr5i8oPYcK1qWlvR")

# Create following relationships.
users = User.all
user  = users.first
following = users[1..50]
followers = users[3..40]
following.each { |followed| user.follow(followed) }
followers.each { |follower| follower.follow(user) }

# Generate a bunch of additional products.
# i = 1
# u = "#{Rails.root.to_s}/app/assets/images/img"
# 93.times do |i|
#   i +=1
#   p = Product.create!(name: 'Loose Oversized Shirt',
#                       gender: 'Men',
#                       franchise: 'Tubular',
#                       producttype: 'Wear',
#                       brand: 'Originals',
#                       category: 'Shoes',
#                       sport: 'Running',
#                       jan_code: '0886'<<i.to_s,
#                       variants_attributes: {
#                         0 => {
#                           color: 'Black', price: '65', originalprice: '90', sku: 'AQ0886', stock: '1000'
#                         },
#                         1 => {
#                           color: 'Black', price: '65', originalprice: '90', sku: 'AQ0886', stock: '1000'
#                         },
#                         2 => {
#                           color: 'Black', price: '65', originalprice: '90', sku: 'AQ0886', stock: '1000'
#                         },
#                         3 => {
#                           color: 'Black', price: '65', originalprice: '90', sku: 'AQ0886', stock: '1000'
#                         },
#                       })
#   t=i%12
#   t=12 if t.zero?
#   p.variants.first.avatar.attach(io: File.open(u+'/item'+t.to_s+'.png'), filename: 'item'+t.to_s+'.png', content_type: 'application/png')
#   p.variants.first.hover.attach(io: File.open(u+'/item'+t.to_s+'.png'), filename: 'item'+t.to_s+'.png', content_type: 'application/png')
#   p.variants.first.images.attach(io: File.open(u+'/detail1.png'), filename: 'detail1.png', content_type: 'application/png')
#   p.variants.second.images.attach(io: File.open(u+'/detail2.png'), filename: 'detail2.png', content_type: 'application/png')
#   p.variants.third.images.attach(io: File.open(u+'/detail3.png'), filename: 'detail3.png', content_type: 'application/png')
#   p.variants.fourth.images.attach(io: File.open(u+'/detail4.png'), filename: 'detail4.png', content_type: 'application/png')
# end

#   end
