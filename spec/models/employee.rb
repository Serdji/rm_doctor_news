require 'rails_helper'
require 'concerns/rolable_spec'

RSpec.describe Employee do
  it_behaves_like 'rolable'

  let(:employee) { create(:employee) }

  subject { employee }

  describe 'has valid associations' do
    it { is_expected.to belongs_to(:role) }
    it { is_expected.to have_many(:versions) }

    it { is_expected.to be_valid }
  end

end
