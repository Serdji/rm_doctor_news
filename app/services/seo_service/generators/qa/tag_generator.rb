class SeoService
  module Generators
    module Qa
      class TagGenerator < BaseGenerator
        def title
          "#{o.name} — ответы по теме, советы врачей и народные методы"
        end

        def description
          "Задай вопрос по теме #{o.name}. Или читай ответы врачей и отзывы пользователей на Рамблер/доктор"
        end

        def keywords
          "#{o.name}, здоровье, болезни, лекарства, лечение, доктор, врач"
        end
      end
    end
  end
end
