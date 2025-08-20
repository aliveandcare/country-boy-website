'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './PhotoCollage.module.css';

interface MediaItemType {
  type: 'image' | 'video';
  src: string;
  animation?: string;
}

interface PhotoCollageProps {
  media: MediaItemType[];
}

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

export default function PhotoCollage({ media }: PhotoCollageProps) {
  if (!media || media.length === 0) {
    return <div className={styles.container}>No media to display.</div>;
  }

  const [slotA, setSlotA] = useState<MediaItemType>({ ...media[0], animation: animationClasses[0] });
  const [slotB, setSlotB] = useState<MediaItemType>({ ...(media[1] || media[0]), animation: animationClasses[1] });
  const [isSlotAVisible, setIsSlotAVisible] = useState(true);
  const [nextMediaIndex, setNextMediaIndex] = useState(2);

  useEffect(() => {
    if (media.length < 2) return;

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
  }, [isSlotAVisible, nextMediaIndex, slotA, slotB, media]);

  if (media.length === 1) {
    return (
      <div className={styles.container}>
        <MediaItem item={slotA} isVisible={true} />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <MediaItem item={slotA} isVisible={isSlotAVisible} />
      <MediaItem item={slotB} isVisible={!isSlotAVisible} />
    </div>
  );
}