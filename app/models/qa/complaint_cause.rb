class Qa::ComplaintCause
  include Her::Model

  # rubocop:disable Style/MutableConstant
  CAUSES = []
  # rubocop:enable Style/MutableConstant

  class << self
    def each_cause
      const_get(:CAUSES).each { |cause| yield cause }
    end
  end
end
