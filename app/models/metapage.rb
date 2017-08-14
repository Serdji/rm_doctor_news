class Metapage < ActiveRecord::Base
  include Seoable

  belongs_to :metapages_type

  has_one :seo, as: :seoable

  has_many :images, as: :imageable, dependent: :destroy

  accepts_nested_attributes_for :seo, allow_destroy: true, reject_if: :all_blank

  scope :qa, -> { where(metapages_type_id: MetapagesType.qa_page_id) }

  scope :ordered, lambda {
    order(
      :metapages_type_id,
      :title
    )
  }

  after_create -> { create_seo }
end
