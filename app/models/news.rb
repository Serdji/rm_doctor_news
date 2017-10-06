class News < ActiveRecord::Base
  self.inheritance_column = nil

  scope :fresh, -> { order(published_date: :desc) }
  scope :old, -> { order(published_date: :asc) }

  scope :with_images, -> { where.not(image_url: nil) }

  scope :published_after, ->(date) { old.where('published_date > ?', date) }
  scope :published_before, ->(date) { fresh.where('published_date < ?', date) }

  after_create_commit do
    NewsOpengraphProcessingJob.perform(id)
  end

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

  def opengraph
    Hashie::Mash.new(self[:opengraph])
  end

  def interesting
    @interesting ||= News::InterestingNewsBuilder.new(self).call
  end

  def published_before
    self.class.published_before(published_date)
  end

  def published_after
    self.class.published_after(published_date)
  end

  def with_image?
    image_url.present?
  end
end

class InterestingNewsBuilder
  attr_reader :news, :result

  LIMIT = 6
  HALF_LIMIT = LIMIT / 2

  def initialize(news)
    @news = news
    @result = []
  end

  def call
    contained_all? ? full_build : partial_build
    result
  end

  private

  def contained_all?
    before.size >= HALF_LIMIT && after.size >= HALF_LIMIT
  end

  def full_build
    result.unshift(*before.pop(HALF_LIMIT))
    result.concat after.shift(HALF_LIMIT)
  end

  def before_build
    result.concat before
    result.concat after.shift(LIMIT - result.size)
  end

  def after_build
    result.concat after
    result.concat before.pop(LIMIT - result.size)
  end

  def partial_build
    if before.size < HALF_LIMIT
      before_build
    elsif after.size < HALF_LIMIT
      after_build
    end
  end

  def before
    @before ||= news.published_before.with_images.limit(LIMIT).to_a
  end

  def after
    @after ||= news.published_after.with_images.limit(LIMIT).to_a
  end
end
