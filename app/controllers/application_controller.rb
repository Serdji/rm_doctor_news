class ApplicationController < ActionController::Base
  # TODO: move this to AuthController
  def authenticity_token
    render json: { token: form_authenticity_token }
  end

  private

  def application_facade
    @application_facade ||= ApplicationFacade.new(self)
  end

  helper_method :application_facade

  def menu_service
    @menu_service ||= MenuService.new(self)
  end

  helper_method :menu_service

  def ad_service
    @ad_service ||= AdService.new
  end

  helper_method :ad_service

  def not_found
    raise ActionController::RoutingError, "Path not found: #{request.path}"
  end
end
