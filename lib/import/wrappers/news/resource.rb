module Import
  module Wrappers
    class News
      class Resource
        include Virtus.model

        attribute :id, Integer
        attribute :title, String
        attribute :host, String
        attribute :url, String
      end
    end
  end
end
