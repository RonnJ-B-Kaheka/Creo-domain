import { defineConfig } from 'vite';
import htmlInject from 'vite-plugin-html-inject';
import { resolve } from 'path';
import { glob } from 'glob';

// Helper to find all HTML files
const htmlFiles = glob.sync('**/*.html', { ignore: ['node_modules/**', 'dist/**'] });
const input = {};
htmlFiles.forEach(file => {
  const name = file.replace(/\.html$/, '');
  input[name] = resolve(__dirname, file);
});

export default defineConfig({
  plugins: [htmlInject()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: input,
    },
  },
  server: {
    open: true,
  }
});
