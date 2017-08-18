class Front::NewsDecorator < Draper::Decorator
  include Iso8601Dates

  delegate_all

  decorates_association :interesting, with: Front::NewsDecorator

  def main_image_url
    image_url(:main)
  end

  def small_image_url
    image_url(:small)
  end

  def detail_image_url
    image_url(:detail)
  end

  def local_path
    slug = path.split('/').last[/(?<=\d-).+/]
    Education::Url.news_show_path(slug: slug, id: external_id)
  end

  def news_source_link(title = 'Рамблер/Доктор')
    pitem.url.present? ? h.link_to(title, pitem.url, target: '_blank') : title
  end

  def image_source_link?
    image && image.source_title.present?
  end

  def image_source_link
    if image.source_url.present?
      h.link_to image.source_title, image.source_url, target: '_blank'
    else
      image.source_title
    end
  end

  def seo_title(length = 120, omission: '')
    truncated_title = long_title.truncate(length, omission: omission)
    "#{truncated_title} — Рамблер/Доктор"
  end

  def title_truncated(length = 60)
    title.truncate(length)
  end

  def seo_description
    annotation
  end

  def safe_text
    # \n\n<b>...</b>\n\n                    => <h2>...</h2>
    # \n\n<strong>...</strong>\n\n          => <h2>...</h2>
    # \n\n<em><strong>...</strong></em>\n\n => <h2>...</h2>
    # \n\n<strong><em>...</em></strong>\n\n => <h2>...</h2>
    text_paragraphes = text.split(%r{\n\n|<br/><br/>}).map! do |par|
      par.gsub!(%r{<br[\s/]*>}, '')
      par.gsub!(%r{^\s*(<em>)?<(strong|b)>(.*)</(strong|b)>(</em>)?\s*$}, '\\1<h2>\\3</h2>\\5')
      "<p>#{par}</p>"
    end
    h.sanitize(text_paragraphes.join, tags: %w(p b strong i em h2 img iframe))
  end
end
