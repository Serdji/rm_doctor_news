require 'rails_helper'

RSpec.describe Front::NewsDecorator do
  let(:news) { Front::NewsDecorator.new(build(:news)) }

  describe '#safe_text' do
    it 'return h2-title instead of b-tag' do
      news.text = "text\n\n<b>title</b>\n\ntext"
      expect(news.safe_text).to match('<p>text</p><p></p><h2>title</h2><p>text</p>')
    end

    it 'return h2-title instead of strong-tag' do
      news.text = "text\n\n<strong>title</strong>\n\ntext"
      expect(news.safe_text).to match('<p>text</p><p></p><h2>title</h2><p>text</p>')
    end

    it 'return h2-title instead of b/em tags combination' do
      news.text = "text\n\n<b><em>title</em></b>\n\ntext"
      expect(news.safe_text).to match('<p>text</p><p></p><h2><em>title</em></h2><p>text</p>')
    end

    it 'return h2-title instead of b/em tags combination' do
      news.text = "text\n\n<em><b>title</b></em>\n\ntext"
      expect(news.safe_text).to match('<p>text</p><p><em><h2>title</h2></em></p><p>text</p>')
    end

    it 'return h2-title instead of strong-tag' do
      news.text = "text\n\n<strong><em>title</em></strong>\n\ntext"
      expect(news.safe_text).to match('<p>text</p><p></p><h2><em>title</em></h2><p>text</p>')
    end

    it 'return h2-title instead of strong-tag' do
      news.text = "text\n\n<em><strong>title</strong></em>\n\ntext"
      expect(news.safe_text).to match('<p>text</p><p><em><h2>title</h2></em></p><p>text</p>')
    end
  end
end
