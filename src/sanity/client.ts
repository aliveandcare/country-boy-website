import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: 'ayx9vp6t',
  dataset: 'production',
  apiVersion: '2025-08-19',
  useCdn: true,
});