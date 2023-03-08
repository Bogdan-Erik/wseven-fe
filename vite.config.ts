import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { imagetools } from 'vite-imagetools'

const directives = {
  imagecardPreview: new URLSearchParams(
    'format=webp;webp&width=438&height=250&position=entropy&quality=60&meta',
  ),
};
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api-v1' : 'http://localhost:8084'
    }
  },
  plugins: [react(), imagetools({
    include: '**/*.{heic,heif,avif,jpeg,jpg,png,tiff,webp,gif}*',
    defaultDirectives: (id) => {
      // scan images without search params. These kind of images might be
      // imported dynamically, where search params wont work.
      if (id.search === '') {
        if (id.pathname.includes('discretize-guides/guides/')) {
          return directives.imagecardPreview;
        }
      }
      return id.searchParams;
    },
  })]
})
