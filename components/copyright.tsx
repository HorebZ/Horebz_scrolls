const assets = [
  "/assets/one-ring-light.svg",
  "/assets/one-ring-dark.svg",
  "/assets/one-ring-fire.svg",
  "/assets/one-ring-ocean.svg",
  "/assets/one-ring-emerald.svg",
  "/assets/one-ring-white-gold.svg",
];

export function Copyright() {
  const randomAsset = () => {
    return assets[Math.floor(Math.random() * assets.length)];
  };

  const ring = <img src={randomAsset()} alt="o" class="w-4 h-4" />;

  return (
    <div class="flex justify-end items-baseline gap-2">
      <span class="flex items-center text-xl font-bold font-display">
        H {ring} reb'z
      </span>
    </div>
  );
}
