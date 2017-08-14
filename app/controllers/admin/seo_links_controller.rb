class Admin::SeoLinksController < Admin::ApplicationController
  include Concerns::Loggable

  decorates_assigned :seo_links, :seo_link, with: Admin::SeoLinkDecorator

  before_action :find_seo_link, only: [:update, :destroy]

  add_breadcrumb :seo_links, path: 'admin_seo_links_path'

  def index
    @seo_link = SeoLink.new
    build_ransack
  end

  def update
    save(:update)
  end

  def collection
    params['seo_links'].each do |id, seo_link|
      item = SeoLink.find(id)
      item.assign_attributes(seo_link.permit(:title, :url))
      item.save
    end
    redirect_to admin_seo_links_path
  end

  def create
    @seo_link = SeoLink.new
    save(:create)
  end

  def destroy
    save_version(@seo_link, @seo_link.attributes, :destroy)
    @seo_link.destroy!
    redirect_to admin_seo_links_path
  end

  private

  def seo_link_params
    params.require(:seo_link).permit(:id, :title, :url)
  end

  def save(_event = :create)
    @seo_link.assign_attributes(seo_link_params)

    if @seo_link.save
      redirect_to admin_seo_links_path
    else
      build_ransack
      render :index
    end
  end

  def get_object
    @seo_link || find_seo_link
  end

  def find_seo_link
    @seo_link ||= SeoLink.find(params[:id])
  end

  def build_ransack
    @q = SeoLink.ransack(params[:q])
    @seo_links = @q.result.order(id: :desc)
  end
end
