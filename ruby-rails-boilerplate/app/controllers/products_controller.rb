class ProductsController < ApplicationController
  before_action :set_product, only: [:show]

  def index
    @products = Product.order(:id).page(params[:page]).per(12)
  end

  def show

    @review_items = @product.reviews
    recent_products.push @product
    recent_products
  end

  private
    def set_product
      @product = Product.find_by(id: params[:id])
      @product ? nil : @product = Product.new
      params[:variant] ? @variant = @product.variants.find(params[:variant]) : @variant = @product.variants.first
    end
end
