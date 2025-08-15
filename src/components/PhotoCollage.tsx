'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './PhotoCollage.module.css';

interface MediaItemType {
  type: 'image' | 'video';
  src: string;
  animation?: string;
}

const media: MediaItemType[] = [
  { type: 'image', src: '/ford1.jpg' },
  { type: 'image', src: '/ford2.jpg' },
  { type: 'image', src: '/ford.jpg' },
  { type: 'video', src: '/Video1.mp4' },
  { type: 'image', src: '/drain.jpg' },
  { type: 'image', src: '/field.jpg' },
  { type: 'image', src: '/grass.jpg' },
  { type: 'image', src: '/siding1.png' },
  { type: 'image', src: '/siding2.png' },
  { type: 'image', src: '/siding3.png' },
  { type: 'image', src: '/sidewalk.jpg' },
  { type: 'image', src: '/sidewalk1.jpg' },
  { type: 'image', src: '/ac.jpg' },
  { type: 'image', src: '/pad.jpg' },
  { type: 'image', src: '/addition.jpg' },
  { type: 'image', src: '/addition1.jpg' },
  { type: 'image', src: '/metalbarn.jpg' },
  { type: 'image', src: '/metalbarn1.jpg' },
  { type: 'image', src: '/metalbarn2.jpg' },
  { type: 'image', src: '/newroom.jpg' },
  { type: 'image', src: '/newroom1.jpg' },
  { type: 'image', src: '/newroom2.jpg' },
  { type: 'image', src: '/newroom3.jpg' },
  { type: 'image', src: '/newroom4.jpg' },
  { type: 'image', src: '/landscaping.png' },
  { type: 'image', src: '/grading.jpg' },
  { type: 'image', src: '/grading1.jpg' },
  { type: 'image', src: '/gravel.jpg' },
  { type: 'image', src: '/plumbing.jpg' },
  { type: 'image', src: '/plumbing1.jpg' },
  { type: 'image', src: '/mower.jpg' },
  { type: 'image', src: '/mowers.jpg' },
  { type: 'image', src: '/stripe.jpg' },
];

const animationClasses = [
  styles['kenburns-top'],
  styles['kenburns-bottom-right'],
  styles['kenburns-zoom-out'],
  styles['kenburns-pan-left'],
];

const getRandomItem = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const MediaItem = ({ item, isVisible }: { item: MediaItemType; isVisible: boolean }) => {
  const animation = item.type === 'image' ? item.animation : '';
  
  if (item.type === 'video') {
    return (
      <video
        key={item.src}
        src={item.src}
        autoPlay
        loop
        muted
        playsInline
        className={`${styles.video} ${isVisible ? styles.visible : ''}`}
      />
    );
  }

  return (
    <Image
      key={item.src}
      src={item.src}
      alt="A photo of a beautiful home project"
      fill
      priority={isVisible}
      className={`${styles.image} ${animation} ${isVisible ? styles.visible : ''}`}
    />
  );
};

export default function PhotoCollage() {
  const [slotA, setSlotA] = useState<MediaItemType>({ ...media[0], animation: animationClasses[0] });
  const [slotB, setSlotB] = useState<MediaItemType>({ ...media[1], animation: animationClasses[1] });
  const [isSlotAVisible, setIsSlotAVisible] = useState(true);
  const [nextMediaIndex, setNextMediaIndex] = useState(2);

  useEffect(() => {
    const currentMedia = isSlotAVisible ? slotA : slotB;
    const interval = currentMedia.type === 'video' ? 37000 : 7000;

    const timer = setInterval(() => {
      const targetSlot = isSlotAVisible ? 'B' : 'A';
      const nextMediaItem = media[nextMediaIndex % media.length];
      const nextAnimation = getRandomItem(animationClasses);
      
      const newItem: MediaItemType = {
        src: nextMediaItem.src,
        type: nextMediaItem.type,
        animation: nextAnimation,
      };

      if (targetSlot === 'A') {
        setSlotA(newItem);
      } else {
        setSlotB(newItem);
      }

      setNextMediaIndex(prevIndex => prevIndex + 1);
      setIsSlotAVisible(prev => !prev);
    }, interval);

    return () => clearInterval(timer);
  }, [isSlotAVisible, nextMediaIndex, slotA, slotB]);

  return (
    <div className={styles.container}>
      <MediaItem item={slotA} isVisible={isSlotAVisible} />
      <MediaItem item={slotB} isVisible={!isSlotAVisible} />
    </div>
  );
}