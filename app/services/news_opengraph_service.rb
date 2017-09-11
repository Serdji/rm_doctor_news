module NewsOpengraphService
  class << self
    def recreate(id)
      @news = News.find(id)
      return unless @news.image_url

      default, twitter = pathes
      default.tmp, twitter.tmp = create_images

      [default, twitter].each { |img| system("curl -T '#{img.tmp}' '#{img.webdav}'") }
      @news.opengraph = { default: default.db, twitter: twitter.db }
      @news.save
    end

    def create_images
      [
        self::Image.save(@news.image_url, @news.title),
        self::Twitter.save(@news.image_url, @news.title)
      ]
    end

    def pathes
      [
        self::Path.new(@news),
        self::Path.new(@news, 'twitter')
      ]
    end
  end
end
