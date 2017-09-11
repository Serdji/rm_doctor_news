require 'rails_helper'

RSpec.describe NbspReplacer do
  let(:replacer) do
    replacer = described_class
    klass = Class.new { include replacer }
    klass.new
  end

  def is_expected(string)
    result = replacer.send(:replace_spaces_with_nbsp, string)
    expect(result)
  end

  it { is_expected("f fo bar ").to eq "f&nbsp;fo&nbsp;bar&nbsp;" }
  it { is_expected("   fooo  bar").to eq "   fooo  bar" }
  it { is_expected("й   фыв").to eq "й&nbsp;  фыв" }
end
