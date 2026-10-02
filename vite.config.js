import { copyFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [{
    name: 'portfolio-page-entry',
    apply: 'build',
    writeBundle(options) {
      const output = resolve(options.dir || 'dist');
      // Pages serves /portfolio directly from portfolio.html.
      copyFileSync(resolve(output, 'index.html'), resolve(output, 'portfolio.html'));
    },
  }],
});
