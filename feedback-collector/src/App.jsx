import { useEffect, useState, useRef } from 'react';
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from './components/FeedbackList';
import './App.css';

function App() {
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDark);
    
  }, []);

  const fetchFeedbacks = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://feedback-collector-f0z4.onrender.com/feedbacks');
      const data = await response.json();
      setFeedbacks(data);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showFeedback) {
      fetchFeedbacks();
    }
  }, [showFeedback]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={`app-container ${darkMode ? 'dark-mode' : ''}`}>
      <div ref={containerRef} className="content-wrapper">
        <button
          onClick={toggleDarkMode}
          className="theme-toggle"
          aria-label="Toggle dark mode"
        >
          <span className="theme-icon">
            {darkMode ? '☀️' : '🌙'}
          </span>
          <span className="theme-text">
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </span>
        </button>

        <div className="header-section">
          <h1 className="app-title">Feedback Collector</h1>
          <p className="app-subtitle">Share your thoughts with us</p>
        </div>
        
        <FeedbackForm onSubmitSuccess={fetchFeedbacks} />
        
        <button
          onClick={() => setShowFeedback(!showFeedback)}
          className={`toggle-feedback-button ${showFeedback ? 'active' : ''}`}
        >
          {showFeedback ? (
            <>
              <span className="icon">👆</span> Hide Feedback
            </>
          ) : (
            <>
              <span className="icon">👇</span> View Submitted Feedback
            </>
          )}
        </button>
        
        {showFeedback && <FeedbackList feedbacks={feedbacks} loading={loading} />}
        
        <footer className="footer">
          <p>Created by <span className="author">Vivek Yadav</span> - Feedback Collector Task</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
