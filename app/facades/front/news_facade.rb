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

  def interesting
    @interesting ||= item.interesting
  end

  def item
    @item ||= begin
      item = ::News.with_images.find_by(external_id: params[:id])
      Front::NewsDecorator.decorate(item) if item
    end
  end

  private

  def news
    @news ||= redis.zrangebyscore('news:fresh', 0, NEWS_LIMIT - 1)
  end

  def redis
    @redis ||= Rails.application.config.redis_store
  end
end
