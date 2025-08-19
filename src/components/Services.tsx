import React from 'react';
import styles from './Services.module.css';
import { FaPaintBrush, FaWrench, FaTree, FaPlug, FaRoad, FaHammer } from 'react-icons/fa';

const services = [
  {
    icon: <FaHammer />,
    title: 'General Repairs',
    description: 'From leaky faucets to drywall patches, we handle all the small jobs that make a big difference in your home.',
  },
  {
    icon: <FaPaintBrush />,
    title: 'Painting & Staining',
    description: 'Professional interior and exterior painting services to give your space a fresh, new look.',
  },
  {
    icon: <FaPlug />,
    title: 'Minor Electrical',
    description: 'Safe installation of light fixtures, outlets, ceiling fans, and other minor electrical work.',
  },
  {
    icon: <FaWrench />,
    title: 'Minor Plumbing',
    description: 'We fix leaks, install new fixtures, and handle common plumbing issues with expertise.',
  },
  {
    icon: <FaTree />,
    title: 'Landscaping & Hardscaping',
    description: 'Basic landscaping services including mulching, planting, and building or repairing decks.',
  },
  {
    icon: <FaRoad />,
    title: 'Decks & Driveways',
    description: 'Your new deck or driveway is only a call away.',
  },
];

export default function Services() {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Our Services</h2>
      <div className={styles.grid}>
        {services.map((service) => (
          <div key={service.title} className={styles.card}>
            <div className={styles.icon}>{service.icon}</div>
            <h3 className={styles.title}>{service.title}</h3>
            <p className={styles.description}>{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}