class CreateSubtasks < ActiveRecord::Migration[7.1]
  def change
    create_table :subtasks do |t|
      t.string :title
      t.string :description
      t.integer :order

      t.timestamps
    end
  end
end
