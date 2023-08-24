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

    return (
        <div className='create-bills-button'>
            <h2>Create Bills</h2>
            <div>
                <label>Period: </label>
                <input
                    type="text"
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                />
            </div>
            <div>
                <label>Category: </label>
                <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
            </div>
            <button onClick={handleCreateBills}>Create Bills</button>
        </div>
    );
};

export default CreateBillsButton;
