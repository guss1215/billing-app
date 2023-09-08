import React, { useState, useEffect } from 'react';
import BillList from './BillList'; // Import BillList component
import PaymentForm from './PaymentForm';
import { PendingBill } from '../types';
import api from '../services/api';
import Modal from 'react-modal'; // Import react-modal
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
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

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
        openModal(); // Open the modal
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="payment-layout">
            <BillList
                pendingBills={pendingBills}
                onPendingBillSelect={handlePendingBillSelect}
            />
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Payment Form Modal"
            >
                {selectedBill && (
                    <PaymentForm
                        clientId={selectedClientId}
                        pendingBill={selectedBill}
                        onBillPaid={(paidBill) => {
                            handleBillPaid(paidBill);
                            closeModal(); // Close the modal after payment
                        }}
                    />
                )}
            </Modal>
        </div>
    );
};

export default PaymentLayout;
