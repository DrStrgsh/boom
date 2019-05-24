class RemoveConfirmToken < ActiveRecord::Migration[5.2]
  def change
    remove_column :users, :confirm_token
  end
end
