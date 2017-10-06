namespace :deploy do
  namespace :npm do
    task :install do
      run_locally do
        `npm run clean`
        `npm install`
        `npm run build`
      end
    end
  end
end
