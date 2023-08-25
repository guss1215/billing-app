import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setClientId, setPaymentHistory } from '../redux/paymentHistorySlice';
import { PaymentHistoryEntry } from '../types';
import api from '../services/api';
import './PaymentHistory.css';

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
    <div className='payment-history'>
      <h2>Payment History</h2>
      <div className='input-button-container'>
        <input
          type="input"
          placeholder="Enter Client ID"
          value={clientId || ''}
          onChange={(e) => handleClientSelect(parseInt(e.target.value))}
        />
        <button onClick={handleFetchPaymentHistory}>Search</button>
      </div>
      <div className='data-row header-row'>
        <div className='data-cell'>Client ID</div>
        <div className='data-cell'>Category</div>
        <div className='data-cell'>Period</div>
        <div className='data-cell'>Status</div>
      </div>
      {paymentHistory.map((bill) => (
        <div className='data-row' key={bill.id}>
          <div className='data-cell'>{bill.clientId}</div>
          <div className='data-cell'>{bill.category}</div>
          <div className='data-cell'>{bill.period}</div>
          <div className='data-cell'>{bill.paymentStatus}</div>
        </div>
      ))}
    </div>
  );
};

export default PaymentHistory;
