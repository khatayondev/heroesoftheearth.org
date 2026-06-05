'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';
import styles from './ContactForm.module.css';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const program = params.get('program');
      const paramSubject = params.get('subject');

      if (program) {
        setSubject('School Programs');
        setMessage(`Hi! I am interested in registering for the "${program}" program. Please send me more details on how to get started.`);
      } else if (paramSubject) {
        const validSubjects = ['General Inquiry', 'School Programs', 'Partnership', 'Book Purchase', 'Youth Challenges'];
        if (validSubjects.includes(paramSubject)) {
          setSubject(paramSubject);
        }
      }
    }
  }, []);
  
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setStatus('submitting');
    
    // Fallback to a beautiful simulated successful submit if no key is present
    if (!accessKey) {
      setTimeout(() => {
        setStatus('success');
        setStatusMessage('Thank you! Your message has been successfully sent (Simulated Mode).');
        setName('');
        setEmail('');
        setMessage('');
      }, 1500);
      return;
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          name,
          email,
          subject: `[Heroes of the Earth Contact] - ${subject}`,
          message,
        }),
      });

      const result = await response.json();
      if (response.status === 200) {
        setStatus('success');
        setStatusMessage('Thank you! Your message has been received. We will get back to you shortly.');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setStatus('error');
        setStatusMessage(result.message || 'Something went wrong. Please try again later.');
      }
    } catch (error) {
      console.error('Contact Form Submit Error:', error);
      setStatus('error');
      setStatusMessage('Network error. Please check your connection and try again.');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Get in Touch</h2>
      <p className={styles.subtitle}>
        Define your goals and explore how Heroes of the Earth can collaborate for our planet.
      </p>

      {status === 'success' && (
        <div className={styles.successMsg}>
          <CheckCircle size={32} className={styles.successIcon} />
          <span>{statusMessage}</span>
          <button className={styles.resetBtn} onClick={() => setStatus('idle')}>
            Send another message
          </button>
        </div>
      )}

      {status === 'error' && (
        <div className={styles.errorMsg}>
          <AlertTriangle size={32} className={styles.errorIcon} />
          <span>{statusMessage}</span>
          <button className={styles.resetBtn} onClick={() => setStatus('idle')}>
            Try Again
          </button>
        </div>
      )}

      {status !== 'success' && status !== 'error' && (
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>Full name</label>
            <input
              type="text"
              id="name"
              className={styles.input}
              placeholder="e.g. Jane Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>Email</label>
            <input
              type="email"
              id="email"
              className={styles.input}
              placeholder="e.g. jane@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="subject" className={styles.label}>Subject</label>
            <select
              id="subject"
              className={styles.select}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            >
              <option value="General Inquiry">General Inquiry</option>
              <option value="School Programs">School & Educator Programs</option>
              <option value="Partnership">Partnership Opportunities</option>
              <option value="Book Purchase">Book Ordering & Licensing</option>
              <option value="Youth Challenges">Youth Engagement / XP System</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="message" className={styles.label}>Message</label>
            <textarea
              id="message"
              className={styles.textarea}
              placeholder="Tell us how we can help you..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={status === 'submitting'}
            className={styles.submitBtn}
          >
            <span>{status === 'submitting' ? 'Sending...' : 'Send a message'}</span>
            <ArrowRight size={18} className={styles.btnIcon} />
          </button>
        </form>
      )}
    </div>
  );
}
