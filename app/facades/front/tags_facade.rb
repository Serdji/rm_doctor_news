class Front::TagsFacade
  SIMILAR_TAGS_LIMIT       = 4
  PER_PAGE_QUESTIONS_LIMIT = 20
  PER_PAGE_TAGS_LIMIT      = 18

  delegate :params, to: :@controller

  def initialize(controller)
    @controller = controller
  end

  def tags
    @tags ||= begin
      options = {
        has_questions: true, sort: '-weight',
        page: { number: params[:page], size: PER_PAGE_TAGS_LIMIT }
      }
      collection = View::Qa::Tag.get('tags', options).includes(:seo, :image)
      Front::TagDecorator.decorate_collection(collection)
    end
  end

  def metapage
    @metapage ||= Metapage.qa.find_by(label: 'Темы')
  end

  def discussing_questions
    @discussing_questions ||= begin
      options = { include: 'tags,user', page: { size: 4 } }
      collection = View::Qa::Question.get("tags/#{tag.id}/discussing_questions", options)
                                     .includes(:seo)
      Front::QuestionDecorator.decorate_collection(collection)
    end
  end

  def tag_questions
    @tag_questions ||= begin
      options = {
        page: { size: PER_PAGE_QUESTIONS_LIMIT, number: params[:page] },
        include: 'tags,user', sort: '-questions.created_at',
        filter: { state: Qa::Question::PUBLIC_STATES }
      }
      collection = View::Qa::Question.get("tags/#{tag.id}/questions", options).includes(:seo)
      Front::QuestionDecorator.decorate_collection(collection)
    end
  end

  def similar_tags
    @similar_tags ||= begin
      options = { page: { size: SIMILAR_TAGS_LIMIT }, has_questions: true }
      collection = View::Qa::Tag.get("tags/#{tag.id}/similar_tags", options).includes(:seo, :image)
      Front::TagDecorator.decorate_collection(collection)
    end
  end

  def tag
    @tag ||= begin
      tag = View::Qa::Tag.get("tags/slug/#{params[:slug]}")
      Front::TagDecorator.decorate(tag) if tag
    end
  end
end
