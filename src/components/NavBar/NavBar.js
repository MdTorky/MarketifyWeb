import './NavBar.css';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../images/logo3.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBell, faBars, faMinus, faGlobe } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import ReactCountryFlag from "react-country-flag"
import { Icon } from '@iconify-icon/react';

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
                    <div className="dropdown">
                        <Link className='link'>Products</Link>
                        <div className="dropdownContent">
                            <Link to="/browse" className={`link ${location.pathname === '/browse' ? 'active' : ''} `}>Browse</Link>
                            <Link to="/purchased" className={`link ${location.pathname === '/purchased' ? 'active' : ''} `}>Purchased</Link>
                            <Link to="/myProducts" className={`link ${location.pathname === '/myProducts' ? 'active' : ''} `}>My Products</Link>
                        </div>
                    </div>
                    <Link to="/sell" className='link'>Sell</Link>
                    <div className="dropdown">
                        <Link className="link user"><FontAwesomeIcon icon={faGlobe} /></Link>
                        <div className="dropdownContent">
                            <Link to="/page1" className='link'>  <ReactCountryFlag countryCode="GB" svg
                                style={{
                                    fontSize: '1.3em',
                                }} />
                                <span className="country-name">English</span></Link>


                            <Link to="/page2" className='link'>  <ReactCountryFlag countryCode="PS" svg style={{
                                fontSize: '1.3em',
                            }} />
                                <span className="country-name">Arabic</span></Link>
                            <Link to="/page3" className='link'>  <ReactCountryFlag countryCode="MY" svg style={{
                                fontSize: '1.3em',
                            }} />  <span className="country-name">Malay</span></Link>

                        </div>
                    </div>

                    <Link to="/" className='link user'><FontAwesomeIcon icon={faBell} /></Link>
                    <Link to="/profile/3124124" className='link user'><FontAwesomeIcon icon={faUser} /></Link>
                    {/* <Link to="/profile/3124124" className='link user'><Icon icon="line-md:account" /></Link> */}
                </div>
            </div>
            {children}
        </>
    );
}

export default NavBar;