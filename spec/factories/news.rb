FactoryGirl.define do
  factory :news do
    annotation  { Faker::Lorem.paragraph  }
    title       { Faker::Lorem.paragraph  }
    long_title  { Faker::Lorem.paragraph  }
    link        { Faker::Lorem.paragraph  }
    text        { Faker::Lorem.paragraph  }
    external_id { Faker::Number.number(6) }
  end
end
