require 'test_helper'

class Api::UsersControllerTest < ActionDispatch::IntegrationTest
  test "should not get index when not authenticated" do
    get api_users_path
    assert_response :unauthorized
  end
end
