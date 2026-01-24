# Horebz Scrolls

<div align="center">
  <img src="https://deno.land/logo.svg" alt="Deno" width="120" />
  <img src="https://raw.githubusercontent.com/sveltejs/branding/master/svelte-logo.svg" alt="Svelte" width="120" />
</div>

A modern blog built with **Deno**, **SvelteKit** and **TailwindCSS**.

## 🚀 Technologies

- **Runtime** : Deno 2
- **Framework** : SvelteKit
- **Styling** : TailwindCSS (v4)

## 📦 Installation

The project uses Deno to manage dependencies. No manual installation is
required, Deno automatically downloads the required npm packages.

## 🛠️ Development

Start the development server:

```bash
deno task dev
```

The site will be accessible at `http://localhost:5173` (or the port indicated by
Vite).

## 📝 Adding an article

1. Create a new `.md` file in the `src/lib/posts/` folder
2. Add metadata in frontmatter at the beginning of the file:

```markdown
---
title: "My awesome article"
date: "2026-01-24"
description: "A description of my article"
---

Your Markdown content here...
```

3. The article will automatically appear in the blog's article list

## 🏗️ Build

Create a production build:

```bash
deno task build
```

Preview the production build:

```bash
deno task preview
```

## 🚢 Deployment on Deno Deploy

1. Fork the actual repository or create a new one and push your code on GitHub
2. Go to [dash.deno.com](https://dash.deno.com)
3. Connect your GitHub repository
4. Deno Deploy will automatically detect your SvelteKit/Deno configuration
5. Your site will be automatically deployed on each push

Your blog will be accessible at a URL like: `your-blog.deno.dev`

## 📁 Project structure

```
src/
├── lib/
│   ├── posts/          # Your Markdown articles
│   ├── posts.ts        # Utility to retrieve articles
│   └── types.ts        # TypeScript types
└── routes/
    ├── blog/
    │   └── [slug]/     # Dynamic route to display an article
    └── +page.svelte    # Home page
```

## 🎨 Code formatting

The project uses Deno's built-in formatter (`deno fmt`). To format your code:

```bash
deno fmt
```

## 📚 Available commands

- `deno task dev` - Start the development server
- `deno task build` - Build the production version
- `deno task preview` - Preview the production version
- `deno task check` - Check TypeScript types
