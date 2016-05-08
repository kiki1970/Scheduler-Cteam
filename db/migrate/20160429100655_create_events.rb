class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.string :title
      t.datetime :start
      t.datetime :end
      t.string :location1
      t.string :location2
      t.string :location3
      t.string :location4
      t.string :location5
      t.string :remarks
      t.boolean :allDay

      t.timestamps null: false
    end
  end
end
