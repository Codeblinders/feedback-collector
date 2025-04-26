import { useEffect, useRef, useState } from 'react';
import './FeedbackList.css';

function FeedbackList({ feedbacks, loading }) {
  const listRef = useRef([]);
  const [expandedId, setExpandedId] = useState(null);
  const containerRef = useRef(null);



  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading feedback...</p>
      </div>
    );
  }

  if (feedbacks.length === 0) {
    return (
      <div className="empty-state">
        <svg className="empty-icon" viewBox="0 0 24 24">
          <path fill="currentColor" d="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2,2,6.5,2,12A10,10,0,0,0,12,22A10,10,0,0,0,22,12A10,10,0,0,0,12,2M12,20A8,8,0,0,1,4,12A8,8,0,0,1,12,4A8,8,0,0,1,20,12A8,8,0,0,1,12,20Z"/>
        </svg>
        <p>No feedback submitted yet</p>
        <p className="empty-subtext">Be the first to share your thoughts!</p>
      </div>
    );
  }

  return (
    <div className="feedback-list-container" ref={containerRef}>
      {feedbacks.map((feedback, index) => (
        <div
          key={feedback._id || index}
          ref={(el) => (listRef.current[index] = el)}
          className={`feedback-card ${expandedId === index ? 'expanded' : ''}`}
          onClick={() => setExpandedId(expandedId === index ? null : index)}
          aria-expanded={expandedId === index}
        >
          <div className="card-content">
            <div className="card-header">
              <h3 className="user-name">{feedback.name}</h3>
              <span className="user-email">{feedback.email}</span>
            </div>
            
            <div className="details-container">
              <div className="message-container">
                <p className="feedback-message">{feedback.message}</p>
              </div>
              <p className="timestamp">
                <svg className="timestamp-icon" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z"/>
                </svg>
                {new Date(feedback.timestamp).toLocaleString()}
              </p>
            </div>
            
            <div className="expand-indicator">
              <svg className="expand-icon" viewBox="0 0 24 24">
                <path fill="currentColor" d={expandedId === index ? "M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z" : "M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"}/>
              </svg>
              {expandedId === index ? 'Collapse' : 'Expand'}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FeedbackList;
