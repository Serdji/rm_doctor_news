namespace 'db:seed' do
  desc 'Load news seed'
  task :news do
    puts 'Loading news'
    Import::News::Topics.store
  end
end
