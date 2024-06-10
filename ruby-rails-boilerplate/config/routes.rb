Rails.application.routes.draw do
# scope "/:locale" do
scope "(:locale)", locale: /#{I18n.available_locales.join('|')}/ do
  get '/:locale' => 'static_pages#home'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get 'password_resets/new'
  get 'password_resets/edit'
  get 'confirmations/new'
  root 'static_pages#detect_locale'
  get    '/help',    to: 'static_pages#help'
  get    '/about',   to: 'static_pages#about'
  get    '/contact', to: 'static_pages#contact'
  get    '/signup',  to: 'users#new'
  get    '/login',   to: 'sessions#new'
  post   '/login',   to: 'sessions#create'
  delete '/logout',  to: 'sessions#destroy'
  get    '/my-account',    to: 'users#show'                # tag 1
  get    '/my-account/order-history' ,    to: 'users#edit' # tag 2
  get    '/my-account/profile' ,    to: 'orders#index'     # tag 3
  # resources :users, except: [:edit] do
  # mount LetterOpenerWeb::Engine, at: "/letter_opener" if Rails.env.development?
  resources :users do
    member do
      get :following, :followers
    end
  end
  resources :account_activations, only: [:edit]
  resources :password_resets,     only: [:new, :create, :edit, :update]
  resources :confirmations,     only: [:new, :create]
  resources :microposts,          only: [:create, :destroy]
  resources :relationships,       only: [:create, :destroy]
  resources :rooms do
    resources :messages
  end
  get '/microposts', to: 'microposts#home'
  namespace :api, format: "json" do
    namespace :v1 do
      get "users", to: "users#index"
      get "products", to: "products#index"
      get "wish", to: "wish#index"
      get "cart", to: "cart#index"
    end
  end
  resources :products, only: [:index, :show] do
    resources :reviews
  end
  resources :cart_items, only: [:create, :update, :destroy]
  resources :guest_cart_items, only: [:create, :update, :destroy]
  get 'cart', to: 'cart#index'
  resources :wish_items, only: [:create, :destroy]
  resources :guest_wish_items, only: [:create, :destroy]
  get 'wish', to: 'wish#index'
  resources :orders
  get 'checkout1', to: 'orders#checkout1'
  get 'checkout2', to: 'orders#checkout2'
  get 'checkout3', to: 'orders#checkout3'
  get 'checkout4', to: 'orders#checkout4'
  get 'checkout5', to: 'orders#checkout5'
  get 'addresses', to: 'addresses#index'

  namespace :admin do
    root 'static_pages#home'
    resources :users
    resources :products
    resources :orders
  end

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
end
end
