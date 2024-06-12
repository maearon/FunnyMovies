# test/models/micropost_test.rb

require 'test_helper'

class MicropostTest < ActiveSupport::TestCase
  def setup
    @user = users(:michael) # Assuming you have a fixture for users
    @micropost = @user.microposts.build(content: "Lorem ipsum")
  end

  test "should not save micropost without content" do
    micropost = Micropost.new
    assert_not micropost.save # bin/rails test test/models/micropost_test.rb:13
  end

  test "should be valid" do
    assert @micropost.valid?
  end

  test "user id should be present" do
    @micropost.user_id = nil
    assert_not @micropost.valid?
  end

  test "content should be present" do
    @micropost.content = "   "
    assert_not @micropost.valid?
  end

  test "content should be at most 140 characters" do
    @micropost.content = "a" * 141
    assert_not @micropost.valid?
  end

  test "order should be most recent first" do
    assert_equal microposts(:most_recent), Micropost.first
  end

  test "image should be valid" do
    @micropost.image.attach(io: File.open('test/fixtures/files/test_image.jpg'), filename: 'test_image.jpg', content_type: 'image/jpeg')
    assert @micropost.image.attached?
  end
end
