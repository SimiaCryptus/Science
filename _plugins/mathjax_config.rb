Jekyll::Hooks.register [:pages, :documents], :post_render do |doc|
  # Only add MathJax if the page has math enabled or contains math expressions
  has_math = doc.data['mathjax'] == true ||
             doc.output =~ /\$[^\$]+\$/ ||
             doc.output =~ /\$\$[^\$]+\$\$/ ||
             doc.output =~ /\\[(\[]/ ||
             doc.output =~ /\\begin\{(equation|align|gather|multline)\}/

  if has_math && doc.output =~ /<head>/
    mathjax_script = <<~SCRIPT
      <script>
        MathJax = {
          tex: {
            inlineMath: [['$', '$'], ['\\(', '\\)']],
            displayMath: [['$$', '$$'], ['\\[', '\\]']],
            processEscapes: true,
            processEnvironments: true,
            tags: 'ams',
            packages: {'[+]': ['ams', 'newcommand', 'configmacros']}
          },
          options: {
            skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code'],
            ignoreHtmlClass: 'tex2jax_ignore',
            processHtmlClass: 'tex2jax_process'
          },
          startup: {
            pageReady: () => {
              return MathJax.startup.defaultPageReady().then(() => {
                console.log('MathJax initial typesetting complete');
              });
            }
          },
          svg: {
            fontCache: 'global'
          }
        };
      </script>
      <script type="text/javascript" id="MathJax-script" async
        src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js">
      </script>
    SCRIPT
    doc.output = doc.output.sub('<head>', "<head>\n#{mathjax_script}")
  end
end