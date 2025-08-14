'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import styles from './dashboard.module.css';
import Modal from '@/components/Modal';
import AddJobForm from '@/components/AddJobForm';

interface Job {
  id: string;
  clientName: string;
  address: string;
  description: string;
  status: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push('/portal');
      } else {
        setUser(currentUser);
      }
    });
    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, 'jobs'), orderBy('clientName'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const jobsData: Job[] = [];
      querySnapshot.forEach((doc) => {
        jobsData.push({ id: doc.id, ...doc.data() } as Job);
      });
      setJobs(jobsData);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, [user]);

  const handleSignOut = async () => {
    await signOut(auth);
  };

  if (isLoading) {
    return <div className={styles.loading}>Loading Dashboard...</div>;
  }

  return (
    <>
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.header}>
            <div>
              <h1 className={styles.title}>Dashboard</h1>
              <p className={styles.email}>Signed in as: {user?.email}</p>
            </div>
            <button onClick={handleSignOut} className={styles.button}>
              Sign Out
            </button>
          </div>
          <hr className={styles.divider} />
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Current Jobs</h2>
            <button onClick={() => setIsAddModalOpen(true)} className={styles.newJobButton}>
              + New Job
            </button>
          </div>
          <div className={styles.jobList}>
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <Link href={`/dashboard/jobs/${job.id}`} key={job.id} className={styles.jobCardLink}>
                  <div className={styles.jobCard}>
                    <div>
                      <h3 className={styles.jobTitle}>{job.clientName}</h3>
                      <p className={styles.jobAddress}>{job.address}</p>
                    </div>
                    <div className={`${styles.jobStatus} ${styles[job.status.replace(/\s+/g, '')]}`}>
                      {job.status}
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p>No jobs found. Click &quot;+ New Job&quot; to add one.</p>
            )}
          </div>
        </div>
      </div>
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
        <AddJobForm onClose={() => setIsAddModalOpen(false)} />
      </Modal>
    </>
  );
}