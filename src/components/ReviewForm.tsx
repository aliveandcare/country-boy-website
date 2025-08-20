'use client';

import React, { useState } from 'react';
import styles from './ReviewForm.module.css';
import { FaStar } from 'react-icons/fa';

export default function ReviewForm({ onClose }: { onClose: () => void }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0 || !name || !text) {
      setError('Please fill out all fields and select a rating.');
      return;
    }
    setIsSubmitting(true);
    setError('');
    
    try {
      const response = await fetch('/api/createReview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          authorName: name,
          quote: text,
          rating: rating,
        }),
      });

      if (!response.ok) {
        throw new Error('Server responded with an error');
      }

      alert('Thank you for your review!');
      onClose();
    } catch (err) {
      setError('Failed to submit review. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3 className={styles.title}>Leave a Review</h3>
      <p className={styles.subtitle}>Share your experience with us. Your feedback helps us grow!</p>
      
      <div className={styles.starRating}>
        {[...Array(5)].map((_, index) => {
          const ratingValue = index + 1;
          return (
            <label key={index}>
              <input type="radio" name="rating" value={ratingValue} onClick={() => setRating(ratingValue)} className={styles.radioInput} />
              <FaStar className={styles.star} color={ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'} onMouseEnter={() => setHover(ratingValue)} onMouseLeave={() => setHover(0)} />
            </label>
          );
        })}
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="review">Your Review</label>
        <textarea id="review" value={text} onChange={(e) => setText(e.target.value)} rows={4} required />
      </div>
      
      {error && <p className={styles.error}>{error}</p>}

      <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
}