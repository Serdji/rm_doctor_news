class Qa::User < Qa::Base
  has_many :questions, class_name: 'Qa::Question'
  has_many :answers, class_name: 'Qa::Answer'

  boolean_field :is_sentry, :is_fake

  class << self
    def upload_csv(file)
      qa_config = Rails.application.config_for(:qa_api)

      faraday_options = {
        url: qa_config.fetch('domain'),
        headers: {
          'X-Api-Version' => qa_config.fetch('api_version'),
          'X-Api-Token' => qa_config.fetch('api_token')
        }
      }

      connection = Faraday.new(faraday_options) do |builder|
        builder.use Faraday::Request::Multipart
        builder.use Her::Middleware::AcceptJSON
        builder.use FaradayMiddleware::ParseJson
        builder.adapter Faraday.default_adapter
      end

      file = Faraday::UploadIO.new(file.path, 'text/csv')
      response = connection.post('users/update_fakers', csv: file)
      response.body
    end
  end

  # TODO: move from this
  def full_name
    name = [first_name, last_name].compact.join(' ')
    name.blank? ? "Пользователь #{anonymous_id}" : name
  end
end
