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
  const [isSlotAVisible, setIsSlotAVisible] = useState(true);
  const [nextMediaIndex, setNextMediaIndex] = useState(2);
  const [slotA, setSlotA] = useState<MediaItemType>(
    media && media.length > 0
      ? { ...media[0], animation: animationClasses[0] }
      : { type: 'image', src: '', animation: '' }
  );
  const [slotB, setSlotB] = useState<MediaItemType>(
    media && media.length > 1
      ? { ...media[1], animation: animationClasses[1] }
      : { type: 'image', src: '', animation: '' }
  );

  useEffect(() => {
    // Conditional logic is now inside the effect, which is allowed.
    if (!media || media.length < 2) return;

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
  if (!media || media.length === 0) {
    return <div className={styles.container}>No media to display.</div>;
  }

  if (media.length === 1) {
    return (
      <div className={styles.container}>
        <MediaItem item={media[0]} isVisible={true} />
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