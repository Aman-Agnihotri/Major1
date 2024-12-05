const UPI_KEY = 'user_upi_id';

export const saveUpiId = (userId, upiId) => {
  const upiData = JSON.parse(localStorage.getItem(UPI_KEY) || '{}');
  upiData[userId] = upiId;
  localStorage.setItem(UPI_KEY, JSON.stringify(upiData));
};

export const getUpiId = (userId) => {
  const upiData = JSON.parse(localStorage.getItem(UPI_KEY) || '{}');
  return upiData[userId] || null;
};

export const hasUpiId = (userId) => {
  return !!getUpiId(userId);
};

export const clearUpiId = (userId) => {
  const upiData = JSON.parse(localStorage.getItem(UPI_KEY) || '{}');
  delete upiData[userId];
  localStorage.setItem(UPI_KEY, JSON.stringify(upiData));
};