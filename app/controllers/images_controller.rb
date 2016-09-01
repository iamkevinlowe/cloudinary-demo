class ImagesController < ApplicationController
  def index
    
  end

  def create
    if params[:image_id].present?
      @message = "We got something: #{params[:image_id]}"
    else
      @message = "Nope"
    end

    render :index
  end
end