class Front::NewsController < Front::ApplicationController
  layout 'news'

  MORE_LIMIT = 18
  SOURCE_LIMIT = 3

  before_action :check_from, only: :load_more

  helper_method :news_facade

  def show
    not_found unless news_facade.item
  end

  def load_more
    @news = ::News.ordered.with_images.limit(items_limit).ordered_after(params[:from])
    @news = Front::NewsDecorator.decorate_collection(@news).to_a

    render json: { data: rendered_news, more: more_link }
  end

  def from_same_source
    id = params[:cluster_id]
    news = id ? News.from_same_source(cluster_id: id, limit: SOURCE_LIMIT) : []
    news.map! do |item|
      item.title = item.title.truncate(50)
      item
    end
    render json: news
  end

  private

  def news_facade
    @news_facade ||= Front::NewsFacade.new(self)
  end

  def items_limit
    limit = params.fetch(:limit, MORE_LIMIT).to_i
    limit > 100 || limit.negative? ? MORE_LIMIT : limit
  end

  def check_from
    render json: { data: [], more: nil } if params[:from].blank?
  end

  def rendered_news
    rendered = render_to_string(
      partial: 'front/news/news_items.html.slim', collection: @news,
      as: :news, spacer_template: 'front/news/delimiter.html.slim'
    )

    rendered.blank? ? [] : rendered.split('---')
  end

  def more_link
    is_more = ::News.ordered.with_images.ordered_after(@news.last.ordered_at).exists?
    return unless is_more

    news_load_more_path(from: @news.last.ordered_at, trailing_slash: false)
  end
end
