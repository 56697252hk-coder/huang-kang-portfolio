import { copyFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [{
    name: 'portfolio-page-entry',
    apply: 'build',
    writeBundle(options) {
      const output = resolve(options.dir || 'dist');
      // Cloudflare Pages serves each navigation destination as a real page.
      for (const page of ['portfolio', 'about', 'strengths', 'contact']) {
        copyFileSync(resolve(output, 'index.html'), resolve(output, `${page}.html`));
      }
    },
  }],
});
