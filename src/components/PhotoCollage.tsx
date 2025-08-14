'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './PhotoCollage.module.css';


const images = [
  '/ford1.jpg',
  '/ford2.jpg',
'/ford.jpg',
'/drain.jpg',
'/field.jpg',
'/grass.jpg',
'/siding1.png',
'/siding2.png',
'/siding3.png',
'/sidewalk.jpg',
'/sidewalk1.jpg',
'/ac.jpg',
'/pad.jpg',
'/addition.jpg',
'/addition1.jpg',
'/metalbarn.jpg',
'/metalbarn1.jpg',
'/metalbarn2.jpg',
'/newroom.jpg',
'/newroom1.jpg',
'/newroom2.jpg',
'/newroom3.jpg',
'/newroom4.jpg',
'/landscaping.png',
'/grading.jpg',
'/grading1.jpg',
'/gravel.jpg',
'/pad.jpg',
'/plumbing.jpg',
'/plumbing1.jpg',
'/mower.jpg',
'/mowers.jpg',
'/stripe.jpg',
];


const animationClasses = [
  styles['kenburns-top'],
  styles['kenburns-bottom-right'],
  styles['kenburns-zoom-out'],
  styles['kenburns-pan-left'],
];

const getRandomItem = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

export default function PhotoCollage() {
const [slotA, setSlotA] = useState({ src: images[0], animation: animationClasses[0] });
  const [slotB, setSlotB] = useState({ src: images[1], animation: animationClasses[1] || animationClasses[0] });
  const [isSlotAVisible, setIsSlotAVisible] = useState(true);
  const [nextImageIndex, setNextImageIndex] = useState(2);
  
  useEffect(() => {
    const timer = setInterval(() => {
       const targetSlot = isSlotAVisible ? 'B' : 'A';
       const nextImage = images[nextImageIndex % images.length];
      const nextAnimation = getRandomItem(animationClasses);

       if (targetSlot === 'A') {
        setSlotA({ src: nextImage, animation: nextAnimation });
      } else {
        setSlotB({ src: nextImage, animation: nextAnimation });
      }
      setNextImageIndex(prevIndex => prevIndex + 1);
      setIsSlotAVisible(prev => !prev);
    }, 3500);

    return () => clearInterval(timer); 
  }, [isSlotAVisible, nextImageIndex]);

  return (
    <div className={styles.container}>
     <Image
     key="slot-a"
     src={slotA.src}
     alt='Photo Collage'
     fill
     priority
     className={`${styles.image} ${slotA.animation} ${isSlotAVisible ? styles.visible : ''}`}
     />
     <Image
      key="slot-b"
      src={slotB.src}
      alt='Photo Collage'
      fill
      priority
      className={`${styles.image} ${slotB.animation} ${!isSlotAVisible ? styles.visible : ''}`}
     />
    </div>
  );
}