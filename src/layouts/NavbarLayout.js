import React from 'react';
import NavBar from '../components/NavBar/NavBar';

const NavbarLayout = ({ children }) => {
    return (
        <div>
            <NavBar />
            {children}
        </div>
    );
};

export default NavbarLayout;