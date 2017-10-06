class RamblerIdService
  attr_reader :rsid

  def initialize(rsid)
    @rsid = rsid
  end

  def profile
    @profile ||= RamblerID::Utility.get_full_profile(@rsid)
  end

  def profile_hash
    @profile_hash ||= begin
      return unless profile
      data = profile.to_h
      data[:emails] = data[:confirmed_emails]
      data.except(:confirmed_emails, :unconfirmed_emails)
    end
  end

  def authenticated?
    profile.present?
  end

  def current_user
    return unless authenticated?
    @current_user ||= (find_user || create_user)
  end

  private

  def find_user
    user = Qa::User.where(filter: { external_id: profile.chain_ids }).first
    synchronize_user_info!(user) if user
    user
  end

  def create_user
    attributes = {
      external_id: profile.default_id, external_id_type: 'rsid'
    }.merge(profile_hash)

    Qa::User.create(attributes)
  end

  def synchronize_user_info!(user)
    user.send(:clear_changes_information)
    user.assign_attributes(profile_hash)
    user.save if user.changed?
  end
end
