class Qa::Question < Qa::Base
  PUBLIC_STATES = %w(fresh with_complaints without_complaints).freeze

  include Qa::Seoable
  include ::Seoable

  has_many :tags, class_name: 'Qa::Tag'

  has_many :answers, class_name: 'Qa::Answer'
  has_many :complaints, class_name: 'Qa::Complaint'

  belongs_to :user, class_name: 'Qa::User'

  # TODO: Scope Her break responsibilty chain
  scope :interesting, -> { where(filter: { is_interesting: true, state: PUBLIC_STATES }) }
  scope :published,   -> { where(filter: { state: PUBLIC_STATES }) }
  scope :hidden,      -> { where(filter: { state: 'hidden' }) }
  scope :with_tags,   -> { where(include: 'tags') }

  boolean_field :is_interesting

  validate do
    value = @attributes[:title].to_s

    unless value.gsub(/[^а-яА-Яa-zA-Z0-9]/, '').length > 3
      scope = 'qa.errors.models.question.attributes'
      errors.add('title', I18n.t('title.too_few_chars', scope: scope, count: 4))
    end
  end

  class << self
    def options_for_select(additional_id = nil)
      current = additional_id.present? ? [find(additional_id)] : []
      current = current.collect { |t| ["#{t.id} - #{t.title}", t.id] }

      (all.collect { |t| ["#{t.id} - #{t.title}", t.id] } + current).uniq
    end

    def states_for_select
      I18n.t('states.question').invert.to_a
    end
  end

  def hidden?
    state == 'hidden'
  end

  def published?
    !hidden?
  end

  def tag_ids
    @attributes[:tag_ids] ||= tags.map(&:id)
  end

  def tag_ids=(ids)
    @attributes[:tag_ids] = ids
  end

  def link_with_images(ids)
    return unless ids.present?

    Image.where(id: ids).update_all(
      imageable_type: 'Qa::Question', imageable_id: id, type: 'Images::Question'
    )
  end

  def redirect
    return unless id

    if instance_variables.include?(:@redirect)
      @redirect
    else
      @redirect = Redirect.find_by(entity_type: 'Qa::Question', entity_id: id)
    end
  end

  def build_redirect(attributes = {})
    attributes[:entity_type] = 'Qa::Question'
    attributes[:entity_id] = id
    @redirect = Redirect.new(attributes)
  end

  def redirect_path
    redirect.redirect_path if redirect
  end
end
