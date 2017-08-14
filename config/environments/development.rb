Rails.application.configure do
  if ENV['CACHE']
    config.cache_classes = true
    config.eager_load = true
    config.consider_all_requests_local = false

    config.action_controller.perform_caching = true
  else
    config.cache_classes = false
    config.eager_load = false
    config.consider_all_requests_local = true

    config.action_controller.perform_caching = false
    config.cache_store = :null_store
  end

  config.action_mailer.raise_delivery_errors = false
  config.action_mailer.perform_caching = false

  config.active_support.deprecation = :log

  config.active_record.migration_error = :page_load

  config.assets.debug = true
  config.assets.quiet = true

  config.action_mailer.default_url_options = { host: 'localhost', port: 3000 }
end