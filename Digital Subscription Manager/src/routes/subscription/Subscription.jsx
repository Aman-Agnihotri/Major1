import './subscription.css';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SubscriptionPage = () => {
  const subscriptions = [
    { service: 'Netflix', price: '$15', nextBilling: '2024-11-01' },
    { service: 'Amazon Prime', price: '$12', nextBilling: '2024-11-15' },
    { service: 'Disney+', price: '$10', nextBilling: '2024-11-20' },
  ];

  // Convert nextBilling dates into a format suitable for Chart.js
  const labels = subscriptions.map(sub => sub.nextBilling);
  const data = {
    labels,
    datasets: [
      {
        label: 'Subscription Billing Cycle',
        data: subscriptions.map(sub => parseFloat(sub.price.replace('$', ''))),
        borderColor: 'rgba(138, 43, 226, 1)', // Purple color for the line
        backgroundColor: 'rgba(138, 43, 226, 0.5)', // Light purple for the points
        pointBackgroundColor: 'rgba(138, 43, 226, 1)',
        pointBorderColor: '#fff',
        pointRadius: 6,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Upcoming Billing Cycle',
        color: '#fff',
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#fff', // White color for x-axis labels
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: '#fff', // White color for y-axis labels
        },
      },
    },
  };

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

      {/* Billing Cycle Chart Section */}
      <div className="billing-cycle-section">
        <h2>Billing Cycle Timeline</h2>
        <div className="chart-container">
          <Line data={data} options={options} />
        </div>
      </div>

      {/* PayU Test UPI Simulation */}
      <div className="payu-section">
        <h2>PayU Test UPI ID</h2>
        <p>For simulative demonstration of upcoming payments:</p>
        <p><strong>UPI ID:</strong> anything@payu</p>
      </div>
    </div>
  );
};

export default SubscriptionPage;
