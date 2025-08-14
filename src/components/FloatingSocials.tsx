'use client';

import React from 'react';
import { FaFacebook, FaPhone, FaEnvelope } from 'react-icons/fa';
import styles from './FloatingSocials.module.css';
import { useModalStore } from '@/store/modalStore';

export default function FloatingSocials() {
  const openQuoteModal = useModalStore((state) => state.openQuoteModal);

  return (
    <div className={styles.socialBar}>
      <a href="https://www.facebook.com/profile.php?id=100057319274987" target="_blank" rel="noopener noreferrer" className={`${styles.iconLink} ${styles.facebook}`} aria-label="Follow us on Facebook">
        <FaFacebook />
      </a>
      <a href="tel:615-762-7486" className={`${styles.iconLink} ${styles.phone}`} aria-label="Call us">
        <FaPhone />
      </a>
      <button onClick={openQuoteModal} className={`${styles.iconLink} ${styles.email}`} aria-label="Email us for a quote">
        <FaEnvelope />
      </button>
    </div>
  );
}