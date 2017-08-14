module Import
  module Wrappers
    class Image
      include Virtus.model

      VERSIONS = {
        main: [375, 245],
        small: [135, 90],
        detail: [765, 425]
      }.freeze

      attribute :description, String
      attribute :height, Integer
      attribute :id, Integer
      attribute :source_url, String
      attribute :source_title, String
      attribute :url, String
      attribute :width, Integer
      attribute :versions, Hash

      def source=(hash)
        title, url = hash.values_at('title', 'url')

        self.source_title = title
        self.source_url = url
      end

      def url=(value)
        if value.present?
          super(value)
          self.versions = Import::ImageVersions.new(value, VERSIONS).build
        end
      end
    end
  end
end
