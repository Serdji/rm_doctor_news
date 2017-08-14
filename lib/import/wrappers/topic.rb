module Import
  module Wrappers
    class Topic
      include Virtus.model

      attribute :id, Integer
      attribute :name, String
      attribute :alias, String
    end
  end
end
