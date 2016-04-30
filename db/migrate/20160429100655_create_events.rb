class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.string :title
      t.datetime :start
      t.datetime :end
      t.string :location
      t.string :remarks
      t.boolean :allDay

      t.timestamps null: false
    end
  end
end
