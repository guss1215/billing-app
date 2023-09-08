import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { makePayment } from '../redux/paymentHistorySlice';
import { PendingBill } from '../types';
import api from '../services/api';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for styling

import './PaymentForm.css';

interface PaymentFormProps {
    clientId: number | null;
    pendingBill: PendingBill;
    onBillPaid: (paidBill: PendingBill) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ clientId, pendingBill, onBillPaid }) => {
    const dispatch = useDispatch();
    const [isPaymentInProgress, setPaymentInProgress] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    const handlePayment = async () => {
        setShowConfirmationModal(true); // Show the confirmation modal
    };

    const confirmPayment = async () => {
        try {
            setPaymentInProgress(true);

            const paymentData = {
                clientId,
                category: pendingBill.category,
                period: pendingBill.period.toString(),
            };

            // Make API call to update payment status
            await api.post('/pay', paymentData);

            // Dispatch the makePayment action
            dispatch(makePayment(pendingBill));

            // Notify the parent component that the bill has been paid
            onBillPaid(pendingBill);

            // Show a success toast notification
            toast.success('Payment successful!', {
                autoClose: 3000, // Close the toast after 3 seconds
                position: 'top-right', // Position the toast at the top-right corner
            });
        } catch (error) {
            // Handle error

            // Show an error toast notification
            toast.error('An error occurred during payment.', {
                autoClose: 3000,
                position: 'top-right',
            });
        } finally {
            setPaymentInProgress(false);
            setShowConfirmationModal(false); // Close the confirmation modal
        }
    };

    const cancelPayment = () => {
        setShowConfirmationModal(false); // Close the confirmation modal
    };

    return (
        <div className='payment-form'>
            <h3>Payment Form</h3>
            <p>Client ID: {clientId}</p>
            <p>Service Type: {pendingBill.category}</p>
            <p>Month-Year: {pendingBill.period}</p>
            <button onClick={handlePayment} disabled={isPaymentInProgress}>
                {isPaymentInProgress ? 'Paying...' : 'Pay'}
            </button>

            {/* Confirmation Modal */}
            {showConfirmationModal && (
                <div className='confirmation-modal'>
                    <p>Are you sure you want to proceed with the payment?</p>
                    <button onClick={confirmPayment}>Confirm</button>
                    <button onClick={cancelPayment} className="cancel">Cancel</button>
                </div>
            )}

            {/* Toast container */}
            <ToastContainer />
        </div>
    );
};

export default PaymentForm;
