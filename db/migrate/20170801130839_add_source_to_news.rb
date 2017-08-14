class AddSourceToNews < ActiveRecord::Migration[5.1]
  def change
    add_column :news, :resource, :json, null: false, default: {}
  end
end
