import { render } from "@deno/gfm";

const MERMAID_BLOCK = /^```mermaid[^\S\r\n]*\r?\n([\s\S]*?)^```[^\S\r\n]*$/gm;
const MERMAID_PLACEHOLDER_PREFIX = "MERMAID_DIAGRAM_PLACEHOLDER_";

export interface RenderedMarkdown {
  html: string;
  hasMermaid: boolean;
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    switch (character) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      case "'":
        return "&#39;";
      default:
        return character;
    }
  });
}

function placeholder(index: number): string {
  return `${MERMAID_PLACEHOLDER_PREFIX}${index}__`;
}

export function renderMarkdown(markdown: string): RenderedMarkdown {
  const diagrams: string[] = [];
  const markdownWithPlaceholders = markdown.replace(
    MERMAID_BLOCK,
    (_block, source: string) => {
      diagrams.push(source.trimEnd());
      return placeholder(diagrams.length - 1);
    },
  );

  let html = render(markdownWithPlaceholders);

  for (const [index, source] of diagrams.entries()) {
    const escapedSource = escapeHtml(source);
    const diagram =
      `<pre class="mermaid" data-mermaid-source="${escapedSource}">${escapedSource}</pre>`;

    html = html.replace(`<p>${placeholder(index)}</p>`, diagram);
  }

  return { html, hasMermaid: diagrams.length > 0 };
}
