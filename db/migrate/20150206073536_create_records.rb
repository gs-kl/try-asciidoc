class CreateRecords < ActiveRecord::Migration
  def change
    create_table :records do |t|
      t.integer :user_id
      t.integer :exercise_ordinality
      t.boolean :completed
    end
  end
end
