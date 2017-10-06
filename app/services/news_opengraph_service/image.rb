module NewsOpengraphService
  class Image
    include Magick

    WIDTH = 1200
    HEIGHT = 630
    BORDER_OFFSET = 100
    ICON_SIZE = 40

    attr_reader :path

    def initialize(image)
      return unless image
      file = Tempfile.new('opengraph')
      file.binmode
      open(image, allow_redirections: :safe) { |uri| file.write(uri.read) }
      file.close

      @path = ObjectSpace.undefine_finalizer(file).path
      @image = ImageList.new(@path)[0]
      resize!
      shadow!
      logo!
      icon!
    end

    def self.save(path, title)
      return unless (obj = new(path))
      obj.title = title
      obj.write
    end

    def write
      @image.write @path
      @path
    end

    def title=(title)
      text = Draw.new
      text.pointsize = 56
      text.gravity = NorthWestGravity
      text.font = corsica_font

      arr = News::TitleSpliter.new(title).map.to_a

      arr.each_with_index do |s, i|
        break if i > 2
        text.annotate(@image, 0, 0, offset_size, 255 + i * 66, s.gsub('%', '\\%')) do
          self.fill = 'white'
        end
      end
    end

    private

    def corsica_font
      corsica = 'app/webpack/stylesheets/front/blocks/font/CorsicaRamblerLX-SemiBold.ttf'
      Rails.root.join(corsica).to_s
    end

    def shadow!
      @image.blur = 5
      path = 'app/assets/images/sharing/snippet_greenblue.png'
      shadow = ImageList.new(Rails.root.join(path))
      @image.composite!(shadow, 0, 0, OverCompositeOp)
    end

    def logo!
      path = 'app/assets/images/sharing/doctor{{XX}}px.png'.gsub('{{XX}}', logo_size.to_s)
      logo = ImageList.new(Rails.root.join(path))
      @image.composite!(logo, offset_size, offset_size, OverCompositeOp)

      self
    end

    def icon!
      path = 'app/assets/images/sharing/icon_doctor_{{XX}}.png'.gsub('{{XX}}', icon_size.to_s)
      icon = ImageList.new(Rails.root.join(path))
      @image.composite!(icon, width_size - offset_size - icon_size, offset_size, OverCompositeOp)

      self
    end

    def image_size
      [self.class::WIDTH, self.class::HEIGHT]
    end

    def width_size
      image_size[0]
    end

    def height_size
      image_size[1]
    end

    def offset_size
      self.class::BORDER_OFFSET
    end

    def icon_size
      self.class::ICON_SIZE
    end

    alias logo_size icon_size

    def resize!
      width, height = image_size

      @image.scale!(width, (width * @image.rows / @image.columns.to_f).to_i)
      @image.crop!(0, 0, width, height)
    end
  end
end
