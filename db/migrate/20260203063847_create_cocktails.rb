class CreateCocktails < ActiveRecord::Migration[7.1]
  def change
    create_table :cocktails do |t|
      t.string :name
      t.integer :base_alcohol
      t.float :alcohol_detail
      t.integer :alcohol_percentage
      t.string :shop_name
      t.integer :rating
      t.text :note
      t.boolean :public_status
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
