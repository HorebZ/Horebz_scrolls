export default function Categories({ categories }: { categories: string[] }) {
  return (
    <div class="flex flex-wrap gap-2">
      {categories.map((category: string) => (
        <span class="inline-block px-3 rounded-sm text-xs italic bg-accent">
          {category}
        </span>
      ))}
    </div>
  );
}
