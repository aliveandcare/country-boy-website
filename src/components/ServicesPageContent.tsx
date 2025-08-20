'use client';

import React from 'react';
import Image from 'next/image';
import styles from '@/app/services/services.module.css';

interface Service {
  title: string;
  description: string;
  imageUrl: string | null;
}

export default function ServicesPageContent({ services }: { services: Service[] }) {
  return (
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
              {service.imageUrl && (
                <Image
                  src={service.imageUrl}
                  alt={service.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              )}
            </div>
            <div className={styles.textContainer}>
              <h2 className={styles.serviceTitle}>{service.title}</h2>
              <p className={styles.serviceDescription}>{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}