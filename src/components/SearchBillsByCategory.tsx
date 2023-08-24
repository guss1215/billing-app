import React, { useState } from 'react';
import { PendingBill } from '../types';

interface SearchBillsByCategoryProps {
    onSearchBills: (category: string) => void;
}

const SearchBillsByCategory: React.FC<SearchBillsByCategoryProps> = ({ onSearchBills }) => {
    const [category, setCategory] = useState('');

    const handleSearchBills = () => {
        onSearchBills(category); // Call the provided function with the category
        setCategory(''); // Clear input field
    };

    return (
        <div>
            <h2>Search Bills by Category</h2>
            <div>
                <label>Category: </label>
                <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
            </div>
            <button onClick={handleSearchBills}>Search Bills</button>
        </div>
    );
};

export default SearchBillsByCategory;
