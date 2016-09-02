class ImagesController < ApplicationController
  def index
    
  end

  def create
    if params[:image_id].present?
      preloaded = Cloudinary::PreloadedFile.new(params[:image_id])
      raise "Invalid upload signature" if !preloaded.valid?
      @image = Image.new(preloaded.identifier)
    else
      @message = "Nope"
    end

    respond_to do |format|
      format.html { render :index }
      format.json { render json: { image: @image, message: @message } }
    end
  end
end