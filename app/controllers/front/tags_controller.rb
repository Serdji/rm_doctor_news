class Front::TagsController < Front::ApplicationController
  before_action :check_tag, only: :show

  helper_method :tags_facade

  def index; end

  def show
    @hide_ban_footer = true

    return if mobile_version?
    @discussing_questions = tags_facade.discussing_questions
  end

  def search
    options = {
      page: { size: 7 },
      filter: { is_published: true, name: params[:search] }
    }
    tags = View::Qa::Tag.get('tags', options).includes(:seo)
    render json: tags.map { |tag| { id: tag.id, name: tag.name } }
  end

  def options
    options = {
      sort: '-weight',
      page: { size: 10 },
      filter: { is_published: true }
    }
    tags = View::Qa::Tag.get('tags', options).includes(:seo)
    render json: tags.map { |tag| { id: tag.id, name: tag.name } }
  end

  private

  def tags_facade
    @tags_facade ||= Front::TagsFacade.new(self)
  end

  def check_tag
    tag = tags_facade.tag
    raise Front::NotFoundError unless tag && tag.published?
  end
end
