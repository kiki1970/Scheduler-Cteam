class EventsController < ApplicationController
  before_action :set_event, only: [:show, :edit, :update, :destroy]
  # GET /events
  # GET /events.json
  def index
    @events = Event.all
  end

  # GET /events/1
  # GET /events/1.json
  def show
  end

  # GET /events/new
  def new
    @event = Event.new
  end

  # GET /events/1/edit
  def edit
  end

  #GET /events/search.json
  def search
    @result = Event.find_by("start > ? AND start < ? AND allDay = ? AND NOT id = ?" ,event_params[:start],event_params[:end],false,event_params[:title])
    if @result == nil then
      @result = Event.find_by("end > ? AND end < ? AND allDay = ? AND NOT id = ?" ,event_params[:start],event_params[:end],false,event_params[:title])
      if @result == nil then
        @result = Event.find_by("start < ? AND end > ? AND allDay = ? AND NOT id = ?" ,event_params[:start],event_params[:end],false,event_params[:title])
      end
    end
    respond_to do |format|
      format.json { render json: @result }
    end
  end

  # POST /events
  # POST /events.json
  def create
    @event = Event.new(event_params)

    respond_to do |format|
      if @event.save
        format.html { redirect_to @event, notice: 'Event was successfully created.' }
        format.json { render :show, status: :created, location: @event }
      else
        format.html { render :new }
        format.json { render json: @event.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /events/1
  # PATCH/PUT /events/1.json
  def update
    respond_to do |format|
      if @event.update(event_params)
        format.html { redirect_to @event, notice: 'Event was successfully updated.' }
        format.json { render :show, status: :ok, location: @event }
      else
        format.html { render :edit }
        format.json { render json: @event.errors, status: :unprocessable_entity }
      end
    end
  end

  # INPORT
  def import
    Event.imp(event_params[:title])
    respond_to do |format|
      format.json { render json: @event }
    end
  end

  # EXPORT

  def export
    header = ["title", "start", "end", "location", "url1", "url2", "url3", "url4", "url5", "remarks", "allDay"]
    output = CSV.generate("", :headers => header, :write_headers => true) do |csv|
      Event.all.each do |event|
        csv << [event.title, event.start, event.end, event.location, event.url1, event.url2, event.url3, event.url4, event.url5, event.remarks, event.allDay]
      end
    end
    filename="C:\\event_csv\\"+Time.now.strftime('%Y_%m_%d_%H_%M_%S')+".csv"
    file = File.new(filename, 'w')
    file.write(output)
    file.close
    respond_to do |format|
      format.html do
        @users = @users.page params[:page]
      end
      format.csv do
        send_data output, filename: "users-#{Time.now.to_date.to_s}.csv", type: :csv
      end
    end
  end

  # DELETE /events/1
  # DELETE /events/1.json
  def destroy
    @event.destroy
    respond_to do |format|
      format.html { redirect_to events_url, notice: 'Event was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_event
    @event = Event.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def event_params
    params.require(:event).permit(:title, :start, :end, :location, :url1, :url2, :url3, :url4, :url5, :remarks, :allDay)
  end
end
