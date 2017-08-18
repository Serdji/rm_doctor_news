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

    attributes.merge!(topic_id: topic.id,
                      topic_alias: topic.alias,
                      topic_name: topic.name)

    attributes[:topics].map! { |topic| topic.to_h.slice(:name, :alias) }

    attributes
  end
end

class NewsProcessingJob < ActiveJob::Base
  queue_as :news_processing

  def perform
    topics = Import::News::Topics.new

    topics.each do |news|
      NewsUpdater.new(news).call
    end
  end
end
