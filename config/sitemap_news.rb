# News sitemap
SitemapGenerator::Sitemap.default_host = DomainFactory.url('production')
SitemapGenerator::Sitemap.include_root = false
SitemapGenerator::Sitemap.filename = :sitemap_news

SitemapGenerator::Sitemap.create do
  News.find_each do |news|
    path = Front::NewsDecorator.decorate(news).local_path
    add path, changefreq: 'mounthly', priority: 0.7, lastmod: news.modified_date
  end
end

# index sitemap
SitemapGenerator::Sitemap.filename = :sitemap
SitemapGenerator::Sitemap.create do
  add_to_index '/sitemap_news.xml.gz'
  add_to_index '/sitemap_questions.xml.gz'
end
