class StaticController < ApplicationController

    def home
        render json: { status: "It's working" }
    end

    def index
        
    end

end