class WebdavFactory
  class << self
    delegate :read_url, :write_url, to: :new
  end

  def initialize
    @yaml = Rails.application.config_for('webdav')
    @yaml.deep_symbolize_keys!
  end

  def path
    @yaml.fetch(:path)
  end

  def write_endpoint
    @yaml.fetch(:write_endpoint)
  end

  def read_endpoint
    @yaml.fetch(:read_endpoint)
  end

  def write_url
    [write_endpoint, path].join('/')
  end

  def read_url
    [read_endpoint, path].join('/')
  end
end
