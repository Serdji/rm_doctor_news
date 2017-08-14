class Front::AnswersController < Front::ApplicationController
  before_action :authenticate_user!, only: [:create, :make_best]

  before_action :find_question, only: :create
  before_action :find_answer, only: :make_best

  def create
    state = current_user.is_fake? ? :without_complaints : :fresh
    attributes = { question_id: params[:question_id], state: state }

    @answer = Qa::Answer.new(attributes)
    save
  end

  def make_best
    question = Qa::Question.find(@answer.question_id, include: 'tags')
    @answer.make_best! if current_user.is_sentry && !question.has_best_answer?

    result = if current_user.is_sentry && !question.has_best_answer?
               @answer.make_best!
               path = Front::QuestionDecorator.decorate(question).path
               { success: true, url: path }
             else
               { success: false }
             end

    render json: result
  end

  private

  def safe_params
    params.require(:answer).permit(:body)
  end

  def save
    attributes = safe_params.merge(user_id: current_user.id)
    @answer.assign_attributes(attributes.to_h)

    if @answer.valid? && @answer.save
      @answer.link_with_images(params.dig(:answer, :image_ids))
      enqueue_search_jobs
      render json: @answer
    else
      render json: @answer.response_errors, status: :unprocessable_entity
    end
  end

  def find_question
    @question = Qa::Question.find(params[:question_id])
  end

  def find_answer
    @answer = Qa::Answer.find(params[:id])
  end

  def enqueue_search_jobs
    SearchIndexJob.perform(@question.id, type: 'questions', event: 'create')
    @question.tags.each { |tag| SearchIndexJob.perform(tag.id, type: 'tags', event: 'update') }
  end
end
