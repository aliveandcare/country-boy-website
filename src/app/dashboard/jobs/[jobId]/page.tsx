'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { doc, onSnapshot } from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import styles from './jobDetail.module.css';
import Modal from '@/components/Modal';
import AddExpenseForm from '@/components/AddExpenseForm';

interface Job {
  clientName: string;
  address: string;
  description: string;
  status: string;
}

export default function JobDetailPage() {
  const router = useRouter();
  const params = useParams();
  const jobId = params.jobId as string;

  const [job, setJob] = useState<Job | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) setUser(currentUser); else router.push('/portal');
    });
  }, [router]);

  useEffect(() => {
    if (!user || !jobId) return;
    const unsubscribe = onSnapshot(doc(db, 'jobs', jobId), (docSnap) => {
      if (docSnap.exists()) setJob(docSnap.data() as Job); else console.error("No such document!");
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, [user, jobId]);

  
  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    
  };

  if (isLoading) return <div className={styles.loading}>Loading Job Details...</div>;
  if (!job) return <div className={styles.loading}>Job not found.</div>;

  return (
    <>
      <div className={styles.page}>
        <div className={styles.container}>
          <Link href="/dashboard" className={styles.backLink}>&larr; Back to Dashboard</Link>
          <div className={styles.header}>
            <div>
              <h1 className={styles.clientName}>{job.clientName}</h1>
              <p className={styles.address}>{job.address}</p>
            </div>
          </div>
          <hr className={styles.divider} />
          <div className={styles.details}>
            <h2>Job Description</h2>
            <p>{job.description}</p>
          </div>
          <hr className={styles.divider} />
          <div className={styles.expensesSection}>
            <div className={styles.expensesHeader}>
              <h2>Expenses</h2>
              <button onClick={() => setIsExpenseModalOpen(true)} className={styles.addButton}>+ Add Expense</button>
            </div>
            <p>Expense list will go here.</p>
          </div>
        </div>
      </div>
      <Modal isOpen={isExpenseModalOpen} onClose={() => setIsExpenseModalOpen(false)}>
        <AddExpenseForm jobId={jobId} onClose={() => setIsExpenseModalOpen(false)} />
      </Modal>
    </>
  );
}