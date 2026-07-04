import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: '/lumina/' — required for GitHub Pages (site lives at /lumina/).
// If you later move to a custom domain or Vercel, change base to '/'.
export default defineConfig({
  plugins: [react()],
  base: '/lumina/',
});
