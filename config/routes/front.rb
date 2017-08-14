Rails.application.routes.draw do
  constraints Routing::Front do
    scope module: :front, trailing_slash: true do
      root to: 'home#index', page: 1

      controller :search do
        get :resultat, action: :serp, as: :search_serp
        get 'search/suggest', action: :suggest, as: :search_suggest
      end

      get 'toggle', to: 'home#mobile_toggle'
      get 'voprosy', to: 'questions#index'

      resources :questions, only: :create do
        resources :answers, only: :create, shallow: true do
          member do
            post 'make_best'
          end
        end
      end

      controller :news do
        get 'news-:slug-:id.:format', action: :show, as: :news_show, defaults: { format: 'htm' }

        scope constraints: { format: 'json' } do
          get 'news/load_more.json', action: :load_more, as: :news_load_more
          get 'news/from_same_source.json', action: :from_same_source, as: :from_same_source
        end
      end

      get 'tags/search/:search', to: 'tags#search', as: :search
      get 'tags/options'

      post :profile, to: 'application#profile'

      get 'temy', to: 'tags#index', page: 1
      get 'temy-page-1', to: redirect('/temy', status: 301)
      get 'temy-page-:page', to: 'tags#index'

      get 'page-1', to: redirect('/', status: 301)
      get 'page-:page', to: 'home#index'

      resources :complaints, only: :create

      controller :tags do
        get '/temy-:slug-page-1', to: redirect('/temy-%{slug}', status: 301)
        get '/temy-:slug-page-:page', action: 'show'
        get '/temy-:slug', action: 'show', as: :tag, page: 1
      end

      controller :questions do
        get '/temy-:tag_slug/:slug-:id.:format',
            action: 'show',
            as: :question,
            defaults: { format: 'htm' }
      end
    end
  end
end
