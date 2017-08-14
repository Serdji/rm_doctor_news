module Import
  module Wrappers
    class Popular
      class Image
        include Virtus.model

        attribute :height, Integer
        attribute :width, Integer
        attribute :url, String
      end
    end
  end
end
