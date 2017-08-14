class SessionFactory
  class << self
    def session
      [store, params]
    end

    def store
      development? ? :cookie_store : :redis_session_store
    end

    def params
      {
        key: "_rambler_doctor_session_#{Rails.env}",
        expire_after: 2_592_000
      }.merge additional_params
    end

    private

    def development?
      %w(development test).include? Rails.env
    end

    def additional_params
      if development?
        {}
      else
        {
          serializer: :json,
          redis: RedisFactory.get_config_for(:cache).merge(
            db:           2,
            expire_after: 2_592_000,
            key_prefix:   'doctor.rambler.ru:sessions:'
          ),
          domain: '.doctor.rambler.ru'
        }
      end
    end
  end
end
