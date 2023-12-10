class Task < ApplicationRecord
    belongs_to(
        :user,
        class_name: 'User',
        foreign_key: 'user_id',
        inverse_of: :tasks
    )

    has_many(
        :subtasks,
        class_name: 'Subtask',
        foreign_key: 'task_id',
        inverse_of: :task,
        dependent: :destroy
    )
end
