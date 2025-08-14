'use client';
import React, { useState } from 'react';
import styles from './QuoteForm.module.css';

export default function QuoteForm() {
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Sending...');

    const formData = new FormData(e.target as HTMLFormElement);

    try {
      const response = await fetch('/api/send-quote', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setStatus('Your request has been sent successfully!');
        (e.target as HTMLFormElement).reset();
      } else {
        const errorData = await response.json();
        setStatus(`Error: ${errorData.message}`);
      }
    } catch (error) {
      setStatus('An error occurred. Please try again.');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3 className={styles.title}>Request a Free Quote</h3>
      <p className={styles.subtitle}>Tell us about your project. We&apos;ll get back to you within 24 hours.</p>

      <div className={styles.inputGroup}>
        <label htmlFor="name">Full Name</label>
        <input type="text" id="name" name="name" required />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="email">Email Address</label>
        <input type="email" id="email" name="email" required />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="phone">Phone Number</label>
        <input type="tel" id="phone" name="phone" required />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="description">Project Description</label>
        <textarea id="description" name="description" rows={5} required />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="files">Upload Photos (Optional)</label>
        <input type="file" id="files" name="attachment" multiple />
      </div>

      <button type="submit" className={styles.submitButton} disabled={status === 'Sending...'}>
        {status === 'Sending...' ? 'Sending...' : 'Send Request'}
      </button>

      {status && <p className={styles.statusMessage}>{status}</p>}
    </form>
  );
}