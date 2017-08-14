module Import
  module Wrappers
    class Popular
      include Virtus.model

      attribute :id, Integer
      attribute :pubdate, Integer
      attribute :title, String
      attribute :url, String

      attribute :image, Import::Wrappers::Popular::Image
      attribute :resource, Import::Wrappers::Popular::Resource
    end
  end
end
