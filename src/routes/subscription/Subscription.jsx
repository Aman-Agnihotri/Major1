import './subscription.css';
import 'chartjs-adapter-date-fns';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, TimeScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { gsap } from "gsap";
import { useEffect, useState, useMemo } from 'react';
import { useAuth } from "@clerk/clerk-react";
import { hasUpiId, saveUpiId } from '../../utils/upiStorage';
import UpiDialog from '../../components/UpiDialog';

ChartJS.register(TimeScale, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SubscriptionPage = () => {
  const { userId } = useAuth();
  const [showUpiDialog, setShowUpiDialog] = useState(false);
  const [subscriptions] = useState([
    { service: 'Netflix', price: '₹649', nextBilling: '2024-12-15' },
    { service: 'Amazon Prime', price: '₹1499', nextBilling: '2025-02-15' }, 
    { service: 'Disney+', price: '₹1449', nextBilling: '2025-02-20' }, 
    { service: 'Spotify', price: '₹66', nextBilling: '2024-12-21' }, 
    { service: 'YouTube Premium', price: '₹199', nextBilling: '2024-12-27' }, 
  ]);
  const sortedSubscriptions = useMemo(() => {
    return [...subscriptions].sort((a, b) => new Date(a.nextBilling) - new Date(b.nextBilling));
  }, [subscriptions]);

  useEffect(() => {
    if (userId && !hasUpiId(userId)) {
      setShowUpiDialog(true);
    }
  }, [userId]);

  const handleUpiSubmit = (upiId) => {
    saveUpiId(userId, upiId);
    setShowUpiDialog(false);

    // Start animations after the UPI dialog processing is complete
    gsap.fromTo(
      '.subscriptions-section',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.3, ease: 'power2.inOut' }
    );

    gsap.fromTo(
      '.billing-cycle-section',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: 'power2.inOut' }
    );
  };

  // Convert nextBilling dates into a format suitable for Chart.js
  const labels = sortedSubscriptions.map(sub => sub.nextBilling);
  const data = {
    labels,
    datasets: [
      {
        label: 'Subscription Billing Cycle',
        data: sortedSubscriptions.map((sub) => parseFloat(sub.price.replace('₹', ''))),
        borderColor: 'rgba(138, 43, 226, 1)',
        backgroundColor: 'rgba(138, 43, 226, 0.5)',
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
        type: 'time',
        time: {
          parser: 'yyyy-MM-dd',
          unit: 'month',
          displayFormats: {
            month: 'MMM yyyy',
          },
        },
        ticks: {
          color: '#fff',
        },
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: '#fff',
        },
      },
    },
  };

  return (
    <>
      {showUpiDialog && (
        <UpiDialog
          onClose={() => setShowUpiDialog(false)}
          onSubmit={handleUpiSubmit}
        />
      )}
      <div className={`subscription-page ${showUpiDialog ? 'blurred' : ''}`}>
        <div className="subscription-header">
          <div className="left">
            <h1 className="animate-text">Your Subscriptions</h1>
            <h3 className="animate-text2">Manage all your active subscriptions in one place</h3>
          </div>
        </div>
        {!showUpiDialog && (
          <>
            <div className="subscriptions-section">
              <h2>Active Subscriptions</h2>
              <div className="subscriptions-list">
                {sortedSubscriptions.map((sub) => (
                  <div key={sub.service} className="subscription-item">
                    <p><strong>Service:</strong> {sub.service}</p>
                    <p><strong>Price:</strong> {sub.price}</p>
                    <p><strong>Next Billing Date:</strong> {sub.nextBilling}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="billing-cycle-section">
              <h2>Billing Cycle Timeline</h2>
              <div className="chart-container">
                <Line data={data} options={options} />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SubscriptionPage;