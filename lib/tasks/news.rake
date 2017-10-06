namespace :news do
  namespace :images do
    desc 'Rebuild news images and images links'
    task rebuild_links: :environment do
      News.with_images.find_each do |news|
        puts "Updating news with id: #{news.id} and image: #{news.image_url}"

        versions_builder = Import::ImageVersions.new(
          news.image_url, Import::Wrappers::News::Image::VERSIONS
        )

        image = news.image
        image.versions = versions_builder.build

        news.image_will_change!
        news.image = image

        news.save
      end
    end
  end

  desc 'Get all images from 01.06.2017 (update only chanched)'
  task pull: :environment do
    Rails.logger = Logger.new(STDOUT)

    from = Date.current
    to = Date.parse('01.06.2017')

    importer = Import::News::Archive.new(days: (from - to).to_i)
    importer.each do |news|
      id = news['id']
      url = "http://coolstream.rambler.ru/clusters/info/?ids=#{id}"
      json = JSON.parse(open(url).read)
      content = json['result'][id.to_s]
      NewsProcessingJob::NewsUpdater.new(content).call
    end
  end

  desc 'Rebuild a piece of news with id: rake news:rebuild[id]'
  task :rebuild, [:id] => :environment do |_t, agrs|
    if (id = agrs.fetch(:id, nil))
      url = "http://coolstream.rambler.ru/clusters/info/?ids=#{id}"
      json = JSON.parse(open(url).read)
      content = json['result'][id.to_s]
      NewsProcessingJob::NewsUpdater.new(content).call
    end
  end
end
