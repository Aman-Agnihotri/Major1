import './subscription.css';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { gsap } from "gsap";
import { useEffect } from 'react';


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SubscriptionPage = () => {
  const subscriptions = [
    { service: 'Netflix', price: '₹649', nextBilling: '2024-11-01' },
    { service: 'Amazon Prime', price: '₹1499', nextBilling: '2025-11-15' }, 
    { service: 'Disney+', price: '₹1449', nextBilling: '2025-11-20' }, 
    { service: 'Spotify', price: '₹66', nextBilling: '2024-12-01' }, 
    { service: 'YouTube Premium', price: '₹199', nextBilling: '2024-12-10' }, 
  ];

  useEffect(() => {
    gsap.fromTo(
      ".animate-text",
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 1, stagger: 0.3, ease: "Power3.easeInOut" } // Ending values
    );
  }, []);

  useEffect(() => {
    // GSAP stagger animation with adjusted properties
    gsap.fromTo(
      ".animate-text2",
      { opacity: 0, y: 50 }, // Starting values
      { opacity: 1, y: 0, duration: 2.2, stagger: 0.3, ease: "power2.inOut " } // Ending values
    );
  }, []);

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
          <h1 className="animate-text">Your Subscriptions</h1>
          <h3 className="animate-text2" >Manage all your active subscriptions in one place</h3>
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
