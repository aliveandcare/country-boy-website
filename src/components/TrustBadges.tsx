import React from 'react';
import styles from './TrustBadges.module.css';
import { FaStar, FaShieldAlt, FaTags, FaThumbsUp } from 'react-icons/fa';

const badges = [
  {
    icon: <FaStar />,
    title: '5-Star Rated',
  },
  {
    icon: <FaShieldAlt />,
    title: 'Insured',
  },
  {
    icon: <FaTags />,
    title: 'Upfront, Fair Pricing',
  },
  {
    icon: <FaThumbsUp />,
    title: 'Satisfaction Guaranteed',
  },
];

export default function TrustBadges() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {badges.map((badge) => (
          <div key={badge.title} className={styles.badge}>
            <div className={styles.icon}>{badge.icon}</div>
            <p className={styles.title}>{badge.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}