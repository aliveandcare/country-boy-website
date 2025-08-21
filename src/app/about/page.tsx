import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { client } from '@/sanity/client';
import AboutPageContent from '@/components/AboutPageContent';

interface SiteSettings {
  phoneNumber: string;
  emailAddress: string;
  facebookURL: string;
  instagramURL: string;
}

async function getSiteSettings() {
  const query = `*[_type == "siteSettings"][0]{ phoneNumber, emailAddress, facebookURL, instagramURL }`;
  const settings: SiteSettings = await client.fetch(query);
  return settings;
}

export default async function AboutPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <Header settings={settings} />
      <AboutPageContent />
      <Footer settings={settings} />
    </>
  );
}