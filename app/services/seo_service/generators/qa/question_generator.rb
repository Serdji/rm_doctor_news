class SeoService
  module Generators
    module Qa
      class QuestionGenerator < BaseGenerator
        def title
          "#{gsubbed_title} – Рамблер/доктор"
        end

        def description
          "Ответы на вопрос – #{gsubbed_title} – читайте на Рамблер/доктор"
        end

        def keywords
          [o.tags.first.try(:name), 'ответ', 'вопрос', 'здоровье', 'лечение'].compact.join(', ')
        end

        private

        def gsubbed_title
          o.title.tr("\n", ' ')
        end
      end
    end
  end
end
