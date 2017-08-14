class CreateNews < ActiveRecord::Migration[5.1]
  def change
    create_table :news do |t|
      t.integer :external_id, null: false

      t.string :annotation, null: false
      t.string :title, null: false
      t.string :long_title, null: false
      t.text   :text, null: false

      t.boolean :breaking_status
      t.integer :breaking_ttl

      t.integer :comments_count
      t.integer :images_count
      t.integer :items_count
      t.integer :slides_count
      t.integer :videos_count

      t.string :link, null: false
      t.string :path, null: false

      t.boolean :is_active, null: false
      t.boolean :no_comments, null: false

      # TODO: uncomment later
      # t.string :image_url, null: false
      t.string :image_url

      t.json :image
      t.json :pitem
      t.json :topics, null: false

      t.datetime :mark_modified_date
      t.datetime :created_date
      t.datetime :modified_date
      t.datetime :published_date

      t.integer :topic_id, null: false
      t.string  :topic_alias, null: false
      t.string  :topic_name, null: false

      t.string :type

      t.timestamps
    end

    add_index :news, :external_id, unique: true

    add_index :news, :mark_modified_date
    add_index :news, :created_date
    add_index :news, :modified_date
    add_index :news, :published_date
  end
end
