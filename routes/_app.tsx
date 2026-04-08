import { define } from "../utils.ts";
import { themeClass } from "../utils/theme.model.ts";

export default define.page(function App({ Component, state }) {
  return (
    <html lang="fr" class={themeClass(state.theme)}>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/assets/favicon.jpg" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Horeb'z Scrolls RSS"
          href="/rss.xml"
        />
        <title>Horeb'z Scrolls</title>
        <meta name="description" content="Blog d'un jeune arpenteur du code" />
        <script dangerouslySetInnerHTML={{ __html: `(function() {
            function applyTheme() {
              var m = document.cookie.match(/theme=(dark|light)/);
              if (m && m[1] === 'dark') {
                document.documentElement.classList.add('dark');
              } else {
                document.documentElement.classList.remove('dark');
              }
            }
            applyTheme();
            window.addEventListener('pageshow', function(e) {
              applyTheme();
            });
          })();` }} />
      </head>

      <body class="bg-background text-text-primary transition-colors duration-300">
        <Component />
      </body>
    </html>
  );
});
