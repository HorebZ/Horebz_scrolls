import { useEffect, useRef, useState } from "preact/hooks";
import { isOneThousandNineHundredAndNinetyNine } from "@horebz/is-one-thousand-nine-hundred-and-ninety-nine";

const STORAGE_KEY_COOLDOWN = "is-1999-cooldown-until";
const COOLDOWN_SEC = 1999;
const SPAM_WINDOW_MS = 4000;
const SPAM_THRESHOLD = 15;

function getStoredCooldownUntil(): number | null {
  if (typeof localStorage === "undefined") return null;
  const raw = localStorage.getItem(STORAGE_KEY_COOLDOWN);
  if (!raw) return null;
  const ts = Number(raw);
  return Number.isFinite(ts) ? ts : null;
}

function setStoredCooldownUntil(ts: number): void {
  localStorage.setItem(STORAGE_KEY_COOLDOWN, String(ts));
}

export default function IsOneThousandNineHundredAndNinetyNineForm() {
  const [value, setValue] = useState("");
  const [message, setMessage] = useState<"ok" | "ko" | "not-number" | null>(
    null,
  );
  const [cooldownUntil, setCooldownUntil] = useState<number | null>(null);
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  const clickTimestamps = useRef<number[]>([]);

  const isCooldown = cooldownUntil !== null && Date.now() < cooldownUntil;

  useEffect(() => {
    const stored = getStoredCooldownUntil();
    if (stored !== null && Date.now() < stored) {
      setCooldownUntil(stored);
    }
  }, []);

  useEffect(() => {
    if (!isCooldown || cooldownUntil === null) return;

    const tick = () => {
      const now = Date.now();
      if (now >= cooldownUntil) {
        setCooldownUntil(null);
        setSecondsLeft(null);
        localStorage.removeItem(STORAGE_KEY_COOLDOWN);
        return;
      }
      setSecondsLeft(Math.ceil((cooldownUntil - now) / 1000));
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [isCooldown, cooldownUntil]);

  const handleSubmit = (e: Event) => {
    e.preventDefault();

    if (isCooldown) return;

    const now = Date.now();
    clickTimestamps.current = clickTimestamps.current.filter(
      (t) => now - t < SPAM_WINDOW_MS,
    );
    clickTimestamps.current.push(now);

    if (clickTimestamps.current.length >= SPAM_THRESHOLD) {
      const until = now + COOLDOWN_SEC * 1000;
      setCooldownUntil(until);
      setSecondsLeft(COOLDOWN_SEC);
      setStoredCooldownUntil(until);
      setMessage(null);
      return;
    }

    if (value.trim() === "") {
      setMessage("not-number");
      return;
    }

    const num = Number(value);
    if (Number.isNaN(num)) {
      setMessage("ko");
      return;
    }

    const ok = isOneThousandNineHundredAndNinetyNine(num);
    setMessage(ok ? "ok" : "ko");
  };

  return (
    <form onSubmit={handleSubmit} class="space-y-4" autocomplete="off">
      <div class="flex gap-2 flex-wrap items-center">
        <input
          type="text"
          inputMode="numeric"
          value={value}
          onInput={(e) => setValue((e.target as HTMLInputElement).value)}
          placeholder="Entrez un nombre"
          class="px-3 py-2 rounded border border-border bg-background text-text-primary min-w-48"
          disabled={isCooldown}
          autocomplete="off"
        />
        <button
          type="submit"
          disabled={isCooldown}
          class="px-4 py-2 rounded bg-surface-elevated text-text-primary border border-border hover:bg-surface transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Vérifier
        </button>
      </div>

      {isCooldown && secondsLeft !== null && (
        <p class="text-text-secondary">
          Cooldown : <strong>{secondsLeft}</strong> s restantes
        </p>
      )}

      {!isCooldown && message === "ok" && (
        <p class="text-success">C'est 1999.</p>
      )}
      {!isCooldown && message === "ko" && (
        <p class="text-error">Ce n'est pas 1999.</p>
      )}
      {!isCooldown && message === "not-number" && (
        <p class="text-warning">j'ain dit un nombre.</p>
      )}
    </form>
  );
}
