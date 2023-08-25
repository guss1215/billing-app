import React, { useState } from 'react';
import { PendingBill } from '../types';
import './SearchBillsByCategory.css';

interface SearchBillsByCategoryProps {
    onSearchBills: (category: string) => void;
}

const SearchBillsByCategory: React.FC<SearchBillsByCategoryProps> = ({ onSearchBills }) => {
    const [category, setCategory] = useState('');

    const handleSearchBills = () => {
        onSearchBills(category); // Call the provided function with the category
        //setCategory(''); // Clear input field
    };

    return (
        <div className='search-bills-by-category'>
            <h2>Search Bills</h2>
            <div>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">Select a Category</option>
                    <option value="SEWER">SEWER</option>
                    <option value="ELECTRICITY">ELECTRICITY</option>
                    <option value="WATER">WATER</option>
                </select>
            </div>
            <button onClick={handleSearchBills}>Search Bills</button>
        </div>
    );
};

export default SearchBillsByCategory;
