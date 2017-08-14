module Import
  module Wrappers
    class News
      include Virtus.model

      attribute :id, Integer

      attribute :comments_count, Integer
      attribute :images_count, Integer
      attribute :items_count, Integer
      attribute :slides_count, Integer
      attribute :videos_count, Integer

      attribute :mark_modified_date, DateTime
      attribute :created_date, DateTime
      attribute :modified_date, DateTime
      attribute :published_date, DateTime

      attribute :breaking_ttl, Integer

      attribute :annotation, String
      attribute :link, String
      attribute :long_title, String
      attribute :path, String
      attribute :text, String
      attribute :title, String
      attribute :type, String
      attribute :image_url, String

      attribute :is_active, Boolean
      attribute :no_comments, Boolean
      attribute :breaking_status, Boolean

      attribute :topic, Import::Wrappers::Topic
      attribute :image, Import::Wrappers::Image
      attribute :pitem, Import::Wrappers::Pitem
      attribute :resource, Import::Wrappers::Resource

      attribute :topics, Array[Import::Wrappers::Topic]

      def image=(hash)
        if hash.present?
          self.image_url = hash.with_indifferent_access.fetch('url')
          super
        end
      end

      def breaking=(hash)
        status, ttl = hash.values_at('status', 'ttl')

        self.breaking_status = status
        self.breaking_ttl = ttl
      end

      def count=(hash)
        self.images_count = hash.fetch('images')
        self.items_count = hash.fetch('items')
        self.slides_count = hash.fetch('slides')
        self.videos_count = hash.fetch('videos')
      end

      def pubdate=(timestamp)
        return unless timestamp.present?
        self.published_date = Time.zone.at(timestamp)
      end

      def mark_modified=(timestamp)
        return unless timestamp.present?
        self.mark_modified_date = Time.zone.at(timestamp)
      end

      def time=(hash)
        created, modified = hash.values_at('created', 'modified')

        self.created_date = Time.zone.at(created) if created.present?
        self.modified_date = Time.zone.at(modified) if modified.present?
      end
    end
  end
end
