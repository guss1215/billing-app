import React, { useState } from 'react';
import { toast } from 'react-toastify'; // Import toast from react-toastify
import api from '../services/api';
import './CreateBillsButton.css';

interface CreateBillsButtonProps {
    onCreateBills: (period: string, category: string) => void;
}

const CreateBillsButton: React.FC<CreateBillsButtonProps> = ({ onCreateBills }) => {
    const [period, setPeriod] = useState('');
    const [category, setCategory] = useState('');

    const handleCreateBills = async () => {
        const existingBill = await checkBillExists(period, category);

        if (existingBill) {
            // Display a user-friendly message to the user
            // You can use a notification library or a modal to display this message
            // Example using the 'react-toastify' library:
            toast.error('Bill already exists for selected period and category.', {
                autoClose: 3000, // Close the toast after 3 seconds
                position: 'top-right', // Position the toast at the top-right corner
            });
        } else {
            onCreateBills(period, category);
            setPeriod('');
            setCategory('');

            // Trigger a toast notification for bill creation
            toast.success('Bills created successfully!', {
                autoClose: 3000,
                position: 'top-right',
            });
        }
    };

    const handlePeriodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (/^\d{0,6}$/.test(value)) {
            setPeriod(value);
        }
    };

    const checkBillExists = async (period: string, category: string) => {
        try {
            const response = await api.get(`/check-bill-exists?period=${period}&category=${category}`);
            return response.data; // Returns true if the bill exists, false otherwise
        } catch (error) {
            console.error('Error checking bill existence:', error);
            return false; // Return false on error or if the bill doesn't exist
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
