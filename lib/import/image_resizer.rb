module Import
  class ImageResizer
    RESIZER_ENDPOINT = 'http://img.rl0.ru'.freeze

    attr_reader :url, :size, :params

    def initialize(image_url, size)
      image_uri = URI(image_url)

      @url = [image_uri.host, image_uri.path].join
      @params = 'e%sx%s' % size
    end

    def build
      [RESIZER_ENDPOINT, sign, params, url].join('/')
    end

    private

    def sign
      'test'
      # Rails.env.development? ? 'test' : ENV['RESIZER_TOKEN']
    end
  end
end
