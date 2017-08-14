class ApplicationFacade
  DISCUSSING_TAGS_LIMIT = 4
  DISCUSSING_QUESTIONS_LIMIT = 8
  SEO_LINKS_LIMIT = 10
  POPULAR_LIMIT = 6

  def initialize(controller)
    @controller = controller
  end

  def interesting_questions
    @interesting_questions ||= begin
      options = {
        include: 'tags',
        filter: { is_interesting: true, state: Qa::Question::PUBLIC_STATES },
        page: { size: POPULAR_LIMIT },
        sort: '-questions.answers_counter'
      }

      collection = View::Qa::Question.get('questions', options).includes(:seo)
      Front::QuestionDecorator.decorate_collection(collection)
    end
  end

  def most_discussing_questions(limit = DISCUSSING_QUESTIONS_LIMIT, size_force: false)
    @discussing_questions ||= begin
      options = {
        from: Date.current - 7.days,
        limit: limit,
        include: 'tags,user'
      }
      collection = View::Qa::Question.get('questions/most_discussing', options).includes(:seo)
      if size_force && collection.count < limit
        options = {
          page: { size: limit },
          include: 'tags,user',
          filter: { state: Qa::Question::PUBLIC_STATES },
          sort: '-questions.answers_counter'
        }
        additional = View::Qa::Question.get('questions', options)
        merge_without_doubles!(collection, additional, limit)
      end
      Front::QuestionDecorator.decorate_collection(collection)
    end
  end

  def most_discussing_tags(limit = DISCUSSING_TAGS_LIMIT, size_force: false)
    @discussing_tags ||= discussing_tags(
      from: Date.current - 7.days,
      limit: limit,
      size_force: size_force
    )
  end

  def today_discussing_tags(limit = DISCUSSING_TAGS_LIMIT, size_force: false)
    @today_discussing_tags ||= discussing_tags(
      from: Date.current - 1.day,
      limit: limit,
      size_force: size_force
    )
  end

  def seo_links
    @seo_links ||= SeoLink.limit(SEO_LINKS_LIMIT)
  end

  def new_complaint
    Qa::Complaint.new
  end

  def questions_counter
    stat = statistics.find { |s| s.name == 'questions_counter' }
    stat&.counter
  end

  def tags_counter
    stat = statistics.find { |s| s.name == 'tags_counter' }
    stat&.counter
  end

  def main_page_metapage
    @metapage ||= begin
      metapage = Metapage.includes(:seo).find_by(metapages_type_id: MetapagesType.main_page_id)
      Front::MetapageDecorator.decorate(metapage)
    end
  end

  private

  def statistics
    @statistics ||= View::Qa::Statistics.all
  end

  def discussing_tags(from:, to: Date.current, limit: DISCUSSING_TAGS_LIMIT, size_force: false)
    options = { from: from, to: to, limit: limit, has_questions: true }
    collection = View::Qa::Tag.get('tags/most_discussing', options).includes(:seo, :image)
    if size_force && collection.count < limit
      options = {
        page: { size: limit },
        has_questions: true,
        sort: '-tags.questions_counter'
      }
      additional = View::Qa::Tag.get('tags', options).includes(:seo, :image)
      merge_without_doubles!(collection, additional, limit)
    end
    Front::TagDecorator.decorate_collection(collection)
  end

  def merge_without_doubles!(collection, additional, limit)
    ids = collection.map(&:id)
    additional = additional.reject { |t| ids.include? t.id }
    collection.merge!(additional.entries.first(limit - collection.count))
  end
end
