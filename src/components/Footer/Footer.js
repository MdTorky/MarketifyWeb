import './Footer.css'
import logo from '../../images/logo3.png'
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faXTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';

const Footer = ({ children }) => {
    return (
        <>
            {children}
            <div className="Footer">

                <div className="FooterItems">
                    <div class="Footers">
                        <img src={logo} alt="" />
                    </div>
                    <div className="FooterColumn">
                        <div className="FooterItems">

                            <div class="Footers">
                                <h4>About</h4>

                                <Link to="FAQ.php" className='FooterLinks'>FAQ</Link>
                                <Link to="AboutUs.php" className='FooterLinks'>About Us</Link>
                                <Link to="privacy.html" className='FooterLinks'>Privacy Policiy</Link>
                                <Link to="terms.html" className='FooterLinks' >Terms & Conditions</Link>

                            </div>
                            <div class="Footers">
                                <h4>Menus</h4>

                                <Link to="/" className='FooterLinks'>Home</Link>
                                <Link to="/browse" className='FooterLinks'>Browse Products</Link>
                                <Link to="/page2" className='FooterLinks'>Purchased Products</Link>
                                <Link to="/page3" className='FooterLinks'>My Products</Link>
                                <Link to="/sell" className='FooterLinks'>Sell</Link>

                            </div>
                        </div>
                        <div className="FooterSocial">
                            <h4>Connect With Us</h4>
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