class Front::HomeController < Front::ApplicationController
  decorates_assigned :discussing_tags, with: Front::TagDecorator

  helper_method :news_facade, :questions_facade

  def index
    options = {
      has_questions: true, sort: '-weight',
      page: { size: 9 }
    }
    collection = View::Qa::Tag.get('tags', options).includes(:seo, :image)
    @discussing_tags = Front::TagDecorator.decorate_collection(collection)

    render action: 'index', layout: 'news'
  end

  def mobile_toggle
    value = if params.fetch(:mobile_force, false)
              MOBILE_VERSION
            else
              mobile_version? ? DESKTOP_VERSION : MOBILE_VERSION
            end
    cookie_switch(value)

    redirect_back fallback_location: root_path
  end

  private

  def news_facade
    @news ||= Front::NewsFacade.new(self)
  end

  def questions_facade
    @questions ||= Front::QuestionsFacade.new(self)
  end
end
