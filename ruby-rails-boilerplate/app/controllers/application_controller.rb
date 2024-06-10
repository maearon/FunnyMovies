class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception, if: -> { request.format.json? }
  include SessionsHelper
  include CartsHelper
  include WishesHelper
  before_action :current_cart, :current_wish, :require_admin
  around_action :switch_locale
  helper_method [:recent_products, :last_viewed_product]

  def require_admin
    # redirect_to request.referrer if self.class.parent == Admin && !current_user&.admin?
  end

  def recent_products
    @recent_products ||= RecentProducts.new cookies
  end

  def last_viewed_product
    recent_products.reverse.second
  end

  private

    def switch_locale(&action)
      locale = params[:locale] || I18n.default_locale
      I18n.with_locale(locale, &action)
    end

    def default_url_options
      {locale: I18n.locale}
    end

    # Confirms a logged-in user.
    def logged_in_user
      unless logged_in?
        store_location
        flash[:danger] = "Please log in."
        redirect_to login_url, status: :see_other
      end
    end
end
