class QuestionFilter < BaseFilter
  class << self
    def user_types
      { fake: 'Вопросы отличников', real: 'Вопросы учеников' }.invert.to_a
    end
  end

  attr_accessor :without_answers,
                :without_best_answer,
                :only_interesting_questions,
                :with_complaints,
                :states,
                :title,
                :user_type

  check_box_attributes :without_answers,
                       :without_best_answer,
                       :only_interesting_questions,
                       :with_complaints

  def apply(relation)
    result[:has_best_answer] = false if without_best_answer?
    result[:answers_counter] = 0 if without_answers?
    result[:state] = states if states.any?
    result[:title] = title if title.present?

    result[:is_interesting] = true if only_interesting_questions?
    result[:has_complaints] = true if with_complaints?

    result['users.is_fake'] = true if fake_users?
    result['users.is_fake'] = false if real_users?

    relation.where(filter: result, include: 'user')
  end

  private

  def normalize_attributes!(attributes)
    attributes[:states] ||= []
    attributes[:states].reject!(&:blank?)
  end

  def fake_users?
    user_type == 'fake'
  end

  def real_users?
    user_type == 'real'
  end
end
