require "application_system_test_case"

class StaticPagesTest < ApplicationSystemTestCase
  setup do
    @user = User.new(name: "someone@gmail.com", email: "someone@gmail.com",
                     password: "foobar", password_confirmation: "foobar")
    @micropost = @user.microposts.build(content: "https://www.youtube.com/embed/vUawE7RRywk?si=ntsZYlaL52qqJQob")
    # @room = rooms(:one)
  end

  test "visiting the index" do
    visit api_root_path # bin/rails test:system
    # assert_selector "h1", text: "Rooms"
  end

  test "should create micropost" do
    visit api_microposts_path
    # click_on "New room"

    # fill_in "Name", with: @room.name
    # click_on "Create Room"

    # assert_text "Room was successfully created"
    # click_on "Back"
  end

  test "should update Micropost" do
    # visit room_url(@room)
    # click_on "Edit this room", match: :first

    # fill_in "Name", with: @room.name
    # click_on "Update Room"

    # assert_text "Room was successfully updated"
    # click_on "Back"
  end

  test "should destroy Micropost" do
    visit api_micropost_path
    # click_on "Destroy this room", match: :first

    # assert_text "Room was successfully destroyed"
  end
end
