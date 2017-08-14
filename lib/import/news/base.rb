module Import
  module News
    class Base
      ENDPOINT = URI(
        'http://coolstream.rambler.ru/v1'
      )

      class JsonMiddleware < Faraday::Response::Middleware
        def on_complete(response_env)
          parsed = JSON.parse(response_env.body)
          response_env.body = Result.new(parsed)
        end
      end

      class_attribute :connection, instance_writer: false
      self.connection = Faraday.new(url: ENDPOINT) do |builder|
        builder.use JsonMiddleware
        builder.adapter Faraday.default_adapter
      end

      class << self
        def const_missing(name)
          case name
            when :DEFAULT_PARAMS then {}
            when :PATH then nil
            else super
          end
        end
      end

      attr_reader :params

      def initialize(params = {})
        default = self.class.const_get(:DEFAULT_PARAMS)
        @params = default.merge(params)
      end

      def call(options = {})
        path = self.class.const_get(:PATH)
        connection.get(path, params.merge(options)).body
      end
    end
  end
end
