json.array!(@events) do |event|
  json.extract! event, :id, :title, :start, :end, :location1, :location2, :location3, :location4, :location5, :remarks, :allDay
  json.url event_url(event, format: :json)
end
