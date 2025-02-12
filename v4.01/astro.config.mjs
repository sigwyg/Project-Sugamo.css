import { defineConfig } from 'astro/config';
import myExtIntegration from '/src/config/myExtIntegration';
import myExtGenerateUserInfo from '/src/config/myExtGenerateUserInfo';

// refs. https://astro.build/config
export default defineConfig({
  site: 'https://sugamocss.com',
  trailingSlash: 'ignore',
  compressHTML: false,
  integrations: [myExtIntegration(), myExtGenerateUserInfo()],
  build: {
    format: 'file',
  },
});
