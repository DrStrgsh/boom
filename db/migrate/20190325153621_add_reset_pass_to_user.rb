class AddResetPassToUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :reset_pass, :string
    add_column :users, :reset_pass_send_at, :datetime
  end
end
