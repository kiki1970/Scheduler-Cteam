class Event < ActiveRecord::Base

  def self.imp(file)
    CSV.foreach(file, headers: true) do |row|
      # IDが見つかれば、レコードを呼び出し、見つかれなければ、新しく作成
      @event = find_by(id: row["id"]) || new
      # CSVからデータを取得し、設定する
      @event.attributes = row.to_hash.slice(*updatable_attributes)
      # 保存する
      @event.save
    end
  end

  # 更新を許可するカラムを定義
  def self.updatable_attributes
    ["title", "start", "end","location", "url1", "url2", "url3", "url4", "url5", "remarks", "allDay"]
  end
end



