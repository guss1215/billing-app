import React, { useState } from 'react';
import { PendingBill } from '../types';
import './SearchResultsList.css';

interface SearchResultsListProps {
    searchResults: PendingBill[];
    onSearchResultSelect: (searchResult: PendingBill) => void;
}

enum SortColumn {
    ClientId = 'clientId',
    Category = 'category',
    Period = 'period',
    PaymentStatus = 'paymentStatus',
}

const SearchResultsList: React.FC<SearchResultsListProps> = ({
    searchResults,
    onSearchResultSelect,
}) => {
    const [sortColumn, setSortColumn] = useState<SortColumn | null>(null);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    const handleSort = (column: SortColumn) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    const sortedResults = [...searchResults].sort((a, b) => {
        const aValue = sortColumn ? a[sortColumn] : '';
        const bValue = sortColumn ? b[sortColumn] : '';

        if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    });

    return (
        <div className='search-results'>
            <h2>Search Results</h2>
            <div className='data-row header-row'>
                <div className='data-cell' onClick={() => handleSort(SortColumn.ClientId)}>
                    Client ID
                </div>
                <div className='data-cell' onClick={() => handleSort(SortColumn.Category)}>
                    Category
                </div>
                <div className='data-cell' onClick={() => handleSort(SortColumn.Period)}>
                    Period
                </div>
                <div className='data-cell' onClick={() => handleSort(SortColumn.PaymentStatus)}>
                    Status
                </div>
            </div>
            {sortedResults.map((bill) => (
                <div className='data-row' key={bill.id} onClick={() => onSearchResultSelect(bill)}>
                    <div className='data-cell'>{bill.clientId}</div>
                    <div className='data-cell'>{bill.category}</div>
                    <div className='data-cell'>{bill.period}</div>
                    <div className='data-cell'>{bill.paymentStatus}</div>
                </div>
            ))}
        </div>
    );
};

export default SearchResultsList;
