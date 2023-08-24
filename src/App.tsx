import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PaymentLayout from './components/PaymentLayout';
import BillList from './components/BillList';
import CreateBillsButton from './components/CreateBillsButton';
import SearchLayout from './components/SearchLayout';
import NavigationBar from './components/NavigationBar';
import { PendingBill } from './types';
import api from './services/api';
import './App.css';

const App: React.FC = () => {
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);
  const [pendingBills, setPendingBills] = useState<PendingBill[]>([]);
  const [searchResults, setSearchResults] = useState<PendingBill[]>([]);
  const [selectedPendingBill, setSelectedPendingBill] = useState<PendingBill | null>(null);

  const handleClientSelect = (clientId: number) => {
    setSelectedClientId(clientId);
  };

  const handlePendingBillSelect = (pendingBill: PendingBill) => {
    setSelectedPendingBill(pendingBill);
  };

  const handleBillPaid = (paidBill: PendingBill) => {
    setPendingBills((prevBills) => prevBills.filter((bill) => bill.id !== paidBill.id));
  };

  const handleSearchResultSelect = (searchResult: PendingBill) => {
    setSelectedPendingBill(searchResult);
  };

  const handleSearchBillsByCategory = async (category: string) => {
    try {
      const response = await api.get(`/search?category=${category}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching bills by category:', error);
    }
  };

  const fetchPendingBills = async () => {
    try {
      const response = await api.get(`/pending?clientId=${selectedClientId}`);
      setPendingBills(response.data);
    } catch (error) {
      console.error('Error fetching pending bills:', error);
    }
  };

  useEffect(() => {
    fetchPendingBills();
  }, [selectedClientId]);

  const handleCreateBills = async (period: string, category: string) => {
    try {
      await api.post('/bills', { period, category });
      fetchPendingBills();
    } catch (error) {
      console.error('Error creating bills:', error);
    }
  };

  return (
    <div className="App">
      <NavigationBar />
      <h1>Billing App</h1>
      <Routes>
        <Route
          path="/"
          element={
            <PaymentLayout
              onClientSelect={handleClientSelect}
              selectedPendingBill={selectedPendingBill}
              onBillPaid={handleBillPaid}
            />
          }
        />
        <Route
          path="/bills"
          element={
            <BillList
              pendingBills={pendingBills}
              onPendingBillSelect={handlePendingBillSelect}
            />
          }
        />
        <Route
          path="/search"
          element={
            <SearchLayout
              onSearchBills={handleSearchBillsByCategory}
              onSearchResultSelect={handleSearchResultSelect}
              searchResults={searchResults}
            />
          }
        />
        <Route
          path="/create"
          element={<CreateBillsButton onCreateBills={handleCreateBills} />}
        />
        {/* Add other routes here */}
      </Routes>
    </div>
  );
};

export default App;
