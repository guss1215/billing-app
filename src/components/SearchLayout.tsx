import React from 'react';
import SearchBillsByCategory from './SearchBillsByCategory';
import SearchResultsList from './SearchResultsList';
import { PendingBill } from '../types';
import './SearchLayout.css';

interface SearchLayoutProps {
    onSearchBills: (category: string) => Promise<void>;
    onSearchResultSelect: (searchResult: PendingBill) => void;
    searchResults: PendingBill[];
}

const SearchLayout: React.FC<SearchLayoutProps> = ({
    onSearchBills,
    onSearchResultSelect,
    searchResults,
}) => {
    return (
        <div className="search-layout">
            <SearchBillsByCategory onSearchBills={onSearchBills} />
            <SearchResultsList onSearchResultSelect={onSearchResultSelect} searchResults={searchResults} />
        </div>
    );
};

export default SearchLayout;
