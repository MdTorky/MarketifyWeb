import './NavBar.css';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../images/logo3.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBell, faBars, faMinus } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';

const NavBar = ({ children }) => {

    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    return (
        <>
            <div className='NavBar'>
                <div className="logo">
                    <Link to="/"><img src={logo} alt="" /></Link>
                </div>
                <div className="phoneBar" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    {mobileMenuOpen ? <FontAwesomeIcon icon={faMinus} className="faMinus" /> : <FontAwesomeIcon icon={faBars} className="faBars" />}
                </div>
                <div className={`items ${mobileMenuOpen ? 'open' : 'closed'}`}>
                    <Link to="/" className={`link ${location.pathname === '/' ? 'active' : ''} `}>Home</Link>
                    <Link to="/SignUp" className='link'>Products</Link>
                    <Link to="/SignUp" className='link'>Sell</Link>

                    <Link to="/" className='link user'><FontAwesomeIcon icon={faBell} /></Link>
                    <Link to="/" className='link user'><FontAwesomeIcon icon={faUser} /></Link>
                </div>
            </div>
            {children}
        </>
    );
}

export default NavBar;