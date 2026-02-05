class CocktailsController < ApplicationController
  before_action :authenticate_user!

  def index
    base_query = current_user.cocktails.with_attached_image
    @cocktails_count = base_query.count
    @cocktails_by_base = base_query.where.not(base_alcohol: nil).order(:base_alcohol).group_by(&:base_alcohol)
    # display_alcohol_degree を使用してグルーピング。度数が算出できないものは除外
    @cocktails_by_abc = base_query.select { |c| c.display_alcohol_degree.present? }
                                  .sort_by(&:display_alcohol_degree)
                                  .group_by { |c| c.display_alcohol_degree.to_i }
  end

  def new
    @cocktail = current_user.cocktails.build
  end

  def create
    @cocktail = current_user.cocktails.build(cocktail_params)
    if @cocktail.save
      redirect_to cocktails_path, notice: "カクテルを登録しました。"
    else
      render :new, status: :unprocessable_content
    end
  end

  private

  def cocktail_params
    params.require(:cocktail).permit(:name, :base_alcohol, :alcohol_percentage, :alcohol_detail, :shop_name, :rating, :note, :image)
  end
end
