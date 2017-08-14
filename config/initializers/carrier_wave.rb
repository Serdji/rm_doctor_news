CarrierWave.configure do |config|
  webdav_config = WebdavFactory.new
  asset_host_config = AssetHostFactory.new

  if Rails.env.test? || Rails.env.development?
    config.storage = :file
    config.asset_host = 'http://localhost:3000'
  else
    config.storage = :webdav
    config.cache_storage = :webdav

    config.webdav_server = webdav_config.read_url
    config.webdav_write_server = webdav_config.write_url
    config.asset_host = asset_host_config.domain
  end
end

CarrierWave::SanitizedFile.sanitize_regexp = /[^[:word:]\.\-\+]/
