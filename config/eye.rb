Eye.load('./eye/*.rb')

ROOT_PATH      = '/var/www/doctor.rambler.ru/current'.freeze
BUNDLE_GEMFILE = "#{ROOT_PATH}/Gemfile".freeze
LOG_PATH       = "#{ROOT_PATH}/log".freeze
PID_PATH       = "#{ROOT_PATH}/tmp/pids".freeze

Eye.config { logger "#{ROOT_PATH}/log/eye.log" }

Eye.application 'doctor.rambler.ru' do
  env 'BUNDLE_GEMFILE' => BUNDLE_GEMFILE

  # RAILS_ENV from .env.local
  working_dir ROOT_PATH
  load_env '.env.local'
  RAILS_ENV = environment['RAILS_ENV']

  if environment.key? 'RESQUE'
    group 'resque' do
      resque_process(:search_index, 1..2)
      resque_process(:news_processing, 3..4)
    end
  else
    group 'web' do
      unicorn_process(self, 'unicorn', 'config/unicorn.rb')
    end
  end
end
