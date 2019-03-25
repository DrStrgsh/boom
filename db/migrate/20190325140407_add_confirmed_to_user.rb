class AddConfirmedToUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :confirmed, :boolean, default: false
    add_column :users, :confirmed_at, :datetime
    add_column :users, :confirmed_send_at, :datetime
  end
end
