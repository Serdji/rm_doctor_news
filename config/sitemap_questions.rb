# QA sitemap
SitemapGenerator::Sitemap.default_host = DomainFactory.url('production')
SitemapGenerator::Sitemap.include_root = false
SitemapGenerator::Sitemap.filename = :sitemap_questions

SitemapGenerator::Sitemap.create do
  def with_each_page(collection)
    Array(1..collection.total_pages).each do |page|
      yield page
    end
  end

  # Questions
  add root_path, changefreq: 'always', priority: 1

  # Tags
  add temy_path, changefreq: 'daily', priority: 0.8

  # Questions
  add voprosy_path, changefreq: 'hourly', priority: 0.7

  # Tag
  with_each_page(Qa::Tag.published) do |page|
    tags = Qa::Tag.published.where(page: { number: page })
    tags.each do |tag|
      add tag_path(slug: tag.slug), changefreq: 'daily', priority: 0.8, lastmod: tag.updated_at
    end
  end

  # Question
  with_each_page(Qa::Question.published) do |page|
    questions = Qa::Question.published.where(page: { number: page }, include: 'tags')
    questions.each do |question|
      tag_slug = question.tags.first.slug
      path = question_path(id: question.id, slug: question.slug, tag_slug: tag_slug)
      add path, changefreq: 'daily', priority: 0.5, lastmod: question.ordered_at
    end
  end
end

# index sitemap
SitemapGenerator::Sitemap.filename = :sitemap
SitemapGenerator::Sitemap.create do
  add_to_index '/sitemap_news.xml.gz'
  add_to_index '/sitemap_questions.xml.gz'
end
