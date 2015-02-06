require 'json'

Exercise.all.each{|x| x.delete}

file = File.read("config/initializers/exercises_seeds.json")
exercises = JSON.parse(file)

exercises.each do |ordinality, properties|
  Exercise.create(ordinality: ordinality.to_i, topic: properties["topic"], description: properties["description"], answer: properties["answer"])
end
