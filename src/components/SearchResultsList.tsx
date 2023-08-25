import React from 'react';
import { PendingBill } from '../types';
import './SearchResultsList.css';

interface SearchResultsListProps {
    searchResults: PendingBill[];
    onSearchResultSelect: (searchResult: PendingBill) => void;
}

const SearchResultsList: React.FC<SearchResultsListProps> = ({
    searchResults,
    onSearchResultSelect,
}) => {
    return (
        <div className='search-results'>
            <h2>Search Results</h2>
            <div className='data-row header-row'>
                <div className='data-cell'>Client ID</div>
                <div className='data-cell'>Category</div>
                <div className='data-cell'>Period</div>
                <div className='data-cell'>Status</div>
            </div>
            {searchResults.map((bill) => (
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
