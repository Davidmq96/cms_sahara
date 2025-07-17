import { createDirectus } from 'directus/dist/index.js';
import config from './directus.config.js';

const directus = await createDirectus(config);
await directus.start();