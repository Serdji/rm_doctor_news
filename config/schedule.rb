every '5 * * * *', roles: [:backend] do
  rake 'sitemap:create CONFIG_FILE="config/sitemap_news.rb"'
end

every :day, at: '0:10am', roles: [:backend] do
  rake 'sitemap:create CONFIG_FILE="config/sitemap_questions.rb"'
end

every 5.minutes, roles: [:backend] do
  runner 'Import::News::Topics.store'
end

every '15 * * * *', roles: [:backend] do
  rake 'sitemap:upload'
end
