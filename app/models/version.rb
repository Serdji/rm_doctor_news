class Version < ActiveRecord::Base
  belongs_to :employee

  def item
    item_type.safe_constantize&.find(item_id)
  rescue ActiveRecord::RecordNotFound => e
    nil
  end
end
