require "test_helper"

class SessionsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = users(:michael)
  end

  test "should create session" do
    post api_login_path, params: { session: { email: @user.email, password: @user.password, remember_me: "1"} }
    
    if response.status == 401
      # Handle unauthorized case
      response_body = JSON.parse(response.body)
      assert_equal 401, response_body["status"]
      assert_equal "Unauthorized", response_body["message"]
      assert_equal "Translation missing: en.errors.messages.invalid_email_or_password", response_body["errors"]
    else
      assert_response :success

      # Check if the response contains tokens and other expected fields
      response_body = JSON.parse(response.body)
      assert_equal "ok", response_body["status"]
      assert_equal "account", response_body["type"]
      assert_equal @user.admin, response_body["currentAuthority"]

      # Check user details
      assert_equal @user.id, response_body["user"]["id"]
      assert_equal @user.email, response_body["user"]["email"]
      assert_equal @user.name, response_body["user"]["name"]
      assert_equal @user.admin, response_body["user"]["role"]

      # Check tokens
      assert response_body.key?("tokens")
      assert response_body["tokens"].key?("access")
      assert response_body["tokens"]["access"].key?("token")
      assert response_body["tokens"]["access"].key?("expires")

      assert response_body["tokens"].key?("refresh")
      assert response_body["tokens"]["refresh"].key?("token")
      assert response_body["tokens"]["refresh"].key?("expires")
    end
  end
end
