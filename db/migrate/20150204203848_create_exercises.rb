class CreateExercises < ActiveRecord::Migration
  def change
    create_table :exercises do |t|
      t.integer :ordinality
      t.string :topic
      t.text :description
      t.text :answer
      
      t.timestamps
    end
  end
end
