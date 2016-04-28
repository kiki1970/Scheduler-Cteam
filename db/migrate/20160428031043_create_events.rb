class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.string :title
      t.datetime :start
      t.datetime :end
      t.string :location_url
      t.boolean :allDay

      t.timestamps null: false
    end
  end
end
