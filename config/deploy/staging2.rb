set :rvm_roles, []
set :rvm_map_bins, []

environment = fetch(:default_env, {}).merge({
  path: '/home/doctor/.gem/ruby/2.3.0/bin/:$PATH'
})
set :default_env, environment

set :bundle_flags, '--deployment'

server 'front-app02.stage.doctor.rambler.tech', roles: %w(front)
server 'back02.stage.doctor.rambler.tech',      roles: %w(backend db), primary: true
server 'queue02.stage.doctor.rambler.tech',     roles: %w(queue)

set :ssh_options, user: 'doctor'

set :webdav_endpoint, 'http://night.webdav.rambler.tech/doctor/doctor_stage2'
set :webdav_verbose, true
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
