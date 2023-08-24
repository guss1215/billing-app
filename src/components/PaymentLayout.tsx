import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PaymentHistory from './PaymentHistory';
import PaymentForm from './PaymentForm';
import { PendingBill } from '../types';

interface PaymentLayoutProps {
    onClientSelect: (clientId: number) => void;
    selectedPendingBill: PendingBill | null;
    onBillPaid: (paidBill: PendingBill) => void;
}

const PaymentLayout: React.FC<PaymentLayoutProps> = ({
    onClientSelect,
    selectedPendingBill,
    onBillPaid,
}) => {
    return (
        <div className="layout">
            <PaymentHistory onClientSelect={onClientSelect} />
            {selectedPendingBill !== null && (
                <PaymentForm
                    clientId={selectedPendingBill.clientId}
                    pendingBill={selectedPendingBill}
                    onBillPaid={onBillPaid}
                />
            )}
        </div>
    );
};

export default PaymentLayout;
