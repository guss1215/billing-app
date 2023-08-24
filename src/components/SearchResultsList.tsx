import React from 'react';
import { PendingBill } from '../types';

interface SearchResultsListProps {
    searchResults: PendingBill[];
    onSearchResultSelect: (searchResult: PendingBill) => void;
}

const SearchResultsList: React.FC<SearchResultsListProps> = ({
    searchResults,
    onSearchResultSelect,
}) => {
    return (
        <div>
            <h2>Search Results</h2>
            <ul>
                {searchResults.map((bill) => (
                    <li key={bill.id} onClick={() => onSearchResultSelect(bill)}>
                        {/* Display bill information here */}
                        Client ID: {bill.clientId}, Category: {bill.category}, Period: {bill.period}, Status: {bill.paymentStatus}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchResultsList;
