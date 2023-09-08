import React, { useState } from 'react';
import './CreateBillsButton.css';

interface CreateBillsButtonProps {
    onCreateBills: (period: string, category: string) => void; // Update function signature
}

const CreateBillsButton: React.FC<CreateBillsButtonProps> = ({ onCreateBills }) => {
    const [period, setPeriod] = useState('');
    const [category, setCategory] = useState('');

    const handleCreateBills = () => {
        onCreateBills(period, category); // Call the provided function with arguments
        setPeriod(''); // Clear input fields
        setCategory('');
    };

    const handlePeriodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
    
        // Allow only numbers and maximum of 6 characters
        if (/^\d{0,6}$/.test(value)) {
          setPeriod(value);
        }
      };

    return (
        <div className='create-bills-button'>
            <h2>Create Bills</h2>
            <div>
                <label>Period: </label>
                <input
                    type="text"
                    value={period}
                    onChange={handlePeriodChange}
                    placeholder='YYYYMM'
                />
            </div>
            <div>
                <label>Category: </label>
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
            <button onClick={handleCreateBills}>Create Bills</button>
        </div>
    );
};

export default CreateBillsButton;
