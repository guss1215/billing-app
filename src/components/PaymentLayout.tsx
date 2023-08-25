import React, { useState, useEffect } from 'react';
import BillList from './BillList'; // Import BillList component
import PaymentForm from './PaymentForm';
import { PendingBill } from '../types';
import api from '../services/api';
import './PaymentLayout.css';

interface PaymentLayoutProps {
    selectedClientId: number | null;
    onClientSelect: (clientId: number) => void;
    selectedPendingBill: PendingBill | null;
    onBillPaid: (paidBill: PendingBill) => void;
}

const PaymentLayout: React.FC<PaymentLayoutProps> = ({
    selectedClientId,
    onClientSelect,
    selectedPendingBill,
    onBillPaid,
}) => {
    const [pendingBills, setPendingBills] = useState<PendingBill[]>([]);
    const [selectedBill, setSelectedBill] = useState<PendingBill | null>(null);

    const handleBillPaid = (paidBill: PendingBill) => {
        setPendingBills((prevBills) => prevBills.filter((bill) => bill.id !== paidBill.id));
    };

    const fetchPendingBills = async () => {
        if (selectedClientId !== null) {
            try {
                const response = await api.get(`/pending?clientId=${selectedClientId}`);
                setPendingBills(response.data);
            } catch (error) {
                console.error('Error fetching pending bills:', error);
            }
        }
    };

    // Fetch pending bills based on selected client
    useEffect(() => {
        fetchPendingBills();
    }, [selectedClientId]);

    // Handle selecting a client
    const handleClientSelection = (clientId: number) => {
        onClientSelect(clientId); // Call the provided onClientSelect function
    };

    const handlePendingBillSelect = (bill: PendingBill) => {
        setSelectedBill(bill); // Set the selected bill
    };

    return (
        <div className="payment-layout">
            <BillList
                pendingBills={pendingBills}
                onPendingBillSelect={handlePendingBillSelect}
            />
            {selectedBill !== null && (
                <PaymentForm
                    clientId={selectedClientId}
                    pendingBill={selectedBill}
                    onBillPaid={handleBillPaid}
                />
            )}
        </div>
    );
};

export default PaymentLayout;
