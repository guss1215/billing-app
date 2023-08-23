import React from 'react';
import { PendingBill } from '../types';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

interface BillListProps {
    pendingBills: PendingBill[];
    onPendingBillSelect: (pendingBill: PendingBill) => void;
}

const BillList: React.FC<BillListProps> = ({ pendingBills, onPendingBillSelect }) => {
    const paymentHistory = useSelector((state: RootState) => state.paymentHistory.paymentHistory);
    return (
        <div>
            <h2>Bill List</h2>
            <ul>
                {pendingBills.map((bill) => (
                    <li key={bill.id} onClick={() => onPendingBillSelect(bill)}>
                        {/* Display bill information here */}
                        Client ID: {bill.clientId}, Category: {bill.category}, Period: {bill.period}, Status: {bill.paymentStatus}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BillList;
