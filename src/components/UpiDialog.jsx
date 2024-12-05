import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UpiDialog.css';

const UpiDialog = ({ onClose, onSubmit }) => {
  const [upiId, setUpiId] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic UPI ID validation
    const upiRegex = /^[a-zA-Z0-9.-]{2,256}@[a-zA-Z][a-zA-Z]{2,64}$/;
    if (!upiRegex.test(upiId)) {
      setError('Please enter a valid UPI ID');
      return;
    }

    // Simulate loading time
    setError('Processing...');
    await new Promise(resolve => setTimeout(resolve, 7000));
    setError('');
    
    onSubmit(upiId);
  };

  const handleCancel = () => {
    navigate(-1);
  }

  return (
    <div className="upi-dialog-overlay">
      <div className="upi-dialog">
        <h2>Enter Your UPI ID</h2>
        <p>To manage your subscriptions, we need your UPI ID.</p>
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            placeholder="example@upi"
            className="upi-input"
          />
          {error && <p className="error-message">{error}</p>}
          
          <div className="button-group">
            <button type="button" onClick={handleCancel} className="cancel-button">
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpiDialog;