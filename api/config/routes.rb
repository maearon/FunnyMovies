Rails.application.routes.draw do
  resources :videos

  namespace :api, format: "json" do
    root   'static_pages#home'
    resources :sessions,          only: [:index]
    delete '/logout',             to: 'sessions#destroy'
    post   '/login',              to: 'sessions#create'
    resources :users do
      member do
        get :following, :followers
      end
    end
    resources :account_activations, only: [:update]
    resources :password_resets,     only: [:create, :update]
    resources :microposts,          only: [:create, :destroy]
    resources :relationships,       only: [:create, :destroy]
  end

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
end
