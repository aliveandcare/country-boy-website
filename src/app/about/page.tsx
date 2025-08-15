import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from './about.module.css';

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>More Than a Business — It’s a Mission for a Fresh Start</h1>
          
          <p>At Country Boy, we are a professional handyman and construction service dedicated to providing high-quality craftsmanship to our community. From home repairs and painting to landscaping and full remodels, we approach every job with skill, integrity, and a commitment to excellence.</p>
          
          <p>But our work goes deeper than just the services we provide. Country Boy is a proud extension of <a href="https://crossstylecenter.org" target="_blank" rel="noopener noreferrer">Cross Style Life Recovery</a>, a non-profit church and life recovery center based right here in Lebanon, TN. We were founded on the belief that everyone deserves a second chance. Our business provides more than just a job; it offers a structured, supportive environment for individuals in the recovery program to learn valuable skills, build a new foundation, and take meaningful steps toward rebuilding their lives.</p>
          
          <p>When you choose Country Boy for your project, you're doing more than just hiring a contractor—you are directly participating in this mission of transformation. Every project we complete helps fund the vital work of Cross Style and provides real-world experience and a steady hand-up for men committed to positive change. Your trust in our work fuels self-growth, restores dignity, and strengthens our entire community.</p>
          
          <p>Our commitment to our mission is matched only by our commitment to our craft. We believe that doing good work and being good people go hand-in-hand. You can expect professionalism, integrity, and a high-quality result on every project, big or small.</p>
          
          <p>Thank you for considering Country Boy. Let's work together to bring your vision to life and build a stronger community, one project at a time.</p>

        </div>
      </main>
      <Footer />
    </>
  );
}