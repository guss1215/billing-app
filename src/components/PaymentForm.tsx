import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { makePayment } from '../redux/paymentHistorySlice';
import { PendingBill } from '../types';
import api from '../services/api';
import './PaymentForm.css';

interface PaymentFormProps {
    clientId: number | null;
    pendingBill: PendingBill;
    onBillPaid: (paidBill: PendingBill) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ clientId, pendingBill, onBillPaid }) => {
    const dispatch = useDispatch();
    const [isPaymentInProgress, setPaymentInProgress] = useState(false);

    const handlePayment = async () => {
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

        } catch (error) {
            // Handle error
        } finally {
            setPaymentInProgress(false);
        }
    };

    return (
        <div className= 'payment-form'>
            <h3>Payment Form</h3>
            <p>Client ID: {clientId}</p>
            <p>Service Type: {pendingBill.category}</p>
            <p>Month-Year: {pendingBill.period}</p>
            <button onClick={handlePayment} disabled={isPaymentInProgress}>
                {isPaymentInProgress ? 'Making Payment...' : 'Make Payment'}
            </button>
        </div>
    );
};

export default PaymentForm;
