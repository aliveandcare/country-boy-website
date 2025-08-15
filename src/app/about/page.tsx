import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from './about.module.css';

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.banner}>
          <Image 
            src="/stripe.jpg"
            alt="A beautifully cut lawn with striped patterns"
            fill
            className={styles.bannerImage}
            priority
          />
          <h1 className={styles.title}>More Than a Business — It&apos;s a Mission for a Fresh Start</h1>
        </section>

        <section className={styles.contentSection}>
          <div className={styles.imageContainer}>
            <Image 
              src="/field.jpg" 
              alt="The Country Boy team at work"
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className={styles.textContainer}>
            <p>At Country Boy, we are a professional handyman and construction service dedicated to providing high-quality craftsmanship to our community. From home repairs and painting to landscaping and full remodels, we approach every job with skill, integrity, and a commitment to excellence.</p>
            <p>Our commitment to our mission is matched only by our commitment to our craft. We believe that doing good work and being good people go hand-in-hand. You can expect professionalism, integrity, and a high-quality result on every project, big or small.</p>
          </div>
        </section>

        <section className={styles.contentSection}>
           <div className={styles.textContainer}>
            <p>But our work goes deeper than just the services we provide. Country Boy is a proud extension of <a href="https://crossstylecenter.org" target="_blank" rel="noopener noreferrer">Cross Style Life Recovery</a>, a non-profit church and life recovery center based right here in Lebanon, TN.</p>
            <p>When you choose Country Boy for your project, you&apos;re doing more than just hiring a contractor—you are directly participating in this mission of transformation. Every project we complete helps fund the vital work of Cross Style and provides real-world experience and a steady hand-up for men committed to positive change.</p>
          </div>
           <div className={styles.imageContainer}>
             <Image 
              src="/logo.jpg" // Replace with a photo of the center or their logo
              alt="Cross Style Life Recovery Center"
              fill
              style={{ objectFit: 'contain', padding: '2rem' }}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}