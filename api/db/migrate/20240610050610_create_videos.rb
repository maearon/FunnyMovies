class CreateVideos < ActiveRecord::Migration[7.1]
  def change
    create_table :videos do |t|
      t.string :url
      t.text :description

      t.timestamps
    end
  end
end
