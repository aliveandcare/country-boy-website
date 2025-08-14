import React from 'react';
import Image from 'next/image';
import styles from './Mission.module.css';

export default function Mission() {
  return (
    <section className={styles.mission}>
      <div className={styles.container}>
        <div className={styles.textColumn}>
          <h2 className={styles.heading}>
            Our Mission of Transformation
          </h2>
          <p className={styles.text}>
            Building futures, transforming spaces. At Country Boy, we bring skill & dedication to every project, while every job we do supports a mission of hope and recovery. See the difference we make together.
          </p>
        </div>
        <div className={styles.imageColumn}>
          <a href="https://crossstylecenter.org" target='_blank' rel='noopener noreferrer'>
           <Image
              src="/logo.jpg"
              alt="Cross Style Center Logo"
              width={400}
              height={150}
              style={{ objectFit: 'contain' }}
            /></a>
        </div>
      </div>
    </section>
  );
}