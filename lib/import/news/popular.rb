module Import
  module News
    class Popular < Base
      DEFAULT_PARAMS = { alias: 'health' }.freeze
      PATH = 'items/resource/popular'.freeze
    end
  end
end
