class Front::NewsController < Front::ApplicationController
  layout 'news'

  MORE_LIMIT = 18
  SOURCE_LIMIT = 3

  before_action :check_from, only: :load_more

  helper_method :news_facade

  def show
    not_found unless news_facade.item
  end

  def load_more_fresh
    from, to = params[:from], (params[:from].to_i + items_limit - 1)
    news = redis.zrangebyscore('news:fresh', from, to)

    is_more = true

    if news.count < items_limit
      limit = items_limit - news.count
      rest = ::News.fresh.with_images.limit(limit).where.not(id: exclude_ids)

      if rest.length.zero?
        is_more = false
      else
        news += rendered_news(rest.to_a)
      end
    end

    self.response_body = { data: news, more: is_more }.to_json
    self.content_type = 'application/json'
  end

  def load_more
    news = ::News.with_images.limit(items_limit).published_before(from).
      where.not(id: exclude_ids)

    self.response_body = { data: rendered_news(news), more: more_link(news) }.to_json
    self.content_type = 'application/json'
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

  def from
    Time.zone.at(params[:from].to_i)
  end

  def items_limit
    limit = params.fetch(:limit, MORE_LIMIT).to_i
    limit > 100 || limit.negative? ? MORE_LIMIT : limit
  end

  def check_from
    render json: { data: [], more: nil } if params[:from].blank?
  end

  def rendered_news(news)
    news = Front::NewsDecorator.decorate_collection(news).to_a

    rendered = render_to_string(
      partial: 'front/news/news_items.html.slim', collection: news,
      as: :news, spacer_template: 'front/news/delimiter.html.slim'
    )

    rendered.blank? ? [] : rendered.split('---')
  end

  def more_link(news)
    is_more = ::News.with_images.published_before(news.last.published_date).
      where.not(id: exclude_ids).exists?

    return unless is_more
    news_load_more_path(from: news.last.published_date.to_i, trailing_slash: false)
  end

  def redis
    @redis ||= Rails.application.config.redis_store
  end

  def exclude_ids
    redis.lrange('news:fresh:ids', 0, -1)
  end
end
