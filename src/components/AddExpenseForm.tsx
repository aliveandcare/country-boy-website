'use client';

import React, { useState } from 'react';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import styles from './AddJobForm.module.css';

interface AddExpenseFormProps {
  jobId: string;
  onClose: () => void;
}

export default function AddExpenseForm({ jobId, onClose }: AddExpenseFormProps) {
  const [vendor, setVendor] = useState('');
  const [total, setTotal] = useState('');
  const [category, setCategory] = useState('Materials');
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsScanning(true);
    setError('');
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('/api/scan-receipt', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to scan receipt.');

      const data = await response.json();
      setVendor(data.vendor || '');
      setTotal(data.total || '');
      setCategory(data.category || 'Materials');

    } catch (err) {
      setError('Could not read receipt. Please enter details manually.');
      console.error(err);
    } finally {
      setIsScanning(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ vendor, total, category });
    alert('Expense saved! (Functionality to be fully added)');
    onClose();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3 className={styles.title}>Add New Expense</h3>
      <div className={styles.inputGroup}>
        <label htmlFor="receipt">Scan Receipt Image</label>
        <input type="file" id="receipt" name="receipt" accept="image/*" onChange={handleFileChange} />
        {isScanning && <p className={styles.scanningText}>Scanning receipt...</p>}
      </div>
      <hr className={styles.divider} />
      <div className={styles.inputGroup}>
        <label htmlFor="vendor">Vendor / Store</label>
        <input type="text" id="vendor" value={vendor} onChange={(e) => setVendor(e.target.value)} required />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="total">Total Amount ($)</label>
        <input type="number" id="total" value={total} onChange={(e) => setTotal(e.target.value)} required />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="category">Category</label>
        <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Materials">Materials</option>
          <option value="Tools">Tools</option>
          <option value="Fuel">Fuel</option>
          <option value="Other">Other</option>
        </select>
      </div>
      {error && <p className={styles.error}>{error}</p>}
      <button type="submit" className={styles.submitButton} disabled={isScanning}>
        Save Expense
      </button>
    </form>
  );
}