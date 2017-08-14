module Import
  class Result
    attr_reader :response_json

    def initialize(response_json)
      @response_json = response_json
    end

    def current_page
      response_json.dig('page', 'current')
    end

    def next_page
      response_json.dig('page', 'next')
    end

    def news
      response_json.dig('result')
    end
  end
end
