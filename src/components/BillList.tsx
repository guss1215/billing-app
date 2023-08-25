import React from 'react';
import { PendingBill } from '../types';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import './BillList.css';

interface BillListProps {
    pendingBills: PendingBill[];
    onPendingBillSelect: (pendingBill: PendingBill) => void;
}

const BillList: React.FC<BillListProps> = ({ pendingBills, onPendingBillSelect }) => {
    const paymentHistory = useSelector((state: RootState) => state.paymentHistory.paymentHistory);
    return (
        <div className='bill-list'>
            <h2>Bill List</h2>
            <div className='data-row header-row'>
                <div className='data-cell'>Client ID</div>
                <div className='data-cell'>Category</div>
                <div className='data-cell'>Period</div>
                <div className='data-cell'>Status</div>
            </div>
            {pendingBills.map((bill) => (
                <div className='data-row' key={bill.id} onClick={() => onPendingBillSelect(bill)}>
                    <div className='data-cell'>{bill.clientId}</div>
                    <div className='data-cell'>{bill.category}</div>
                    <div className='data-cell'>{bill.period}</div>
                    <div className='data-cell'>{bill.paymentStatus}</div>
                </div>
            ))}
        </div>

    );
};

export default BillList;
