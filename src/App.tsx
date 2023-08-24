import React, { useState, useEffect } from 'react';
import PaymentHistory from './components/PaymentHistory';
import PaymentForm from './components/PaymentForm';
import BillList from './components/BillList';
import CreateBillsButton from './components/CreateBillsButton';
import SearchBillsByCategory from './components/SearchBillsByCategory';
import SearchResultsList from './components/SearchResultsList';
import { PendingBill } from './types';
import api from './services/api';

const App: React.FC = () => {
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);
  const [selectedPendingBill, setSelectedPendingBill] = useState<PendingBill | null>(null);
  const [pendingBills, setPendingBills] = useState<PendingBill[]>([]);
  const [searchResults, setSearchResults] = useState<PendingBill[]>([]);


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

  const handleSearchBillsByCategory = async (category: string) => {
    try {
      const response = await api.get(`/search?category=${category}`);
      setSearchResults(response.data); // Set the search results state
    } catch (error) {
      // Handle error
      console.error('Error searching bills by category:', error);
    }
  };

  const handleSearchResultSelect = (searchResult: PendingBill) => {
    setSelectedPendingBill(searchResult);
  };


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

  useEffect(() => {
    fetchPendingBills();
  }, [selectedClientId]);

  const handleCreateBills = async (period: string, category: string) => {
    try {
      await api.post('/bills', { period, category });
      fetchPendingBills(); // Fetch updated list of pending bills
    } catch (error) {
      console.error('Error creating bills:', error);
    }
  };

  return (
    <div className="App">
      <h1>Billing App</h1>
      <PaymentHistory onClientSelect={handleClientSelect} />
      <BillList pendingBills={pendingBills} onPendingBillSelect={handlePendingBillSelect} />
      <SearchBillsByCategory onSearchBills={handleSearchBillsByCategory} />
      <SearchResultsList searchResults={searchResults} onSearchResultSelect={handleSearchResultSelect} />
      <CreateBillsButton onCreateBills={handleCreateBills} />
      {selectedClientId && selectedPendingBill && (
        <PaymentForm
          clientId={selectedClientId}
          pendingBill={selectedPendingBill}
          onBillPaid={handleBillPaid}
        />
      )}
    </div>
  );
};

export default App;
