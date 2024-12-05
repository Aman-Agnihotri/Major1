// src/routes/billAlerts/alerts.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { messaging, getToken, db } from '../../utils/firebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import './alerts.css';

const Alerts = () => {
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();
  const [preferences, setPreferences] = useState({
    email: true,
    push: false,
    weekBefore: true,
    threeDaysBefore: true,
    dayBefore: true,
    fcmToken: null
  });
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (isLoaded && !userId) {
      navigate('/sign-in');
    }
  }, [isLoaded, userId, navigate]);

  useEffect(() => {
    const fetchPreferences = async () => {
      if (userId) {
        const docRef = doc(db, 'notificationPreferences', userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPreferences(docSnap.data());
        }
      }
    };
    fetchPreferences();
  }, [userId]);

  useEffect(() => {
    const requestNotificationPermission = async () => {
      try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          const token = await getToken(messaging, {
            vapidKey: 'g6SIdvCFEUgHH9hSp_b66qX_IdaaY2ml2Jym5tSp3lo'
          });
          setPreferences(prev => ({ ...prev, fcmToken: token }));
        }
      } catch (error) {
        console.error('Error getting notification permission:', error);
      }
    };

    if (preferences.push) {
      requestNotificationPermission();
    }
  }, [preferences.push]);

  const handlePreferenceChange = async (e) => {
    const { name, checked } = e.target;
    const newPreferences = { ...preferences, [name]: checked };
    setPreferences(newPreferences);

    try {
      await setDoc(doc(db, 'notificationPreferences', userId), newPreferences);
      setStatus('Preferences saved successfully!');
      setTimeout(() => setStatus(''), 3000);
    } catch (error) {
      console.error('Error saving preferences:', error);
      setStatus('Error saving preferences. Please try again.');
    }
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="alerts-container">
      <h1>Notification Preferences</h1>
      <div className="preferences-form">
        <div className="preference-group">
          <h2>Notification Methods</h2>
          <label>
            <input
              type="checkbox"
              name="email"
              checked={preferences.email}
              onChange={handlePreferenceChange}
            />
            Email Notifications
          </label>
          <label>
            <input
              type="checkbox"
              name="push"
              checked={preferences.push}
              onChange={handlePreferenceChange}
            />
            Push Notifications
          </label>
        </div>

        <div className="preference-group">
          <h2>Notification Timing</h2>
          <label>
            <input
              type="checkbox"
              name="weekBefore"
              checked={preferences.weekBefore}
              onChange={handlePreferenceChange}
            />
            1 Week Before Due Date
          </label>
          <label>
            <input
              type="checkbox"
              name="threeDaysBefore"
              checked={preferences.threeDaysBefore}
              onChange={handlePreferenceChange}
            />
            3 Days Before Due Date
          </label>
          <label>
            <input
              type="checkbox"
              name="dayBefore"
              checked={preferences.dayBefore}
              onChange={handlePreferenceChange}
            />
            1 Day Before Due Date
          </label>
        </div>

        {status && <div className="status-message">{status}</div>}
      </div>
    </div>
  );
};

export default Alerts;