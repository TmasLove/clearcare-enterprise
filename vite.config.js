import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: { port: 5181, strictPort: true },
  // vite-react-ssg: emit nested dir/index.html so nginx `try_files $uri $uri/ /index.html`
  // serves prerendered pages (e.g. /solutions/tpa -> solutions/tpa/index.html).
  ssgOptions: { dirStyle: 'nested' },
});
