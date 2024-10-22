import './subscription.css'; // Use the subscription page styling

const SubscriptionPage = () => {
  const subscriptions = [
    { service: 'Netflix', price: '$15', nextBilling: '2024-11-01' },
    { service: 'Amazon Prime', price: '$12', nextBilling: '2024-11-15' },
    { service: 'Disney+', price: '$10', nextBilling: '2024-11-20' },
  ];

  return (
    <div className="subscription-page">
      {/* Header Section */}
      <div className="subscription-header">
        <div className="left">
          <h1>Your Subscriptions</h1>
          <h3>Manage all your active subscriptions in one place</h3>
        </div>
      </div>

      {/* Active Subscriptions Section */}
      <div className="subscriptions-section">
        <h2>Active Subscriptions</h2>
        <div className="subscriptions-list">
          {subscriptions.map((sub) => (
            <div key={sub.service} className="subscription-item">
              <p><strong>Service:</strong> {sub.service}</p>
              <p><strong>Price:</strong> {sub.price}</p>
              <p><strong>Next Billing Date:</strong> {sub.nextBilling}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Billing Cycle Timeline */}
      <div className="billing-cycle-section">
        <h2>Billing Cycle Timeline</h2>
        <div className="timeline">
          {subscriptions.map((sub) => (
            <div key={sub.service} className="timeline-item">
              <div className="timeline-content">
                <p><strong>{sub.service}</strong></p>
                <p>{sub.nextBilling}</p>
                <span className="timeline-dot"></span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PayU Test UPI Simulation */}
      <div className="payu-section">
        <h2>PayU Test UPI ID</h2>
        <p>For simulative demonstration of upcoming payments:</p>
        <p><strong>UPI ID:</strong> test@payu</p>
      </div>
    </div>
  );
};

export default SubscriptionPage;
