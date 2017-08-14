set :rvm_roles, []
set :rvm_map_bins, []

set :branch, ENV['BRANCH'] || 'master'

environment = fetch(:default_env, {}).merge({
  path: '/home/doctor/.gem/ruby/2.3.0/bin/:$PATH'
})
set :default_env, environment

set :bundle_flags, '--deployment'

server 'front-app01.preprod.doctor.rambler.tech', roles: %w(front)
server 'front-app02.preprod.doctor.rambler.tech', roles: %w(front)

server 'back01.preprod.doctor.rambler.tech',  roles: %w(backend db), primary: true
server 'back02.preprod.doctor.rambler.tech',  roles: %w(backend)
server 'queue01.preprod.doctor.rambler.tech', roles: %w(queue)
server 'queue02.preprod.doctor.rambler.tech', roles: %w(queue)

set :ssh_options, user: 'doctor'

set :webdav_endpoint, 'http://night.webdav.rambler.tech/doctor/doctor_preprod'
set :webdav_roles, [:front, :backend]

namespace :gem do
  task :upload_gemrc do
    on roles(:all) do
      gemrc = File.expand_path('../../../.gemrc.local', __FILE__)
      upload! gemrc, '/home/doctor/.gemrc'
    end
  end

  task :install do
    on roles(:all) do
      install_dir = '/home/doctor/.gem/ruby/2.3.0'

      arguments = []
      arguments << 'gem install'
      arguments << ENV['NAME']
      arguments << "-v #{ENV['VERSION']}" if ENV['VERSION']
      arguments << "-i #{install_dir}"

      capture(arguments.join(' '))
    end
  end
end
