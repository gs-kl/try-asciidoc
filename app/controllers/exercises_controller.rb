class ExercisesController < ApplicationController
  respond_to :html, only: [:index]
  respond_to :json, only: [:show, :next]
  def index
    @number_of_exercises = Exercise.all.length
    if params[:id]
      @exercise = Exercise.find_by(ordinality: params[:id])
    else
      @exercise = Exercise.find_by(ordinality: 1)
    end
  end

  def next
    ordinality = params[:id]
    next_ordinality = ordinality.to_i + 1
    exercise = Exercise.find_by(ordinality: next_ordinality)
    # exercise.answer = Asciidoctor.load(exercise.answer, header_footer: false, safe: "safe").convert
    respond_with exercise
  end


  def show
    ordinality = params[:id]
    exercise = Exercise.find_by(ordinality: ordinality)
    respond_with exercise
  end
end
