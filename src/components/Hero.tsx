// src/components/Hero.tsx

import React from 'react';
import PhotoCollage from './PhotoCollage';
import ReviewTicker from './ReviewTicker';
import styles from './Hero.module.css';
import { FaRegComments, FaHardHat, FaHeart } from 'react-icons/fa';

interface MediaItem {
  type: 'image' | 'video';
  src: string;
}

interface Review {
  quote: string;
  authorName: string;
  rating: number;
  _id: string;
}

interface HeroProps {
  media: MediaItem[];
  reviews: Review[];
  children: React.ReactNode;
}

export default function Hero({ media, reviews, children }: HeroProps) {
  return (
    <section className={styles.hero}>
      <h2 className={styles.heading}>
        Building Dreams, <span className={styles.highlight}>Restoring Futures</span>
      </h2>
      <p className={styles.subheading}>
        Your trusted partner for home transformation and community impact.
      </p>

      <div className={styles.heroGrid}>
        <div className={styles.sideColumn}>
          <ul className={styles.valueList}>
            <li className={styles.valueItem}>
              <div className={styles.icon}><FaRegComments /></div>
              <span className={styles.itemText}>
                <strong>1. Free Consultation</strong>
                We start by listening to your needs and providing a clear, no-obligation estimate.
              </span>
            </li>
            <li className={styles.valueItem}>
              <div className={styles.icon}><FaHardHat /></div>
              <span className={styles.itemText}>
                <strong>2. We Build Your Vision</strong>
                Our expert team gets to work, treating your home with respect and professionalism.
              </span>
            </li>
            <li className={styles.valueItem}>
              <div className={styles.icon}><FaHeart /></div>
              <span className={styles.itemText}>
                <strong>3. You Love the Result</strong>
                We ensure you&apos;re 100% satisfied with the finished product. Your happiness is our mission.
              </span>
            </li>
          </ul>
        </div>

        <div className={styles.carouselContainer}>
          <PhotoCollage media={media} />
        </div>

        <div className={`${styles.sideColumn} ${styles.reviewColumn}`}>
          <ReviewTicker reviews={reviews} />
          {children}
        </div>
      </div>
    </section>
  );
}