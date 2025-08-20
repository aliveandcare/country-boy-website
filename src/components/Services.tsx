'use client';

import React from 'react';
import Image from 'next/image';
import styles from './Services.module.css';

interface Service {
  title: string;
  description: string;
  iconUrl: string | null;
}

// Update the props to include the onClick function
interface ServicesProps {
  services: Service[];
  onServiceClick: () => void;
}

export default function Services({ services, onServiceClick }: ServicesProps) {
  if (!services || services.length === 0) {
    return null;
  }

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Our Services</h2>
      <div className={styles.grid}>
        {services.map((service) => (
          // Wrap the card in a button that triggers the modal
          <button key={service.title} className={styles.cardButton} onClick={onServiceClick}>
            <div className={styles.card}>
              {service.iconUrl && (
                <div className={styles.icon}>
                  <Image 
                    src={service.iconUrl} 
                    alt={`${service.title} icon`} 
                    fill
                    sizes="(max-width: 768px) 50px, 80px"
                  />
                </div>
              )}
              <h3 className={styles.title}>{service.title}</h3>
              <p className={styles.description}>{service.description}</p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}