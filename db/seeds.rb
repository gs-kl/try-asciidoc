# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Exercise.create(ordinality: 1, topic: "Basic paragraphs", description: "Creating paragraphs", answer: "Making a new paragraph in AsciiDoc is easy.\n\nJust separate it from the previous paragraph with at least one blank line.")

Exercise.create(ordinality: 2, topic: "Superscript", description: "Superscript text", answer: "^super^script")




