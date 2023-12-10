class TasksController < ApplicationController 
    def read 
        @user = User.where(email: params[:user]).first
        @all_tasks = Task.where(user_id: @user.id, status: true)
        
        @tasks = []
        for i in @all_tasks do
            @tasks.append({
                task: i,
                subtasks: Subtask.where(task_id: i[:id])
            })
        end

        render json: @tasks
    end
    
    def create
        user = User.where(email: params[:task][:user]).first

        task = user.tasks.create(
            title: params[:task][:title], 
            description: params[:task][:description], 
            body: params[:task][:body], 
            status: 1
        )

        for subtask in params[:subtasks] do
            task.subtasks.create(
                title: subtask[:title], 
                description: subtask[:description], 
            )
        end
        
        render json: { status: 500 }
    end

    def delete 
        @task = Task.where(user_id: @user.id).first
        @task[:status] = false
        @task.update

        render json: {status: 200}
    end
end