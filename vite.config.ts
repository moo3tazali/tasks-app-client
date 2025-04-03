import path from 'path';
import react from '@vitejs/plugin-react';
import Unfonts from 'unplugin-fonts/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import { VitePluginGenerateExports } from './src/plugins/vite-plugin-generate-exports';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite({
      target: 'react',
      autoCodeSplitting: true,
      routeToken: 'layout',
      indexToken: 'page',
    }),
    Unfonts({
      custom: {
        families: [
          {
            name: 'Cairo',
            local: 'Cairo',
            src: './src/assets/fonts/Cairo-*.ttf',
          },
        ],
        display: 'swap',
        preload: true,
        prefetch: false,
        injectTo: 'head-prepend',
      },
    }),
    react(),
    tailwindcss(),
    VitePluginGenerateExports(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
