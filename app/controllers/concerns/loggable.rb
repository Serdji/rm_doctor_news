module Concerns::Loggable
  extend ActiveSupport::Concern

  def save_version(object, before_attributes, event = :update)
    version = {
      employee_id: current_employee.id,
      item_type: object.class,
      item_id: object.id,
      event: event,
      created_at: Time.zone.now,
      object: diff(object.attributes, before_attributes).to_json
    }
    Version.create version
  end

  def diff(object, before)
    diff = object.collect do |key, value|
      [key, (object[key] == before[key] ? nil : [before[key], value])]
    end.reject { |v| v.last.nil? }.to_h
  end

  def set_before_attributes
    @before_attributes = get_object.attributes.deep_dup
  end

  def log_version_after_save
    save_version(get_object, @before_attributes)
  end

  included do
    before_action :set_before_attributes, only: [:update, :destroy]
    after_action :log_version_after_save, only: [:update, :destroy], if: -> { get_object.valid? }
  end
end
