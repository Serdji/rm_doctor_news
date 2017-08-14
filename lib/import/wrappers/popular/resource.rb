module Import
  module Wrappers
    class Popular
      class Resource
        include Virtus.model

        attribute :id, Integer
        attribute :title, String
        attribute :url, String

        attribute :favicon, Hash

        def favicon
          Hashie::Mash.new(super)
        end
      end
    end
  end
end
