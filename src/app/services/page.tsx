// app/services/page.tsx

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { client } from '@/sanity/client';
import ServicesPageContent from '@/components/ServicesPageContent';

interface SiteSettings {
  phoneNumber: string;
  emailAddress: string;
  facebookURL: string;
  instagramURL: string;
}

interface Service {
  title: string;
  description: string;
  imageUrl: string | null;
}

async function getPageData() {
  const query = `{
    "settings": *[_type == "siteSettings"][0]{ phoneNumber, emailAddress, facebookURL, instagramURL },
    "services": *[_type == "service"]{ title, description, "imageUrl": mainImage.asset->url }
  }`;
  const data = await client.fetch(query);
  return data;
}

export default async function ServicesPage() {
  const { settings, services } = await getPageData();

  return (
    <>
      <Header settings={settings} />
      <ServicesPageContent services={services} />
      <Footer settings={settings} />
    </>
  );
}