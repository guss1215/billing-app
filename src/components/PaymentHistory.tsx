import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setClientId, setPaymentHistory } from '../redux/paymentHistorySlice';
import { PaymentHistoryEntry } from '../types';
import api from '../services/api';

interface PaymentHistoryProps {
  onClientSelect: (clientId: number) => void; // Define the onClientSelect prop
}

const PaymentHistory: React.FC<PaymentHistoryProps> = ({ onClientSelect }) => {
  const dispatch = useDispatch();
  const paymentHistory: PaymentHistoryEntry[] = useSelector(
    (state: RootState) => state.paymentHistory.paymentHistory
  );
  const clientId: number | null = useSelector(
    (state: RootState) => state.paymentHistory.clientId
  );

  const handleFetchPaymentHistory = async () => {
    if (clientId !== null) {
      try {
        const response = await api.get(`/payment-history?clientId=${clientId}`);
        dispatch(setPaymentHistory(response.data));
      } catch (error) {
        // Handle error
      }
    }
  };

  /*useEffect(() => {
    handleFetchPaymentHistory();
  }, [paymentHistory]);*/

  // Call the onClientSelect callback when a client is selected
  const handleClientSelect = (selectedClientId: number) => {
    onClientSelect(selectedClientId);
    dispatch(setClientId(selectedClientId));
  };

  return (
    <div>
      <h2>Payment History</h2>
      <input
        type="input"
        placeholder="Enter Client ID"
        value={clientId || ''}
        onChange={(e) => handleClientSelect(parseInt(e.target.value))}
      />
      <button onClick={handleFetchPaymentHistory}>Fetch Payment History</button>
      <ul>
        {paymentHistory.map((bill) => (
          <li key={bill.id}>
            Client ID: {bill.clientId}, Category: {bill.category}, Period: {bill.period}, Status: {bill.paymentStatus}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PaymentHistory;
