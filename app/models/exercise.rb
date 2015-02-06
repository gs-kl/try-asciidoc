class Exercise < ActiveRecord::Base
  validates :ordinality, :topic, :description, :answer, presence: true
end


# class Exercise
#   def self.all
#     json_objects = # read from JSON

#     json_objects.map { |obj| Exercise.from_json(obj) }
#   end

#   def self.find(id)
#     all.select { |exercise| exercise.id == id }
#   end

#   def initialize(id, topic, description, answer)

#   end

#   def from_json(json)
#     self.class.new()
#   end
# end
