class Front::NewsController < Front::ApplicationController
  decorates_assigned :item, with: Front::NewsDecorator

  layout 'news'

  MORE_LIMIT = 18
  SOURCE_LIMIT = 3

  before_action :check_from, only: :load_more

  def show
    @item = ::News.find_by(external_id: params[:id])
    not_found unless @item
  end

  def load_more
    @news = ::News.fresh.with_images.limit(items_limit).published_before(from)
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

  def items_limit
    limit = params.fetch(:limit, MORE_LIMIT).to_i
    limit > 100 || limit.negative? ? MORE_LIMIT : limit
  end

  def check_from
    render json: { data: [], more: nil } if params[:from].blank?
  end

  def from
    Time.zone.at(params[:from].to_i)
  end

  def rendered_news
    rendered = render_to_string(
      partial: 'front/news/news_items.html.slim', collection: @news,
      as: :news, spacer_template: 'front/news/delimiter.html.slim'
    )

    rendered.blank? ? [] : rendered.split('---')
  end

  def more_link
    is_more = ::News.fresh.with_images.published_before(@news.last.published_date).exists?
    return unless is_more

    news_load_more_path(from: @news.last.published_date.to_i, trailing_slash: false)
  end
end
