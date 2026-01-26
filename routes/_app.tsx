import { define } from "../utils.ts";

export default define.page(function App({ Component }) {
  return (
    <html lang="fr">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/assets/favicon.jpg" />
        <title>Horeb'z Scrolls</title>
      </head>
      <body>
        <Component />
      </body>
    </html>
  );
});
