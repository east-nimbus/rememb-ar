class Cocktail < ApplicationRecord
  belongs_to :user
  has_one_attached :image

  validates :name, presence: true
  validates :base_alcohol, presence: true
  validates :alcohol_percentage, presence: true
  validates :alcohol_detail, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 100 }, allow_nil: true
  validates :rating, inclusion: { in: 1..10 }, allow_nil: true

  enum base_alcohol: { gin: 0, vodka: 1, rum: 2, tequila: 3, whiskey: 4, brandy: 5, liqueur: 6, wine: 7, other: 99 }
  enum alcohol_percentage: { non_alc: 0, low: 1, medium: 2, high: 3, strong: 4 }
end
