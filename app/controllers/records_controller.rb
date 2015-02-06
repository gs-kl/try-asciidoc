class RecordsController < ApplicationController
  def create
    record = Record.new(user_id: current_user.id, exercise_ordinality: params[:ordinality].to_i, completed: true)
    100.times {puts record}
    if record.save
      head 200
    else
      head 500
    end
  end
end
