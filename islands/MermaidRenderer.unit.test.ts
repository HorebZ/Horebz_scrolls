import { compactMermaidConfig } from "./MermaidRenderer.tsx";

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

Deno.test("compact Mermaid configuration reduces text and flowchart spacing", () => {
  assert(
    compactMermaidConfig.fontSize === 13,
    "Mermaid text should use a 13px font size",
  );
  assert(
    compactMermaidConfig.flowchart.nodeSpacing === 28,
    "nodes on the same level should be 28px apart",
  );
  assert(
    compactMermaidConfig.flowchart.rankSpacing === 32,
    "levels should be 32px apart",
  );
  assert(
    compactMermaidConfig.flowchart.diagramPadding === 8,
    "the diagram should use an 8px outer margin",
  );
});
