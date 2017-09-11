class Front::QuestionDecorator < Draper::Decorator
  include HumanDates
  include Iso8601Dates
  include Avatarable

  LINES = 2

  delegate_all
  delegate :name, to: :main_tag, prefix: true

  def published?
    state != 'hidden'
  end

  def human_answers_counter
    [
      answers_counter,
      Qa::Answer.model_name.human(count: answers_counter)
    ].join(' ')
  end

  def best_answer
    answers.detect(&:best_answer)
  end

  def without_best_answer
    answers.reject(&:best_answer)
  end

  def path(anchor = nil)
    h.question_path object.id, tag_slug: main_tag.slug, slug: object.slug, anchor: anchor
  rescue => e
    path_logger(id, e)
  end

  def main_tag
    tags.first
  end

  def safe_body(length: nil, link: false, strip_tags: false, omission: '')
    result, more = sanitize_with_br(length, strip_tags)
    result = result.truncate(length, omission: omission, separator: %r{\s(?!/)}) if length
    if link && more
      "#{result} #{h.tag(:br)} #{more_link}"
    else
      result
    end
  end

  def tags
    @tags ||= object.tags.select(&:is_published?)
  end

  def anchor
    if answers_counter.zero?
      'your-new-answer'
    elsif has_best_answer
      'best-answer'
    else
      'answers'
    end
  end

  def answers
    @answers ||= Front::AnswerDecorator.decorate_collection(object.answers)
  end

  def hide_more_answers?
    answers_count = answers.size
    (best_answer && answers_count < 2) || (!best_answer && answers_count < 1)
  end

  private

  def sanitize_with_br(length, strip_tags)
    more = length && length < body.length
    if strip_tags
      lines = h.sanitize(body, tags: ['br'], attributes: []).split(%r{<br[ /]*>})
      [lines[0, LINES].join('<br />'), more || lines.count > LINES]
    else
      [h.sanitize(body), more]
    end
  end

  def path_logger(id, e)
    Rails.logger.info(format('Building question (%s) path with error: %s', id, e))
    Rails.logger.info(e.backtrace.join("\n"))
    id.to_s
  end

  def more_link
    h.link_to("Читать дальше #{h.content_tag(:span, '•••')}".html_safe, path)
  end
end
