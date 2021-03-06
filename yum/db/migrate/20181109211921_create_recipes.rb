class CreateRecipes < ActiveRecord::Migration[5.2]
  def change
    create_table :recipes do |t|
      t.string :name
      t.string :image_url
      t.string :ingredients
      t.string :cook_time
      t.string :instructions

      t.timestamps
    end
  end
end
