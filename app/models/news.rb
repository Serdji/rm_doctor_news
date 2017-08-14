class News < ActiveRecord::Base
  self.inheritance_column = nil

  scope :fresh, -> { order(published_date: :desc) }
  scope :with_images, -> { where.not(image_url: nil) }
  scope :published_before, ->(date) { where('published_date < ?', date) }

  class << self
    def from_same_source(cluster_id:, limit:)
      importer = Import::News::Popular.new # (limit: limit)
      response = importer.call(oid: cluster_id)

      news = response.response_json.fetch('result', [])
      news.first(limit).map { |item| Import::Wrappers::Popular.new(item) }
    end
  end

  def image
    Hashie::Mash.new(self[:image])
  end

  def image_url(version = nil)
    return super() unless version
    image.versions[version.to_s]
  end

  def pitem
    Hashie::Mash.new(self[:pitem])
  end

  def resource
    Hashie::Mash.new(self[:resource])
  end
end
