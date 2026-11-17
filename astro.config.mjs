// @ts-check
import { defineConfig } from 'astro/config';

// littlebrains.co is served from the repository root through GitHub Pages,
// using the custom domain in public/CNAME, so no `base` is needed.
export default defineConfig({
  site: 'https://littlebrains.co',
  trailingSlash: 'always',
  build: { format: 'directory' },
});
