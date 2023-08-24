import React from 'react';
import { Link } from 'react-router-dom';

const NavigationBar: React.FC = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Payment History</Link>
                </li>
                <li>
                    <Link to="/bills">Bill List</Link>
                </li>
                <li>
                    <Link to="/search">Search Bills</Link>
                </li>
                <li>
                    <Link to="/create">Create Bills</Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavigationBar;
