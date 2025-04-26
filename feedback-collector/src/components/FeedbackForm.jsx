import { useEffect, useRef, useState } from 'react';
import './FeedbackForm.css';

export default function FeedbackForm({ onSubmitSuccess }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const formRef = useRef(null);



  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    if (!firstName || !lastName || !email || !message) {
      setError('All fields are required');
      setLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('https://feedback-collector-f0z4.onrender.com/submit-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: `${firstName} ${lastName}`, 
          firstName, 
          lastName,
          email, 
          message, 
          timestamp: new Date().toISOString() 
        }),
      });

      if (response.ok) {
        setFirstName('');
        setLastName("")
        setEmail('');
        setMessage('');
        setSuccess(true);
        onSubmitSuccess();
        
        
        // Reset success message after 3 seconds
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError('Failed to submit feedback. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div ref={formRef} className="form-container">
      <h2 className="form-title">Share Your Thoughts</h2>
      <p className="form-description">We value your feedback to help us improve</p>
      
      {error && (
        <div className="message error-message">
          <svg className="message-icon" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M13,17h-2v-2h2V17z M13,13h-2V7h2V13z"/>
          </svg>
          {error}
        </div>
      )}
      
      {success && (
        <div className="message success-message">
          <svg className="message-icon" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M10,17l-5-5l1.41-1.41L10,14.17l7.59-7.59L19,8l-9,9z"/>
          </svg>
          Thank you! Your feedback has been submitted successfully.
        </div>
      )}
      
      <form className="feedback-form" onSubmit={handleSubmit}>
      <div className="name-fields">
  <div className="input-group">
    <label htmlFor="firstName" className="input-label">First Name</label>
    <input
      id="firstName"
      type="text"
      placeholder="John"
      value={firstName}
      onChange={(e) => setFirstName(e.target.value)}
      className="form-input"
    />
  </div>
  <div className="input-group">
    <label htmlFor="lastName" className="input-label">Last Name</label>
    <input
      id="lastName"
      type="text"
      placeholder="Doe"
      value={lastName}
      onChange={(e) => setLastName(e.target.value)}
      className="form-input"
    />
  </div>
</div>
        
        <div className="input-group">
          <label htmlFor="email" className="input-label">Email Address</label>
          <input
            id="email"
            type="email"
            placeholder="Vivek@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="message" className="input-label">Your Feedback</label>
          <textarea
            id="message"
            placeholder="Share your thoughts with us..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="form-input form-textarea"
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="submit-button"
        >
          {loading ? (
            <>
              <svg className="spinner" viewBox="0 0 50 50">
                <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" strokeWidth="5"></circle>
              </svg>
              Submitting...
            </>
          ) : (
            'Submit Feedback'
          )}
        </button>
      </form>
    </div>
  );
}
