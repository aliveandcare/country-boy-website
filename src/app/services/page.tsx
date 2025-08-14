import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from './services.module.css';

// You can customize this list with your own services
const services = [
  {
    title: 'Interior & Exterior Painting',
    description: 'We provide high-quality painting services that breathe new life into your home. From single rooms to the entire exterior, our meticulous attention to detail ensures a flawless, long-lasting finish that you will love.',
    imageUrl: '/interior-paint.jpg',
  },
  {
    title: 'Decks & Fencing',
    description: 'Whether you need a brand new deck for summer barbecues or a sturdy fence for privacy and security, we design and build outdoor structures that are both beautiful and durable, using only the best materials.',
    imageUrl: '/deckfence.jpg',
  },
  {
    title: 'General Repairs & Maintenance',
    description: 'Got a list of small jobs that never seem to get done? We handle everything from drywall repair and leaky faucets to fixture installation and routine home maintenance, saving you time and hassle.',
    imageUrl: '/homerepair.jpg',
  },
];

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Our Services</h1>
          <p className={styles.pageSubtitle}>We offer a wide range of professional handyman and construction services to meet your needs. We are dedicated to delivering high-quality workmanship and friendly service on every single job.</p>
        </div>

        <div className={styles.servicesContainer}>
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`${styles.serviceSection} ${index % 2 !== 0 ? styles.reversed : ''}`}
            >
              <div className={styles.imageContainer}>
                <Image
                  src={service.imageUrl}
                  alt={service.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className={styles.textContainer}>
                <h2 className={styles.serviceTitle}>{service.title}</h2>
                <p className={styles.serviceDescription}>{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}