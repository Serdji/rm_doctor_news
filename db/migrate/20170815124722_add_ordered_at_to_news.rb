class AddOrderedAtToNews < ActiveRecord::Migration[5.1]
  def change
    add_column :news, :ordered_at, :bigint
    add_index :news, :ordered_at
  end
end
