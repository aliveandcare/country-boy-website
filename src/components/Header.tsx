'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Header.module.css';
import { useModalStore } from '@/store/modalStore';

// Define the shape of the settings data
interface SiteSettings {
  phoneNumber: string;
  emailAddress: string;
  facebookURL: string;
  instagramURL: string;
}

// Update the component to accept the 'settings' prop
export default function Header({ settings }: { settings: SiteSettings }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const openQuoteModal = useModalStore((state) => state.openQuoteModal);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const handleLinkClick = () => setIsMenuOpen(false);

  // A fallback in case the settings data isn't available yet
  const phoneNumber = settings?.phoneNumber || '(123) 456-7890';

  return (
    <div className={`${styles.headerWrap} ${isMenuOpen ? styles.menuOpen : ''}`}>
      <header className={styles.header}>
        <div className={styles.leftNav}>
          <button onClick={openQuoteModal} className={styles.quoteButton}>
            Bring Your Vision To Life
          </button>
          {/* Use the dynamic phone number from Sanity */}
          <a href={`tel:${phoneNumber}`} className={styles.phoneNumber}>{phoneNumber}</a>
        </div>
        <div className={styles.logoContainer}>
          <Link href="/"><Image src="/logo.png" alt="Country Boy Logo" fill style={{ objectFit: 'cover' }} priority sizes="180px"/></Link>
        </div>
        <div className={styles.rightNav}>
          <ul className={styles.navList}>
            <li><Link href="/" className={styles.navLink}>Home</Link></li>
            <li><Link href="/services" className={styles.navLink}>Services</Link></li>
            <li><Link href="/about" className={styles.navLink}>About Us</Link></li>
          </ul>
        </div>
      </header>
      
      <button className={styles.hamburgerButton} onClick={toggleMenu} aria-label="Toggle menu">
        <div className={styles.hamburgerIcon}><span></span><span></span><span></span></div>
      </button>

      <nav className={styles.mobileMenu}>
        <Link href="/" onClick={handleLinkClick}>Home</Link>
        <Link href="/services" onClick={handleLinkClick}>Services</Link>
        <Link href="/about" onClick={handleLinkClick}>About Us</Link>
        <button onClick={() => { openQuoteModal(); handleLinkClick(); }} className={styles.quoteButton}>
          Bring Your Vision To Life
        </button>
        <a href={`tel:${phoneNumber}`} className={styles.phoneNumber}>{phoneNumber}</a>
      </nav>
    </div>
  );
}