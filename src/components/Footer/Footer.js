import './Footer.css'
import logo from '../../images/logo3.png'
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faXTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { useLanguage } from '../../context/languageContext';
import languageData from '../../language.json';
const Footer = ({ children }) => {

    const { language } = useLanguage();
    const languageText = languageData[language]

    return (
        <>
            {children}
            <div className="Footer">

                <div className="FooterItems">
                    <div className="Footers">
                        <img src={logo} alt="" />
                    </div>
                    <div className="FooterColumn">
                        <div className="FooterItems">

                            <div className="Footers">
                                <h4>{languageText.About}</h4>

                                <Link to="FAQ.php" className='FooterLinks'>{languageText.FAQ}</Link>
                                <Link to="/report" className='FooterLinks'>{languageText.CreateAReport}</Link>
                                <Link to="privacy.html" className='FooterLinks'>{languageText.PrivacyPolicy}</Link>
                                <Link to="terms.html" className='FooterLinks' >{languageText.TermsConditions}</Link>

                            </div>
                            <div className="Footers">
                                <h4>{languageText.Menus}</h4>

                                <Link to="/" className='FooterLinks'>{languageText.Home}</Link>
                                <Link to="/browse" className='FooterLinks'>{languageText.BrowseProducts}</Link>
                                <Link to="/purchased" className='FooterLinks'>{languageText.PurchasedProducts}</Link>
                                <Link to="/myProducts" className='FooterLinks'>{languageText.MyProducts}</Link>
                                <Link to="/sell" className='FooterLinks'>{languageText.Sell}</Link>

                            </div>
                        </div>
                        <div className="FooterSocial">
                            <h4>{languageText.ConnectWithUs}</h4>
                            <div className="FooterMedia">
                                <Link to="https://www.facebook.com/profile.php?id=100088505045143&mibextid=ZbWKwL"> <FontAwesomeIcon icon={faFacebook} className="socialMedia" /></Link>
                                <Link to="https://www.instagram.com/marketify.utm/"><FontAwesomeIcon icon={faInstagram} className="socialMedia" /></Link>
                                <Link to="https://twitter.com/MarketifyUTM"><FontAwesomeIcon icon={faXTwitter} className="socialMedia" /></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Footer;