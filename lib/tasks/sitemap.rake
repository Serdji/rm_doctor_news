namespace :sitemap do
  desc 'Upload local sitemap to WebDav'
  task upload: :environment do
    ['sitemap.xml.gz', 'sitemap_news.xml.gz', 'sitemap_questions.xml.gz'].each do |file|
      local_path = Rails.root.join("public/#{file}").to_s
      `curl -T '#{local_path}' '#{WebdavFactory.write_url}/#{file}'` if File.exist? local_path
    end
  end
end
