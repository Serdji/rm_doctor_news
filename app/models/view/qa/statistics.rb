class View::Qa::Statistics
  include Virtus.model

  class << self
    def get(path, params = {})
      Qa::Client.call(path, self, params)
    end

    def all
      get('statistics').to_a
    end
  end

  attribute :counter, Integer
  attribute :name, String
end
