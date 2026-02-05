class CocktailsController < ApplicationController
  before_action :authenticate_user!

  def index
    @cocktails = current_user.cocktails.with_attached_image.order(created_at: :desc)
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
    params.require(:cocktail).permit(:name, :base_alcohol, :alcohol_percentage, :shop_name, :rating, :note, :image)
  end
end
