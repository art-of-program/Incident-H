import React, { useState } from 'react';
import '../../styles/PaymentStyles.css';

function PremiumModal({ onClose, onSuccess }) {
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate payment processing
    setTimeout(() => {
      onSuccess();
    }, 1500);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Upgrade to Premium</h2>
        <p>Unlock unlimited messages for just $5/month!</p>
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Card Number"
            value={paymentDetails.cardNumber}
            onChange={(e) => setPaymentDetails({
              ...paymentDetails,
              cardNumber: e.target.value
            })}
          />
          <div className="card-details">
            <input
              type="text"
              placeholder="MM/YY"
              value={paymentDetails.expiry}
              onChange={(e) => setPaymentDetails({
                ...paymentDetails,
                expiry: e.target.value
              })}
            />
            <input
              type="text"
              placeholder="CVV"
              value={paymentDetails.cvv}
              onChange={(e) => setPaymentDetails({
                ...paymentDetails,
                cvv: e.target.value
              })}
            />
          </div>
          <div className="modal-buttons">
            <button type="submit">Pay Now</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PremiumModal;