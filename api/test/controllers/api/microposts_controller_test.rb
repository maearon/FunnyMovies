require 'test_helper'

class Api::MicropostsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = users(:michael)  # Replace with your fixture or factory method
    @micropost = @user.microposts.create(content: "Lorem ipsum")
    @headers = { "Authorization" => token_for(@user) }
  end

  # Method to generate JWT token
  def token_for(user)
    JsonWebToken.encode(user_id: user.id)
  end

  test "should not create micropost without authentication" do
    assert_no_difference 'Micropost.count' do
      post api_microposts_path, params: { micropost: { content: "Lorem ipsum" } }
    end
  end

  test "should not destroy micropost for incorrect user" do
    other_user = users(:archer)  # Assuming another user exists in your fixtures
    token = token_for(other_user)
    headers = { "Authorization" => token }
    assert_no_difference 'Micropost.count' do
      delete api_micropost_path(@micropost), headers: headers
    end
  end
end
