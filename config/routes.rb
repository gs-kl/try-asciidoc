Rails.application.routes.draw do
  root "exercises#index"
  get "/", to: "exercises#index"
  get "/asciidoctor", to: "asciidoctor#parse"
  resources :exercises, only: [:index, :show] do
    member do
      get :next
    end
  end

  get "/:id", to: "exercises#index"
end
