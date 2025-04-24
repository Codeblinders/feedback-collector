import { useState, useEffect } from 'react';
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from './components/FeedbackList';

function App() {
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchFeedbacks = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://your-backend-url/feedbacks');
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

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
      <div className="max-w-2xl w-full px-4">
        <h1 className="text-3xl font-bold text-center mb-6">Feedback Collector</h1>
        <FeedbackForm onSubmitSuccess={fetchFeedbacks} />
        <button
          onClick={() => setShowFeedback(!showFeedback)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          {showFeedback ? 'Hide Feedback' : 'View Submitted Feedback'}
        </button>
        {showFeedback && <FeedbackList feedbacks={feedbacks} loading={loading} />}
        <footer className="mt-8 text-center text-gray-500">
          <p>Created by [Your Full Name] - Feedback Collector Task</p>
        </footer>
      </div>
    </div>
  );
}

export default App;