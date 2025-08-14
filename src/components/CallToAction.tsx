'use client';

import React from 'react';
import { FaHammer } from 'react-icons/fa';
import styles from './CallToAction.module.css';
import { useModalStore } from '@/store/modalStore';

export default function CallToAction() {
  const openQuoteModal = useModalStore((state) => state.openQuoteModal);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.icon}><FaHammer /></div>
        <h3 className={styles.heading}>Ready to Start Your Project?</h3>
        <p className={styles.subheading}>From plumbing to painting, our expert team is ready to bring your vision to life. Let&apos;s build something great together.</p>
        <button onClick={openQuoteModal} className={styles.ctaButton}>
          Bring Your Vision To Life
        </button>
      </div>
    </section>
  );
}