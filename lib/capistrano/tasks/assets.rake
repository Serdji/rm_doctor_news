namespace :deploy do
  namespace :assets do
    task :archive do
      run_locally do
        `tar -zcf public/assets.tar.gz public/assets`
      end
    end

    task :upload do
      on roles(:all) do
        upload! 'public/assets.tar.gz', "#{release_path}/public"
        %w(manifest.front.json manifest.mobile.json manifest.ramblertopline.json).each do |file|
          upload! "config/#{file}", "#{release_path}/config/#{file}"
        end
        execute "cd #{shared_path} && tar -xf #{release_path}/public/assets.tar.gz"
      end
      run_locally do
        `unlink public/assets.tar.gz`
      end
    end
  end
end
