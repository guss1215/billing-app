import React, { useState } from 'react';
import { toast } from 'react-toastify'; // Import toast from react-toastify
import './CreateBillsButton.css';

interface CreateBillsButtonProps {
    onCreateBills: (period: string, category: string) => void;
}

const CreateBillsButton: React.FC<CreateBillsButtonProps> = ({ onCreateBills }) => {
    const [period, setPeriod] = useState('');
    const [category, setCategory] = useState('');

    const handleCreateBills = () => {
        onCreateBills(period, category);
        setPeriod('');
        setCategory('');

        // Trigger a toast notification for bill creation
        toast.success('Bills created successfully!', {
            autoClose: 3000,
            position: 'top-right',
        });
    };

    const handlePeriodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

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
