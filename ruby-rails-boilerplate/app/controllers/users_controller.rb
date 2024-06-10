class UsersController < ApplicationController
  before_action :logged_in_user, only: [:index, :edit, :update, :destroy,
                                        :following, :followers]
  before_action :set_user,       except: [:index, :new, :create]
  before_action :correct_user,   only: [:edit, :update,
                                        :following, :followers]
  before_action :admin_user,     only: :destroy

  def index
    @users = User.page(params[:page])
  end

  def show
    @microposts = @user.microposts.page(params[:page])
    @current_user = current_user if current_user
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      @user.send_activation_email
      flash[:info] = "Please check your email to activate your account."
      redirect_to root_url
    else
      render 'new', status: :unprocessable_entity
    end
  end

  def edit
  end

  def update
    if @user.update(user_params)
      flash[:success] = "Profile updated"
      # redirect_to my_account_path
      redirect_to @user
    else
      render 'edit', status: :unprocessable_entity
    end
  end

  def destroy
    @user.destroy
    respond_to do |format|
      format.html {
        # flash[:success] = 'User successfully deleted!'
        flash[:success] = "User deleted"
        redirect_to users_url, status: :see_other
      }
      format.turbo_stream
    end      
    # redirect_to users_url, status: :see_other
  end

  def following
    @title = "Following"
    @user  = User.find(params[:id])
    @users = @user.following.page(params[:page])
    render 'show_follow', status: :unprocessable_entity
  end

  def followers
    @title = "Followers"
    @user  = User.find(params[:id])
    @users = @user.followers.page(params[:page])
    render 'show_follow', status: :unprocessable_entity
  end

  private
    def set_user
      params[:id] ||= session[:user_id]
      @user = User.find(params[:id])
    end
    

    def user_params
      params.require(:user).permit(:name, :email, :password,
                                   :password_confirmation)
    end

    # Before filters

    # Confirms the correct user.
    def correct_user
      params[:id] ||= session[:user_id]
      @user = User.find(params[:id])
      # redirect_to(root_url) unless current_user?(@user)
      redirect_to(root_url) unless @user == current_user
    end

    # Confirms an admin user.
    def admin_user
      redirect_to(root_url) unless current_user.admin?
    end
end
