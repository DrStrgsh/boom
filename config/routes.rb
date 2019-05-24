Rails.application.routes.draw do
  namespace :api do
    resources :users do
      member do
        get :following, :followers
      end
    end
    resources :posts do
      resources :comments, only: %i[index create destroy]
      member do
        get 'islike' => 'likes#show'
        put 'like' => 'likes#create'
        put 'unlike' => 'likes#destroy'
        post 'repost' => 'reposts#create'
      end
    end
    resources :confirmations, only: %i[edit]
    resources :relationships, only: %i[show create destroy]
    resources :reposts, only: %i[index show update destroy]

    get 'feeds' => 'feeds#index'
    get 'feed_reposts' => 'feed_reposts#index'

    post 'login' => 'sessions#create'
    post 'forgot/password' => 'reset_password#create'

    put 'reset/password' => 'reset_password#update'

    delete 'signout' => 'sessions#destroy'
  end
end
