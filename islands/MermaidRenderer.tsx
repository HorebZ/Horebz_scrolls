import { useEffect } from "preact/hooks";

let nextDiagramId = 0;

export const compactMermaidConfig = {
  fontSize: 13,
  flowchart: {
    nodeSpacing: 28,
    rankSpacing: 32,
    diagramPadding: 8,
  },
};

function mermaidTheme(): "dark" | "default" {
  const { classList } = document.documentElement;
  return classList.contains("dark") || classList.contains("mordor")
    ? "dark"
    : "default";
}

export default function MermaidRenderer() {
  useEffect(() => {
    let disposed = false;
    let renderVersion = 0;

    const renderDiagrams = async () => {
      const version = ++renderVersion;
      const diagrams = [
        ...document.querySelectorAll<HTMLElement>(
          "pre.mermaid[data-mermaid-source]",
        ),
      ];

      if (diagrams.length === 0) {
        return;
      }

      const { default: mermaid } = await import(
        "mermaid/dist/mermaid.esm.min.mjs"
      );

      if (disposed || version !== renderVersion) {
        return;
      }

      mermaid.initialize({
        ...compactMermaidConfig,
        securityLevel: "strict",
        startOnLoad: false,
        theme: mermaidTheme(),
      });

      for (const diagram of diagrams) {
        const source = diagram.dataset.mermaidSource;

        if (!source || disposed || version !== renderVersion) {
          return;
        }

        try {
          const { svg, bindFunctions } = await mermaid.render(
            `mermaid-${nextDiagramId++}`,
            source,
          );

          if (disposed || version !== renderVersion) {
            return;
          }

          diagram.innerHTML = svg;
          bindFunctions?.(diagram);
        } catch (error) {
          diagram.textContent = source;
          console.error("Unable to render Mermaid diagram:", error);
        }
      }
    };

    void renderDiagrams();

    const observer = new MutationObserver(() => {
      void renderDiagrams();
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      disposed = true;
      observer.disconnect();
    };
  }, []);

  return <span aria-hidden="true" class="hidden" />;
}
