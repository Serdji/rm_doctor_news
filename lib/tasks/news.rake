namespace :news do
  namespace :images do
    task rebuild_links: :environment do
      News.with_images.find_each do |news|
        puts "Updating news with id: #{news.id} and image: #{news.image_url}"

        versions_builder = Import::ImageVersions.new(
          news.image_url, Import::Wrappers::Image::VERSIONS
        )

        image = news.image
        image.versions = versions_builder.build

        news.image_will_change!
        news.image = image

        news.save
      end
    end
  end
end
