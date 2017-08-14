class UserFilter < BaseFilter
  attr_accessor :first_name, :last_name, :email, :user_type

  class << self
    def user_types
      { fake: 'Отличник', real: 'Ученик' }.invert.to_a
    end
  end

  def apply(relation)
    result[:first_name] = first_name if first_name.present?
    result[:last_name] = last_name if last_name.present?
    result[:emails] = email.downcase if email.present?

    result[:is_fake] = true if fake_users?
    result[:is_fake] = false if real_users?

    relation.where(filter: result)
  end

  def fake_users?
    user_type == 'fake'
  end

  def real_users?
    user_type == 'real'
  end
end
