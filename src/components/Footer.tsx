import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* About Column */}
        <div className={styles.aboutColumn}>
            <a href="https://crossstylecenter.org">
          <Image src="/logo.jpg" alt="Country Boy Logo" width={150} height={50} />
          <p className={styles.aboutText}>
            Building futures, transforming spaces. We bring skill and dedication to every project, supporting a mission of hope and recovery.
          </p></a>
        </div>

        {/* Quick Links Column */}
        <div className={styles.column}>
          <h3>Quick Links</h3>
          <ul className={styles.linkList}>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/portal">Employee Portal</Link></li>
          </ul>
        </div>

        {/* Contact Column */}
        <div className={styles.column}>
          <h3>Contact Us</h3>
          <address className={styles.contactInfo}>
            <ul className={styles.linkList}>
              <li><a href="tel:615-762-7486">(615) 762-7486</a></li>
              <li><a href="mailto:crossstylecenter.chris@gmail.com">CrossStyleCenter.Chris@gmail.com</a></li>
            </ul>
          </address>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <p>&copy; {currentYear} Cross Style International Ministries. All Rights Reserved.</p>
      </div>
    </footer>
  );
}