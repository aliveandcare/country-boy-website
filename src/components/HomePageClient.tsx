'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import TrustBadges from '@/components/TrustBadges';
import Services from '@/components/Services';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';
import Modal from '@/components/Modal';
import QuoteForm from '@/components/QuoteForm';
import ReviewForm from './ReviewForm';
import { useModalStore } from '@/store/modalStore';
import styles from './Hero.module.css';

interface MediaItem {
  type: 'image' | 'video';
  src: string;
}

interface Review {
  quote: string;
  authorName: string;
  rating: number;
  _id: string;
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

interface Service {
  title: string;
  description: string;
  iconUrl: string | null;
}

interface HomePageClientProps {
  mediaForCollage: MediaItem[];
  reviews: Review[];
  ctaContent: CtaContent;
  settings: SiteSettings;
  services: Service[];
}

export default function HomePageClient({ 
  mediaForCollage, 
  reviews, 
  ctaContent, 
  settings, 
  services 
}: HomePageClientProps) {
  const { isQuoteModalOpen, openQuoteModal, closeQuoteModal } = useModalStore();
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  return (
    <>
      <Header settings={settings}/>
      <main>
        <Hero media={mediaForCollage} reviews={reviews}>
          <button 
            className={styles.reviewButton} 
            onClick={() => setIsReviewModalOpen(true)}
          >
            Leave a Review
          </button>
        </Hero>
        <TrustBadges />
        <Services services={services} onServiceClick={openQuoteModal} />
        <CallToAction ctaContent={ctaContent} /> 
      </main>
      <Footer settings={settings}/>

      <Modal isOpen={isQuoteModalOpen} onClose={closeQuoteModal}>
        <QuoteForm />
      </Modal>

      <Modal isOpen={isReviewModalOpen} onClose={() => setIsReviewModalOpen(false)}>
        <ReviewForm onClose={() => setIsReviewModalOpen(false)} />
      </Modal>
    </>
  );
}