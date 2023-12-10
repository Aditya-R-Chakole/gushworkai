class AddSubtaskToTask < ActiveRecord::Migration[7.1]
  def change
    add_reference :subtasks, :task, foreign_key: true
  end
end
