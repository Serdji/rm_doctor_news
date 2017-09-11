module Import
  module News
    class Topics < Base
      DEFAULT_PARAMS = {
        id: 48, overall_count: 'False', limit: 10
      }.freeze

      PATH = 'clusters/topic/all'.freeze

      class << self
        delegate :store, to: :new
      end

      def store
        NewsProcessingJob.perform
      end
    end
  end
end
