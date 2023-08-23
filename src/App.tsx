import React, { useState, useEffect } from 'react';
import PaymentHistory from './components/PaymentHistory';
import PaymentForm from './components/PaymentForm';
import BillList from './components/BillList';
import { PendingBill } from './types';
import api from './services/api';

const App: React.FC = () => {
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);
  const [selectedPendingBill, setSelectedPendingBill] = useState<PendingBill | null>(null);
  const [pendingBills, setPendingBills] = useState<PendingBill[]>([]);

  const handleClientSelect = (clientId: number) => {
    setSelectedClientId(clientId);
  };

  const handlePendingBillSelect = (pendingBill: PendingBill) => {
    setSelectedPendingBill(pendingBill);
  };

  const handleBillPaid = (paidBill: PendingBill) => {
    // Update the pendingBills list to remove the paid bill
    setPendingBills((prevBills) => prevBills.filter((bill) => bill.id !== paidBill.id));
  };

  useEffect(() => {
    const fetchPendingBills = async () => {
      try {
        const response = await api.get(`/pending?clientId=${selectedClientId}`);
        console.log('Response from GetPendingBills:', response.data);
        setPendingBills(response.data);
      } catch (error) {
        // Handle error
        console.error('Error fetching pending bills:', error);
      }
    };

    fetchPendingBills();
  }, [selectedClientId]);

  return (
    <div className="App">
      <h1>Billing App</h1>
      <PaymentHistory onClientSelect={handleClientSelect} />
      {selectedClientId && selectedPendingBill && (
        <PaymentForm
          clientId={selectedClientId}
          pendingBill={selectedPendingBill}
          onBillPaid={handleBillPaid}
        />
      )}
      <BillList pendingBills={pendingBills} onPendingBillSelect={handlePendingBillSelect} />
    </div>
  );
};

export default App;
