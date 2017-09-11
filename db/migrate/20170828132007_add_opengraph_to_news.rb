class AddOpengraphToNews < ActiveRecord::Migration[5.1]
  def change
    add_column :news, :opengraph, :json, null: false, default: { default: nil, twitter: nil }
  end
end
