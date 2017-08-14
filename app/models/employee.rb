class Employee < ActiveRecord::Base
  devise :database_authenticatable, :rememberable, :validatable
  validates :first_name, :last_name, :role_id, presence: true

  belongs_to :role

  def has_role?(role_slug)
    role.name == role_slug.to_s
  end
end
