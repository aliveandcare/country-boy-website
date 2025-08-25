import HomePageClient from '@/components/HomePageClient';
import { client } from '@/sanity/client';

interface SanityMedia {
  mediaUrl: string;
  mediaType: 'image' | 'video';
}

interface SanityReview {
  quote: string;
  authorName: string;
  rating: number;
}

interface CtaContent {
  ctaHeading: string;
  ctaSubheading: string;
  ctaButtonText: string;
}

interface SiteSettings {
  phoneNumber: string;
  emailAddress: string;
  facebookURL: string;
  instagramURL: string;
}

interface SanityService {
  title: string;
  description: string;
  iconUrl: string | null;
}

async function getPageData() {
  const query = `{
    "galleryItems": *[_type == "project"] | order(_createdAt asc){ "mediaUrl": mediaFile.asset->url, mediaType },
    "reviews": *[_type == "testimonial" && isApproved == true]{ quote, authorName, rating, _id },
    "ctaContent": *[_type == "homePage"][0]{ ctaHeading, ctaSubheading, ctaButtonText },
    "settings": *[_type == "siteSettings"][0]{ phoneNumber, emailAddress, facebookURL, instagramURL },
    "services": *[_type == "service"]{ title, description, "iconUrl": mainImage.asset->url }
  }`;
  const data = await client.fetch(query);
  return data;
}

export default async function HomePage() {
  const { galleryItems, reviews, ctaContent, settings, services } = await getPageData();

  const mediaForCollage = galleryItems.map((item: SanityMedia) => ({
    type: item.mediaType,
    src: item.mediaUrl,
  }));
  
  return (
    <HomePageClient 
      mediaForCollage={mediaForCollage} 
      reviews={reviews} 
      ctaContent={ctaContent}
      settings={settings}
      services={services}
    />
  );
}