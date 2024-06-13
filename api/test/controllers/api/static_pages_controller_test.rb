require 'test_helper'

class StaticPagesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:michael)
  end

  test "should get home" do
    get api_root_path
    assert_response :unauthorized
  end
end
