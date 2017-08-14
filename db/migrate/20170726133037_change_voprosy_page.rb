class ChangeVoprosyPage < ActiveRecord::Migration[5.1]
  def change
    m = Metapage.find_by(label: 'Ответы')
    m&.update(label: 'Вопросы')
  end
end
