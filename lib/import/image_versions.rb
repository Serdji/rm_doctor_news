module Import
  class ImageVersions
    attr_reader :origin_url, :versions

    def initialize(url, versions)
      @origin_url = url
      @versions = versions
    end

    def build
      versions.map do |name, size|
        [name, build_version(origin_url, size)]
      end.to_h
    end

    private

    def build_version(url, size)
      Import::ImageResizer.new(url, size).build
    end
  end
end
