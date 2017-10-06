module NbspReplacer
  NBSP = '&nbsp;'.freeze

  private

  def replace_spaces_with_nbsp(string, length = 3)
    current_word = ''
    result = []

    string.each_char do |char|
      if char != ' '
        current_word << char
      else
        result << current_word
        result << (current_word.length <= length && current_word != '' ? NBSP : ' ')

        current_word = ''
      end
    end

    result << current_word unless current_word.empty?
    result.join
  end
end
