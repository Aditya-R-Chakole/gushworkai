class User < ApplicationRecord
    has_secure_password

    validates_presence_of :email
    validates_uniqueness_of :email

    has_many(
        :tasks,
        class_name: 'Task',
        foreign_key: 'user_id',
        inverse_of: :user,
        dependent: :destroy
    )
end
