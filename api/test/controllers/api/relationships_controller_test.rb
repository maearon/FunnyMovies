require 'test_helper'

class Api::RelationshipsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = users(:michael)  # Replace with your fixture or factory method
    @other_user = users(:archer)  # Another user fixture for creating relationships
    @headers = { "Authorization" => token_for(@user) }
  end

  # Method to generate JWT token
  def token_for(user)
    JsonWebToken.encode(user_id: user.id)
  end

  test "create should require logged-in user" do
    assert_no_difference 'Relationship.count' do
      post api_relationships_path, params: { relationship: { followed_id: @other_user.id } }
    end
    assert_response :unauthorized
  end

  test "destroy should require logged-in user" do
    relationship = @user.active_relationships.create!(followed_id: @other_user.id)
    assert_no_difference 'Relationship.count' do
      delete api_relationship_path(relationship)
    end
    assert_response :unauthorized
  end
end
