import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setClientId, setPaymentHistory } from '../redux/paymentHistorySlice';
import { PaymentHistoryEntry } from '../types';
import api from '../services/api';
import './PaymentHistory.css';

enum SortColumn {
  ClientId = 'clientId',
  Category = 'category',
  Period = 'period',
  PaymentStatus = 'paymentStatus',
}

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

  const [sortColumn, setSortColumn] = useState<SortColumn | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

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

  const handleClientSelect = (selectedClientId: number) => {
    onClientSelect(selectedClientId);
    dispatch(setClientId(selectedClientId));
  };

  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedHistory = [...paymentHistory].sort((a, b) => {
    const aValue = sortColumn ? a[sortColumn] : '';
    const bValue = sortColumn ? b[sortColumn] : '';

    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div className='payment-history'>
      <h2>Payment History</h2>
      <div className='input-button-container'>
        <input
          type='input'
          placeholder='Enter Client ID'
          value={clientId || ''}
          onChange={(e) => handleClientSelect(parseInt(e.target.value))}
        />
        <button onClick={handleFetchPaymentHistory}>Search</button>
      </div>
      <div className='data-row header-row'>
        <div
          className={`data-cell ${sortColumn === SortColumn.ClientId ? 'sorted' : ''}`}
          onClick={() => handleSort(SortColumn.ClientId)}
        >
          Client ID
        </div>
        <div
          className={`data-cell ${sortColumn === SortColumn.Category ? 'sorted' : ''}`}
          onClick={() => handleSort(SortColumn.Category)}
        >
          Category
        </div>
        <div
          className={`data-cell ${sortColumn === SortColumn.Period ? 'sorted' : ''}`}
          onClick={() => handleSort(SortColumn.Period)}
        >
          Period
        </div>
        <div
          className={`data-cell ${sortColumn === SortColumn.PaymentStatus ? 'sorted' : ''}`}
          onClick={() => handleSort(SortColumn.PaymentStatus)}
        >
          Status
        </div>
      </div>
      {sortedHistory.map((bill) => (
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
