class NewsOpengraphProcessingJob < ActiveJob::Base
  queue_as :news_opengraph_processing

  def perform(id)
    NewsOpengraphService.recreate(id)
  end
end
