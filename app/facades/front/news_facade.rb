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

  def interesting_left
    @interesting_left ||= interesting[0..(interesting.size / 2 - 1)]
  end

  def interesting_right
    @interesting_right ||= begin
      size = interesting.size - interesting_left.size
      interesting[-size..-1]
    end
  end

  def item
    @item ||= begin
      item = ::News.find_by(external_id: params[:id])
      Front::NewsDecorator.decorate(item) if item
    end
  end

  private

  def news
    @news ||= begin
      items = ::News.ordered.with_images.limit(NEWS_LIMIT).to_a
      Front::NewsDecorator.decorate_collection(items)
    end
  end
end
