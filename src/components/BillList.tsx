import React, { useState } from 'react';
import { PendingBill } from '../types';
import './BillList.css';

interface BillListProps {
    pendingBills: PendingBill[];
    onPendingBillSelect: (pendingBill: PendingBill) => void;
}

enum SortColumn {
    ClientId = 'clientId',
    Category = 'category',
    Period = 'period',
    PaymentStatus = 'paymentStatus',
}

const BillList: React.FC<BillListProps> = ({ pendingBills, onPendingBillSelect }) => {
    const [sortColumn, setSortColumn] = useState<SortColumn | null>(null);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [selectedBillId, setSelectedBillId] = useState<number | null>(null);

    const handleSort = (column: SortColumn) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    const sortedBills = [...pendingBills].sort((a, b) => {
        const aValue = sortColumn ? a[sortColumn] : '';
        const bValue = sortColumn ? b[sortColumn] : '';

        if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    });

    return (
        <div className='bill-list'>
            <h2>Bill List</h2>
            <div className='data-row header-row'>
                <div className={`data-cell ${sortColumn === SortColumn.ClientId ? sortDirection === 'asc' ? 'sort-asc' : 'sort-desc' : ''}`} onClick={() => handleSort(SortColumn.ClientId)}>
                    Client ID
                </div>
                <div className={`data-cell ${sortColumn === SortColumn.Category ? sortDirection === 'asc' ? 'sort-asc' : 'sort-desc' : ''}`} onClick={() => handleSort(SortColumn.Category)}>
                    Category
                </div>
                <div className={`data-cell ${sortColumn === SortColumn.Period ? sortDirection === 'asc' ? 'sort-asc' : 'sort-desc' : ''}`} onClick={() => handleSort(SortColumn.Period)}>
                    Period
                </div>
                <div className={`data-cell ${sortColumn === SortColumn.PaymentStatus ? sortDirection === 'asc' ? 'sort-asc' : 'sort-desc' : ''}`} onClick={() => handleSort(SortColumn.PaymentStatus)}>
                    Status
                </div>
            </div>
            {sortedBills.map((bill) => (
                <div className={`data-row ${selectedBillId === bill.id ? 'selected-row' : ''}`} key={bill.id} onClick={() => { onPendingBillSelect(bill); setSelectedBillId(bill.id); }}>
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
