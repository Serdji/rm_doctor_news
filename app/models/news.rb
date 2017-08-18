class News < ActiveRecord::Base
  self.inheritance_column = nil

  scope :ordered, -> { where.not(ordered_at: nil).order(ordered_at: :asc) }
  scope :with_images, -> { where.not(image_url: nil) }
  scope :ordered_after, ->(date) { where('ordered_at > ?', date) }

  scope :published_after, ->(date) {
    order(published_date: :asc).where('published_date > ?', date)
  }

  scope :published_before, ->(date) {
    order(published_date: :asc).where('published_date < ?', date)
  }

  before_create :setup_ordered_at

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

  def interesting
    @interesting ||= News::InterestingNewsBuilder.new(self).call
  end

  def published_before
    self.class.published_before(published_date)
  end

  def published_after
    self.class.published_after(published_date)
  end

  private

  def setup_ordered_at
    self.ordered_at = (Time.now.to_f * 1e7).to_i
  end
end

class InterestingNewsBuilder
  attr_reader :news, :result

  LIMIT = 6

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
    before.size >= LIMIT / 2 && after.size >= LIMIT / 2
  end

  def full_build
    result.unshift *before.pop(LIMIT / 2)
    result.push *after.shift(LIMIT / 2)
  end

  def partial_build
    if before.size < LIMIT / 2
      result.push *before
      result.push *after.shift(LIMIT - result.size)
    elsif after.size < LIMIT / 2
      result.push *after
      result.push *before.pop(LIMIT - result.size)
    end
  end

  def before
    @before ||= news.published_before.with_images.limit(LIMIT).to_a
  end

  def after
    @after ||= news.published_after.with_images.limit(LIMIT).to_a
  end
end
