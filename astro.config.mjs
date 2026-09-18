// @ts-check
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import { defineConfig, passthroughImageService } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  adapter: vercel(),
  // Production URL (canonical, OG, llms.txt, Ask AI).
  site: 'https://prathamshah.in',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/api/'),
    }),
  ],
  image: {
    // Keeps pre-optimized GIF bytes intact; Sharp re-encoding was ~40% larger.
    service: passthroughImageService(),
    remotePatterns: [{ protocol: 'https', hostname: 'i.pinimg.com' }],
  },
});
