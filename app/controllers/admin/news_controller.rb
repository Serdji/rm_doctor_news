class Admin::NewsController < Admin::ApplicationController
  def run_import
    Import::News::Topics.store

    flash[:success] = I18n.t('flashes.pull_news')
    redirect_back(fallback_location: admin_root_url)
  end
end
