'use client';

import React, { useState, useEffect } from 'react';
import styles from './ReviewTicker.module.css';
import { FaStar } from 'react-icons/fa';
import { collection, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Review {
  name: string;
  rating: number;
  text: string;
}

const StarRating = ({ rating }: { rating: number }) => (
  <div className={styles.stars}>
    {[...Array(rating)].map((_, i) => (
      <FaStar key={i} />
    ))}
  </div>
);

export default function ReviewTicker() {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, 'reviews'),
      where('rating', '>=', 4),
      orderBy('rating', 'desc'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const reviewsData: Review[] = [];
      querySnapshot.forEach((doc) => {
        reviewsData.push(doc.data() as Review);
      });
      setReviews(reviewsData);
    });

    return () => unsubscribe();
  }, []);

  if (reviews.length === 0) {
    return <div className={styles.card}>No reviews yet. Be the first!</div>;
  }

  const duplicatedReviews = [...reviews, ...reviews];

  return (
    <div className={styles.tickerWrap}>
      <ul className={styles.ticker}>
        {duplicatedReviews.map((review, index) => (
          <li key={index}>
            <div className={styles.card}>
              <div className={styles.header}>
                <p className={styles.name}>{review.name}</p>
                <StarRating rating={review.rating} />
              </div>
              <p className={styles.text}>&quot;{review.text}&quot;</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}