class News::TitleSpliter
  include Enumerable

  def initialize(str)
    @str = str
  end

  def each(length = 32)
    str = @str.dup
    until str.empty?
      str.lstrip!
      chunk = str[/^.{1,#{length}}(?=\s|$)/]
      chunk ||= str
      str = str[chunk.size..-1]
      yield chunk
    end
  end
end
