import { define } from "../utils.ts";

export default define.page(function App({ Component, state }) {
  return (
    <html lang="fr" class={state.theme === "dark" ? "dark" : ""}>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/assets/favicon.jpg" />
        <title>Horeb'z Scrolls</title>
        <meta name="description" content="Blog d'un jeune arpenteur du code" />
      </head>

      <body class="bg-background text-text-primary transition-colors duration-300">
        <Component />
      </body>
    </html>
  );
});
