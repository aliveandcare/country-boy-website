'use client';

import React from 'react';
import styles from './ReviewTicker.module.css';
import { FaStar } from 'react-icons/fa';

interface Review {
  quote: string;
  authorName: string;
  rating: number;
}

export default function ReviewTicker({ reviews }: { reviews: Review[] }) {
  if (!reviews || reviews.length === 0) {
    return <div className={styles.tickerWrap}>No approved reviews yet.</div>;
  }

  const extendedReviews = [...reviews, ...reviews];

  return (
    <div className={styles.tickerWrap}>
      <ul className={styles.ticker}>
        {extendedReviews.map((review, index) => (
          <li key={`${review.authorName}-${index}`} className={styles.card}>
            <div className={styles.header}>
              <p className={styles.name}>{review.authorName}</p>
              <div className={styles.stars}>
                {[...Array(review.rating || 5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
            </div>
            <p className={styles.text}>&quot;{review.quote}&quot;</p>
          </li>
        ))}
      </ul>
    </div>
  );
}