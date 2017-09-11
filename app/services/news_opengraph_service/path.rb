module NewsOpengraphService
  class Path
    attr_accessor :tmp

    def initialize(news, prefix = 'default')
      @news = news
      @prefix = prefix
    end

    def db
      ext = File.extname(@news.image_url)

      md5 = Digest::MD5.new
      md5 << @news.updated_at.to_s

      "news/#{@news.external_id}/#{md5.hexdigest}_#{@prefix}#{ext}"
    end

    def webdav
      Pathname.new(WebdavFactory.write_url).join(db)
    end
  end
end
