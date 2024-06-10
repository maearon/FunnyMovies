class Cart < ApplicationRecord
  belongs_to :user, optional: true
  has_many :cart_items, dependent: :destroy

  def cart(product, variant, quantity, action)
    if current_item = cart_items.find_by(variant: variant)
      current_item.quantity ||= 1
      action == 'edit' ? current_item.quantity = quantity.to_i : current_item.quantity += quantity.to_i
      current_item.save
    else
      cart_items.create(product: product,variant: variant, cart: self, quantity: quantity)
    end
  end

  def list
    cart_items
  end

  def total_item
    total_item = 0
    self.cart_items.each do |cart_item|
      total_item += cart_item.quantity.to_i
    end
    total_item
  end

  def total_originalvalue
    cart_items.inject(0.0) { |sum, l| sum + l.variant.originalprice * l.quantity }
  end

  def total_value
    cart_items.inject(0.0) { |sum, l| sum + l.variant.price * l.quantity }
  end

  def sale
    self.total_value - self.total_originalvalue
  end
end
