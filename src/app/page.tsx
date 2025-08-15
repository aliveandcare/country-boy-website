'use client';

import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import TrustBadges from '@/components/TrustBadges';
import Services from '@/components/Services';
// import Mission from '@/components/Mission';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';
import Modal from '@/components/Modal';
import QuoteForm from '@/components/QuoteForm';
import { useModalStore } from '@/store/modalStore';

export default function Home() {
  const { isQuoteModalOpen, closeQuoteModal } = useModalStore();

  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustBadges />
        <Services />
        {/* <Mission /> */}
        <CallToAction />
      </main>
      <Footer />

      <Modal isOpen={isQuoteModalOpen} onClose={closeQuoteModal}>
        <QuoteForm />
      </Modal>
    </>
  );
}