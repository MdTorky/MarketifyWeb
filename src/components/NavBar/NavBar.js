import './NavBar.css';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../images/logo3.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBell, faBars, faMinus, faGlobe } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import ReactCountryFlag from "react-country-flag"
import { Icon } from '@iconify-icon/react';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '../../context/languageContext';
import languageData from '../../language.json';


const NavBar = ({ children }) => {

    const location = useLocation();
    const { language } = useLanguage();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { isRTL } = useLanguage();
    const languageText = languageData[language]
    return (
        <>
            <div className={`NavBar ${isRTL ? 'arabic' : ''}`}>
                <div className="logo">
                    <Link to="/"><img src={logo} alt="" /></Link>
                </div>
                <div className="phoneBar" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    {mobileMenuOpen ? <FontAwesomeIcon icon={faMinus} className="faMinus" /> : <FontAwesomeIcon icon={faBars} className="faBars" />}
                </div>
                <div className={`items ${mobileMenuOpen ? 'open' : 'closed'}`}>
                    <Link to="/" className={`link ${location.pathname === '/' ? 'active' : ''} `}>{languageText.Home}</Link>
                    <div className="dropdown">
                        <Link className='link'>{languageText.Products}</Link>
                        <div className="dropdownContent">
                            <Link to="/browse" className={`link ${location.pathname === '/browse' ? 'active' : ''} `}>{languageText.Browse}</Link>
                            <Link to="/purchased" className={`link ${location.pathname === '/purchased' ? 'active' : ''} `}>{languageText.Purchased}</Link>
                            <Link to="/myProducts" className={`link ${location.pathname === '/myProducts' ? 'active' : ''} `}>{languageText.MyProducts}</Link>
                        </div>
                    </div>
                    <Link to="/sell" className={`link ${((location.pathname === '/sell') || (location.pathname === '/donate')) ? 'active' : ''} `}>{languageText.Sell}</Link>
                    <div className="dropdown">
                        <Link className="link user"><FontAwesomeIcon icon={faGlobe} /></Link>
                        <LanguageSwitcher languageText={languageText} />
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