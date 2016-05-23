class Event < ActiveRecord::Base
  def self.imp(file)
    CSV.foreach(file, headers: true) do |row|
    # IDが見つかれば、レコードを呼び出し、見つかれなければ、新しく作成

      @event = Event.new
      # CSVからデータを取得し、設定する
      @event.attributes = row.to_hash.slice(*updatable_attributes)
      @result = Event.find_by("title = ? AND start = ? AND end = ?" ,@event.title,@event.start,@event.end)
      if @result == nil then
      # 保存する
      @event.save
      end
    end
  end

  # 更新を許可するカラムを定義
  def self.updatable_attributes
    ["title", "start", "end","location", "url1", "url2", "url3", "url4", "url5", "remarks", "allDay"]
  end
end

