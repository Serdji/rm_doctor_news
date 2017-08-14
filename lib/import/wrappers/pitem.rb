module Import
  module Wrappers
    class Pitem
      include Virtus.model

      attribute :id, Integer
      attribute :is_fulltext, Boolean
      attribute :title, String
      attribute :url, String
    end
  end
end
