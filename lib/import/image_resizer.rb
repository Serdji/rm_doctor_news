require 'digest'

module Import
  class ImageResizer
    RESIZER_ENDPOINT = 'https://img.rl0.ru'.freeze
    DEFAULT_TOKEN = 'test'.freeze

    attr_reader :url, :size, :params

    def initialize(image_url, size)
      image_uri = URI(image_url)

      @url = [image_uri.host, image_uri.path].join
      @params = 'c%sx%s' % size
    end

    def build
      [RESIZER_ENDPOINT, generate_sign, params, url].join('/')
    end

    private

    def generate_sign
      token = Settings.image_resizer_token
      return DEFAULT_TOKEN unless token

      Digest::MD5.hexdigest ([params, url].join('/') + token)
    end
  end
end
