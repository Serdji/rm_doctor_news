module Import
  module News
    class Topics < Base
      include Enumerable

      DEFAULT_PARAMS = {
        id: 48, overall_count: 'False', limit: 10
      }.freeze

      PATH = 'clusters/topic/all'.freeze

      class << self
        delegate :store, to: :new
      end

      def store
        each { |news| NewsProcessingJob.perform(news) }
      end

      def each
        current_page = 1

        loop do
          result = call(page: current_page)
          news = result.news

          news.each { |n| yield n } if news.any?

          break unless result.next_page
          current_page += 1
        end
      end
    end
  end
end
