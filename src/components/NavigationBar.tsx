import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import './NavigationBar.css';

const NavigationBar: React.FC = () => {
    const location = useLocation();

    const isActiveLink = (match: any) => {
        return match ? 'active-link' : '';
    };

    return (
        <div className="navigation-bar">
            <NavLink to="/" className={`nav-link ${isActiveLink(location.pathname === '/')}`}>
                Payment History
            </NavLink>
            <NavLink to="/bills" className={`nav-link ${isActiveLink(location.pathname === '/bills')}`}>
                Payment and Bills
            </NavLink>
            <NavLink to="/search" className={`nav-link ${isActiveLink(location.pathname === '/search')}`}>
                Search Category
            </NavLink>
            <NavLink to="/create" className={`nav-link ${isActiveLink(location.pathname === '/create')}`}>
                Create Bills
            </NavLink>
        </div>
    );
};

export default NavigationBar;