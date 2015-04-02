# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

require 'json'

Exercise.all.each{|x| x.delete}

file = File.read("config/initializers/exercises_seeds.json")
exercises = JSON.parse(file)

exercises.each do |ordinality, properties|
  Exercise.create(ordinality: ordinality.to_i, topic: properties["topic"], description: properties["description"], answer: properties["answer"])
end
