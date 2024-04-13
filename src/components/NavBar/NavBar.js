import './NavBar.css';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../images/logo3.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBell, faBars, faMinus, faGlobe } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';
import ReactCountryFlag from "react-country-flag"
import { Icon } from '@iconify-icon/react';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '../../context/languageContext';
import languageData from '../../language.json';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useLogout } from '../../hooks/useLogout';
import { useChatState } from "../../context/ChatContext";
import { useItemsContext } from '../../hooks/useItemsContext'
import Loader from '../Loader/Loader';
import Chat from '../Chat/Chat';
import { useChat } from '../../hooks/useChat';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Notification from '../Notification/Notification';
const NavBar = ({ children, api }) => {

    const location = useLocation();
    const { language } = useLanguage();
    const { notifications = [], dispatch } = useItemsContext();

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { isRTL } = useLanguage();
    const languageText = languageData[language]
    const { user } = useAuthContext()
    const { logout } = useLogout()
    // const { selectedChat, chat, setChats } = useChatState();
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const [isChatOpen, setChatOpen] = useState(false);

    const [NotificationLengthUnseen, setNotificationLengthUnseen] = useState(0);
    const handleLogout = () => {
        logout()
    }

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch(`${api}/api/notification/${user.userId}`, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                if (!response.ok) {
                    console.error(`Error fetching Items. Status: ${response.status}, ${response.statusText}`);
                    setError('Failed to fetch data');
                    return;
                }
                const json = await response.json();

                dispatch({
                    type: 'SET_ITEM',
                    collection: "notifications",
                    payload: json,
                });

                const unseenNotifications = json.filter(item => item.status === 'unseen');
                setNotificationLengthUnseen(unseenNotifications.length);

                setLoading(false);
            } catch (error) {
                console.error('An error occurred while fetching data:', error);
                setError('An error occurred while fetching data');
            }
        };

        if (user) {
            fetchItems();
        }
    }, [dispatch, user, api, notifications]);




    // Function to handle opening/closing notifications dropdown





    const handleNotificationUpdate = async () => {


        try {
            const response = await fetch(`${api}/api/notification/${user.userId}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            if (!response.ok) {
                console.error(`Error fetching Items. Status: ${response.status}, ${response.statusText}`);
                setError('Failed to fetch data');
                return;
            }
            const json = await response.json();

            dispatch({
                type: 'GET_ITEM',
                collection: "notifications",
                payload: json,
            });



        } catch (error) {
            console.error('An error occurred while fetching data:', error);
            setError('An error occurred while fetching data');
        }
    };



    const toggleNotifications = () => {
        setNotificationsOpen(!notificationsOpen);
        handleNotificationUpdate()
    };

    const [userTwoError, setUserTwoError] = useState(null);
    const [sender, setSender] = useState();


    const { accessChat, chatError } = useChat(api, toast);

    // useEffect(() => {
    //     console.log("SENDER: " + JSON.stringify(sender));
    // }, [sender]);




    const openChat = (userSeller) => {

        try {


            setUserTwoError(userSeller)
            setChatOpen(true);
            accessChat(userSeller)
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

    const closeChat = () => {
        setChatOpen(false);
    };





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

                    {/* <Link to="/" className='link user'><FontAwesomeIcon icon={faBell} /></Link> */}
                    <div className="dropdown">
                        <Link className='link user'><FontAwesomeIcon icon={faBell} onClick={toggleNotifications} /></Link>
                        <Notification notifications={notifications} NotificationLengthUnseen={NotificationLengthUnseen} notificationsOpen={notificationsOpen} openChat={openChat} loading={loading} api={api} languageText={languageText} />
                    </div>
                    <div className="dropdown">
                        <Link className='link user'><FontAwesomeIcon icon={faUser} /></Link>
                        <div className="dropdownContent">
                            <Link to="/profile" className={`link ${location.pathname === '/profile' ? 'active' : ''} `}>{languageText.Profile}</Link>
                            <Link className="link" onClick={handleLogout}>{languageText.Logout}</Link>
                            {/* <Link to="/myProducts" className={`link ${location.pathname === '/myProducts' ? 'active' : ''} `}>{languageText.MyProducts}</Link> */}
                        </div>
                    </div>
                    {/* <Link to="/profile" className='link user'><FontAwesomeIcon icon={faUser} /></Link> */}
                    {/* <Link to="/profile/3124124" className='link user'><Icon icon="line-md:account" /></Link> */}
                </div>
                {isChatOpen && <Chat onClose={closeChat} languageText={languageText} userSeller={userTwoError} api={api} />}
            </div>
            {children}
        </>
    );
}

export default NavBar;
