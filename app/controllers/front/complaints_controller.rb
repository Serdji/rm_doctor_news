class Front::ComplaintsController < Front::ApplicationController
  before_action :authenticate_user!, only: :create

  def create
    @complaint = if current_user.is_fake?
                   create_by_fake_user
                 else
                   create_by_ordinary_user
                 end

    if @complaint.valid?(:front)
      save
    else
      render_validation_errors @complaint.errors.messages
    end
  end

  private

  def create_by_ordinary_user
    Qa::Complaint.new(complaint_params.to_h)
  end

  def create_by_fake_user
    cause_id = Qa::ComplaintCause.where(filter: { name: 'other' })&.first&.id
    additional = {
      cause_ids: [cause_id],
      body: I18n.t('label.complaint_body'),
      email: current_user&.emails&.first,
      comment: I18n.t('label.complaint_comment')
    }
    @complaint = Qa::Complaint.new(complaint_params.merge(additional).to_h)
  end

  def save
    if @complaint.save
      render json: { status: :ok }, status: :created
    else
      render_validation_errors @complaint.response_errors
    end
  end

  def complaint_params
    params.require(:complaint).permit(
      :complainable_id, :complainable_type,
      :body, :email, cause_ids: []
    ).merge(user_id: current_user.id)
  end
end
