import { renderMarkdown } from "./markdown.ts";

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

Deno.test("renderMarkdown preserves Mermaid diagrams for client rendering", () => {
  const result = renderMarkdown(`## Diagramme

\`\`\`mermaid
flowchart TB
  A[Début] --> B[Fin]
\`\`\``);

  assert(result.hasMermaid, "the Mermaid diagram should be detected");
  assert(
    result.html.includes('class="mermaid"'),
    "the rendered HTML should identify the Mermaid diagram",
  );
  assert(
    result.html.includes(
      'data-mermaid-source="flowchart TB\n  A[Début] --&gt; B[Fin]"',
    ),
    "the original Mermaid source should be available to the client renderer",
  );
});

Deno.test("renderMarkdown escapes Mermaid source before inserting it into HTML", () => {
  const result = renderMarkdown(`\`\`\`mermaid
flowchart TB
  A["<script>alert('xss')</script>"] --> B
\`\`\``);

  assert(
    !result.html.includes("<script>"),
    "the Mermaid source must not create executable HTML",
  );
  assert(
    result.html.includes("&lt;script&gt;"),
    "the Mermaid source should be HTML-escaped",
  );
});

Deno.test("renderMarkdown leaves regular Markdown unchanged", () => {
  const result = renderMarkdown("## Sans diagramme");

  assert(
    !result.hasMermaid,
    "regular Markdown should not be marked as Mermaid",
  );
  assert(
    result.html.includes("<h2"),
    "regular Markdown should still be rendered by @deno/gfm",
  );
});
