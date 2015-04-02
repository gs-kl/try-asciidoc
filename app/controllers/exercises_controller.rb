class ExercisesController < ApplicationController
  def index
    @number_of_exercises = Exercise.all.length
    if params[:id]
      @exercise = Exercise.find_by(ordinality: params[:id])
    else
      @exercise = Exercise.find_by(ordinality: 1)
    end
  end

  def next_exercise
    ordinality = params[:input]
    next_ordinality = ordinality.to_i + 1
    exercise = Exercise.find_by(ordinality: next_ordinality)
    # exercise.answer = Asciidoctor.load(exercise.answer, header_footer: false, safe: "safe").convert
    render json: exercise
  end
end
