import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: 'ayx9vp6t', // find this at manage.sanity.io or in your sanity.config.ts
  dataset: 'production', // this is the name of the dataset you created
  apiVersion: '2025-08-19', // use a UTC date in `YYYY-MM-DD` format
  useCdn: true, // `false` if you want to ensure fresh data
});