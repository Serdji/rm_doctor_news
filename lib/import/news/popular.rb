module Import
  module News
    class Popular < Base
      DEFAULT_PARAMS = { topic: 48 }.freeze
      PATH = 'items/resource/popular'.freeze
    end
  end
end
