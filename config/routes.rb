Rails.application.routes.draw do
  root "exercises#index"
  get "/", to: "exercises#index"
  get "/next-exercise", to: "exercises#next_exercise"
  get "/asciidoctor", to: "asciidoctor#parse"
  get "/:id", to: "exercises#index"
end
