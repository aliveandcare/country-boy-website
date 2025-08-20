'use client';

import React from 'react';
import { FaHammer } from 'react-icons/fa';
import styles from './CallToAction.module.css';
import { useModalStore } from '@/store/modalStore';

interface CtaContent {
  ctaHeading: string;
  ctaSubheading: string;
  ctaButtonText: string;
}

export default function CallToAction({ ctaContent }: { ctaContent: CtaContent }) {
  const openQuoteModal = useModalStore((state) => state.openQuoteModal);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.icon}><FaHammer /></div>
        <h3 className={styles.heading}>{ctaContent?.ctaHeading}</h3>
        <p className={styles.subheading}>{ctaContent?.ctaSubheading}</p>
        <button onClick={openQuoteModal} className={styles.ctaButton}>{ctaContent?.ctaButtonText}
        </button>
      </div>
    </section>
  );
}