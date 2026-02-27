export default function Categories({ categories }: { categories: string[] }) {
  return (
    <div class="flex flex-wrap gap-2">
      {categories.map((category: string) => (
        <span class="inline-block px-2 py-px rounded-sm text-xs bg-accent">
          {category}
        </span>
      ))}
    </div>
  );
}
