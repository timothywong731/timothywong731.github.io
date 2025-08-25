# Guard for Jekyll/WEBrick servlet: avoid calling `key?` on nil headers
# This monkeypatch is intentionally defensive: it handles both a Hash
# of headers or a response-like object that responds to `header`.
# It appends a charset to text-like content types if missing.
module Jekyll
  module Commands
    class Serve
      class Servlet
        def conditionally_inject_charset(response_or_headers)
          # Normalize to a headers Hash when possible
          headers = if response_or_headers.respond_to?(:header)
                      response_or_headers.header
                    elsif response_or_headers.is_a?(Hash)
                      response_or_headers
                    else
                      nil
                    end

          # If headers are nil or not a Hash-like object, do nothing
          return unless headers && headers.respond_to?(:key?)

          # Find a content-type key in a few common forms
          content_type = headers['Content-Type'] || headers['content-type'] || headers[:'Content-Type']
          return unless content_type.is_a?(String)

          # Only inject charset for textual types and when charset not present
          if content_type =~ /(?:text|json|xml|javascript)/i && content_type !~ /charset=/i
            headers['Content-Type'] = "#{content_type}; charset=utf-8"
          end
        end
      end
    end
  end
end
