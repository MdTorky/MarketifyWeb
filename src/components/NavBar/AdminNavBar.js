import { Icon } from '@iconify-icon/react';
import logo from '../../images/logo3.png'
import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './AdminNavBar.css'
import { useAuthContext } from '../../hooks/useAuthContext';
import { useLogout } from '../../hooks/useLogout';

const AdminNavBar = ({ children }) => {
    const location = useLocation();
    const { logout } = useLogout()

    const [activeButton, setActiveButton] = useState('');
    useEffect(() => {
        // Extract the pathname from the location object
        const pathname = location.pathname;

        // Determine which button should be active based on the pathname
        // You can adjust this logic based on your route structure
        if (pathname.includes('/adminManageAccounts')) {
            setActiveButton('adminManageAccounts');
        } else if (pathname.includes('/adminManageProducts')) {
            setActiveButton('adminManageProducts');
        } else if (pathname.includes('/adminManageSoldProducts')) {
            setActiveButton('adminManageSoldProducts');
        } else if (pathname.includes('/adminManageReports')) {
            setActiveButton('adminManageReports');
        } else {
            setActiveButton('');
        }
    }, [location.pathname]);
    const handleLogout = () => {
        logout()
    }

    return (
        <>
            <div className="AdminNavBar">
                <input className="NavToggle" type="checkbox" id="NavToggle" />
                <div className="NavHeader"><a className="NavTitle" target="_blank">
                    Marketify</a>
                    <label for="NavToggle"><span className="NavToggleBurger"></span></label>
                    <hr />
                </div>
                <div className="NavContent">
                    {/* Add 'active' class to the active button */}
                    <Link to='/adminManageAccounts' className={`NavButton ${activeButton === 'adminManageAccounts' ? 'active' : ''}`}><Icon icon="material-symbols:manage-accounts-rounded" /><span>Manage Accounts</span></Link>
                    <Link to="/adminManageProducts" className={`NavButton ${activeButton === 'adminManageProducts' ? 'active' : 'notActive'}`}><Icon icon="fluent-mdl2:product-variant" /><span>Manage Products</span></Link>
                    <Link to="/adminManageSoldProducts" className={`NavButton ${activeButton === 'adminManageSoldProducts' ? 'active' : 'notActive'}`}><Icon icon="mdi:package-variant-closed-check" /><span>Manage Sold Products</span></Link>
                    <Link to="/adminManageReports" className={`NavButton ${activeButton === 'adminManageReports' ? 'active' : 'notActive'}`}><Icon icon="fluent-mdl2:report-warning" /><span>Manage Reports</span></Link>
                    <Link onClick={handleLogout} className="NavButton" ><Icon icon="solar:logout-broken" /><span>Logout</span></Link>
                    <div className="NavContentHover"></div>
                </div>
            </div>
            {children}
        </>
    );
}

export default AdminNavBar;



{/* <input className="NavFooterToggle" type="checkbox" />
            <div id="nav-footer">
                <div id="nav-footer-heading">
                    <div id="nav-footer-avatar"><img src="https://gravatar.com/avatar/4474ca42d303761c2901fa819c4f2547" /></div>
                    <div id="nav-footer-titlebox"><a id="nav-footer-title" href="https://codepen.io/uahnbu/pens/public" target="_blank">uahnbu</a><span id="nav-footer-subtitle">Admin</span></div>
                    <label for="nav-footer-toggle"><i class="fas fa-caret-up"></i></label>
                </div>
                <div id="nav-footer-content">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
                </div>
            </div> */}