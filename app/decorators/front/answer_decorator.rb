class Front::AnswerDecorator < Draper::Decorator
  include Iso8601Dates
  include Avatarable

  delegate :full_name, to: :user, prefix: true, allow_nil: true

  delegate_all
end
