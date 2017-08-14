class AnswerFilter < BaseFilter
  attr_accessor :states, :question_id, :user_type, :with_complaints, :without_best_answer

  check_box_attributes :without_best_answer,
                       :with_complaints

  class << self
    def user_types
      { fake: 'Ответы отличников', real: 'Ответы учеников' }.invert.to_a
    end
  end

  def apply(relation)
    result[:state] = states if states.any?
    result[:question_id] = question_id if question_id.present?

    result[:has_complaints] = true if with_complaints?
    result[:best_answer] = false if without_best_answer?

    result['users.is_fake'] = true if fake_users?
    result['users.is_fake'] = false if real_users?

    relation.where(filter: result, include: 'user')
  end

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
