import { effect, useSignal } from "@preact/signals";

interface UpvoteButtonProps {
  slug: string;
  initialCount: number;
  initiallyUpvoted: boolean;
}

export default function UpvoteButton(
  { slug, initialCount, initiallyUpvoted }: UpvoteButtonProps,
) {
  const count = useSignal(initialCount);
  const hasUpvoted = useSignal(initiallyUpvoted);
  const isLoading = useSignal(false);
  const shouldAnimate = useSignal(false);

  const upvote = async () => {
    if (hasUpvoted.value || isLoading.value) return;

    isLoading.value = true;
    try {
      const response = await fetch(`/api/upvote/${slug}`, { method: "POST" });
      if (!response.ok) return;

      const data = await response.json() as { added: boolean; total: number };
      if (data.added) {
        shouldAnimate.value = true;
        count.value = data.total;
        hasUpvoted.value = true;
      }
    } finally {
      isLoading.value = false;
    }
  };
  effect(() => {
    if (shouldAnimate.value) {
      const timer = setTimeout(() => shouldAnimate.value = false, 300);
      return () => clearTimeout(timer);
    }
  });

  return (
    <div class="flex items-center gap-2">
      <span class="text-text-secondary text-sm">
        {count} Rune{count.value !== 1 ? "s" : ""}
      </span>

      <button
        type="button"
        disabled={hasUpvoted.value || isLoading.value}
        onClick={upvote}
        class={`flex items-center gap-1 px-2 rounded border border-border text-text-primary hover:bg-surface disabled:opacity-60 disabled:cursor-not-allowed transition-colors ${
          shouldAnimate.value ? "animate-upvote" : ""
        }`}
        aria-label={hasUpvoted.value ? "Déjà scellée" : "Sceller une Rune"}
      >
        <span style="color: var(--rouge-mordor-700);">
          ✧
        </span>

        <span class="text-sm font-display">
          {hasUpvoted.value ? "Rune scellée" : "Sceller une Rune"}
        </span>
      </button>
    </div>
  );
}
