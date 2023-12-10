class Subtask < ApplicationRecord
    belongs_to(
        :task,
        class_name: 'Task',
        foreign_key: 'task_id',
        inverse_of: :subtasks
    )
end
