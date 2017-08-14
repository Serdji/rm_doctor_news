class TagImageUploader < ImageUploader
  include CarrierWave::Processors::Blur
  include CarrierWave::Processors::ThumbWithShadow

  version :wide_stripe do
    process blurize: { geometry: [615, 5], resize_to: 0.01 }
  end

  version :short_stripe do
    process blurize: { geometry: [300, 5], resize_to: 0.01 }
  end

  version :thumb_with_shadow do
    process with_shadow: {
      geometry: [160, 160], offset_x: 20, offset_y: 30, shadow_offset: 20, blur: [0, 6]
    }
  end

  thumb_version 17, 17
  thumb_version 26, 26
  thumb_version 30, 30
end
