class Front::NewsFacade
  NEWS_LIMIT = 15

  delegate :params, to: :@controller

  def initialize(controller)
    @controller = controller
  end

  def main
    @main ||= news.first
  end

  def rest
    news[1..NEWS_LIMIT]
  end

  private

  def news
    @news ||= begin
      items = ::News.fresh.with_images.limit(NEWS_LIMIT).to_a
      Front::NewsDecorator.decorate_collection(items)
    end
  end
end
