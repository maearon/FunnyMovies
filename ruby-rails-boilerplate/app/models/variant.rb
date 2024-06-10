class Variant < ApplicationRecord
  include CheckVariant
  COLOR = %w{ Black Grey White Red Pink Orange Yellow Green Blue Purple Beige Brown Gold Silver Multicolor }

  has_many :cart_items
  has_many :wish_items
  has_many :order_items
  belongs_to :product

  has_one_attached :avatar
  has_one_attached :hover
  has_many_attached :images

  validates_numericality_of :price, greater_than_or_equal_to: 1
  validates_numericality_of :stock, :originalprice, greater_than_or_equal_to: 0
  validates :avatar,   content_type: { in: %w[image/jpeg image/gif image/png],
                                      message: "must be a valid image format" },
                      size: { less_than: 100.megabytes,
                            message: "should be less than 5MB" }
  validates_uniqueness_of :id, scope: :product_id

  default_scope { order id: :asc }
end
