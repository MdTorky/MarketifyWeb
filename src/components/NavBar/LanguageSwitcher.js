import React from 'react';
import { useLanguage } from '../../context/languageContext';
import { Link } from 'react-router-dom';
import ReactCountryFlag from 'react-country-flag';

const LanguageSwitcher = () => {
    const { changeLanguage, language } = useLanguage();

    const handleChangeLanguage = (newLanguage) => {
        changeLanguage(newLanguage);
    };

    return (
        <div className="dropdownContent">
            <Link className={`link ${language === 'en' ? 'active' : ''}`} onClick={() => handleChangeLanguage('en')}>
                <ReactCountryFlag countryCode="GB" svg style={{ fontSize: '1.3em' }} />
                <span className="country-name">English</span>
            </Link>
            <Link className={`link ${language === 'ar' ? 'active' : ''}`} onClick={() => handleChangeLanguage('ar')}>
                <ReactCountryFlag countryCode="PS" svg style={{ fontSize: '1.3em' }} />
                <span className="country-name">Arabic</span>
            </Link>
            <Link className={`link ${language === 'my' ? 'active' : ''}`} onClick={() => handleChangeLanguage('my')}>
                <ReactCountryFlag countryCode="MY" svg style={{ fontSize: '1.3em' }} />
                <span className="country-name">Malay</span>
            </Link>
        </div>
    );
};

export default LanguageSwitcher;
