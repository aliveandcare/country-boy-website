'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './AutoCarousel.module.css'; 

const images = [
  {
    before: 'https://placehold.co/1200x800/808080/FFFFFF?text=Before',
    after: 'https://placehold.co/1200x800/e67e22/FFFFFF?text=After',
  },
  {
    before: 'https://placehold.co/1200x800/4a4a4a/FFFFFF?text=Before',
    after: 'https://placehold.co/1200x800/3d5a42/FFFFFF?text=After',
  },
  {
    before: 'https://placehold.co/1200x800/a3a3a3/FFFFFF?text=Before',
    after: 'https://placehold.co/1200x800/fdf5e6/FFFFFF?text=After',
  },
];

export default function AutoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); 
    return () => clearInterval(intervalId);
  }, []);

  const currentPair = images[currentIndex];

  return (
    <div className={styles.carousel}>      
      <div className={styles.imageContainer}>
        <Image
          src={currentPair.before}
          alt={`Before Image ${currentIndex + 1}`}
          fill
          style={{ objectFit: 'cover' }}
          unoptimized
        />
      </div>
      <div className={styles.imageContainer}>
        <Image
          src={currentPair.after}
          alt={`After Image ${currentIndex + 1}`}
          fill
          style={{ objectFit: 'cover' }}
          unoptimized
        />
      </div>
    </div>
  );
}