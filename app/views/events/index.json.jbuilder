json.array!(@events) do |event|
  json.extract! event, :id, :title, :start, :end, :location, :url1, :url2, :url3, :url4, :url5, :remarks, :allDay
  json.url event_url(event, format: :json)
end
