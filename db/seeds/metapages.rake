namespace 'db:seed' do
  desc 'Load metapages seed'
  task :metapages do
    puts 'Loading metapages'
    Metapage.destroy_all
    MetapagesType.destroy_all
    types = [
      { name: 'Главная', url: 'http://doctor.rambler.ru/' }
    ]

    MetapagesType.create types

    metapages = MetapagesType.all.map do |t|
      {
        label: t&.name,
        title: t&.name,
        description: t&.name,
        metapages_type_id: t&.id,
        seo_attributes: {}
      }
    end

    Metapage.create metapages

    metapage_type = MetapagesType.create(
      name: 'Вопросы и ответы', url: '/questions_and_tags'
    )

    %w(Вопросы Темы).each do |name|
      metapage_type.metapages.create(label: name)
    end
  end
end
