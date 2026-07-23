// @ts-check
import { defineConfig, passthroughImageService } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  // Set to your Vercel/custom domain after deploy (canonical, OG, llms.txt, Ask AI).
  site: 'https://pratham-commits.vercel.app',
  image: {
    // Keeps pre-optimized GIF bytes intact; Sharp re-encoding was ~40% larger.
    service: passthroughImageService(),
    remotePatterns: [{ protocol: 'https', hostname: 'i.pinimg.com' }],
  },
});
