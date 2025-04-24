function FeedbackList({ feedbacks, loading }) {
    if (loading) {
      return <p className="text-center mt-4">Loading...</p>;
    }
  
    if (feedbacks.length === 0) {
      return <p className="text-center mt-4">No feedback submitted yet.</p>;
    }
  
    return (
      <div className="mt-6 space-y-4">
        {feedbacks.map((feedback, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md">
            <p><strong>Name:</strong> {feedback.name}</p>
            <p><strong>Email:</strong> {feedback.email}</p>
            <p><strong>Message:</strong> {feedback.message}</p>
            <p className="text-sm text-gray-500"><strong>Submitted:</strong> {new Date(feedback.timestamp).toLocaleString()}</p>
          </div>
        ))}
      </div>
    );
  }
  
  export default FeedbackList;