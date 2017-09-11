class NewsProcessingJob < ActiveJob::Base
  class NewsUpdater
    attr_reader :news

    def initialize(json)
      @news = Import::Wrappers::News.new(json)
    end

    def call
      stored = News.find_by(external_id: @news.id)

      if stored
        if @news.modified_date > stored.modified_date
          Rails.logger.info("Update news with id: #{@news.id}")

          stored.assign_attributes(build_attributes)
          stored.save
        else
          Rails.logger.info('News with id %s without changes' % @news.id)
        end

        stored
      else
        Rails.logger.info("Create news with id: #{@news.id}")
        News.create(build_attributes)
      end
    end

    private

    def build_attributes
      attributes = @news.attributes

      attributes[:external_id] = attributes.delete(:id)

      attributes[:image] = attributes[:image].to_h
      attributes[:pitem] = attributes[:pitem].to_h

      topic = attributes.delete(:topic)

      attributes.merge!(
        topic_id: topic.id,
        topic_alias: topic.alias,
        topic_name: topic.name
      )

      attributes[:topics].map! { |topic| topic.to_h.slice(:name, :alias) }

      attributes
    end
  end

  queue_as :news_processing

  FRESH_KEY = 'news:fresh'.freeze
  FRESH_IDS_KEY = 'news:fresh:ids'.freeze

  def perform
    topics = Import::News::Topics.new

    fresh = topics.map { |news| NewsUpdater.new(news).call }
    fresh = Front::NewsDecorator.decorate_collection(fresh.select(&:with_image?))

    redis_multi do
      redis.del FRESH_KEY
      redis.del FRESH_IDS_KEY

      redis.lpush FRESH_IDS_KEY, fresh.map(&:id)

      redis.zadd FRESH_KEY, [0, render_main_news(fresh.shift)]
      redis.zadd FRESH_KEY, (1..fresh.count).zip(render_to_array(fresh))
    end
  ensure
    redis.close
  end

  private

  def render_main_news(news)
    object = OpenStruct.new(main: news)
    view.render partial: 'front/news/news_main', locals: { news_facade: object, fresh: true }
  end

  def render_to_array(news)
    news.map do |item|
      view.render partial: 'front/news/news_items', locals: { news: item, fresh: true }
    end
  end

  def view
    @view ||= begin
      view = ActionView::Base.new('app/views')
      view.class_eval { include Front::ApplicationHelper }
      view
    end
  end

  def redis
    @redis ||= RedisFactory.build_connection_for(:cache)
  end

  def redis_multi
    return unless block_given?

    redis.multi
    yield
    redis.exec
  end
end
