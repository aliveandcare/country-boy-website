'use client';

import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import styles from './AddJobForm.module.css';

interface AddJobFormProps {
  onClose: () => void;
}

export default function AddJobForm({ onClose }: AddJobFormProps) {
  const [clientName, setClientName] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Not Started');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await addDoc(collection(db, 'jobs'), {
        clientName,
        address,
        description,
        status,
      });
      onClose();
    } catch (err) {
      setError('Failed to add job. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3 className={styles.title}>Add New Job</h3>
      <div className={styles.inputGroup}>
        <label htmlFor="clientName">Client Name</label>
        <input type="text" id="clientName" value={clientName} onChange={(e) => setClientName(e.target.value)} required />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="address">Address</label>
        <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} required />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="description">Job Description</label>
        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={4} required />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="status">Status</label>
        <select id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      {error && <p className={styles.error}>{error}</p>}
      <button type="submit" className={styles.submitButton} disabled={isLoading}>
        {isLoading ? 'Saving...' : 'Save Job'}
      </button>
    </form>
  );
}