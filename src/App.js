import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp/SignUp';
import SignIn from './pages/SignUp/SignIn';
import ForgotPassword from './pages/SignUp/ForgotPassword';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home/Home';
import NavBarLayout from './layouts/NavbarLayout'
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import Browse from './pages/Products/Browse';
import Product from './pages/Products/Product';
import Purchased from './pages/Products/Purchased';
import Payment from './pages/Payment/Payment';
import MyProducts from './pages/Products/MyProducts';
import Sell from './pages/Sell/Sell';
import Donate from './pages/Sell/Donate';
import Profile from './pages/Profile/Profile';

import AdminNavBar from './components/NavBar/AdminNavBar';
import ManageAccounts from './pages/Admin/ManageAccounts'
import ManageProducts from './pages/Admin/ManageProducts'
import ManageSoldProducts from './pages/Admin/ManageSoldProducts';
import ManageReports from './pages/Admin/ManageReports';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/" element={<NavBar><Footer><Home /></Footer></NavBar>} />
          <Route path="/browse" element={<NavBar><Footer><Browse /></Footer></NavBar>} />
          <Route path="/product/:productId" element={<NavBar><Footer><Product /></Footer></NavBar>} />
          <Route path="/purchased" element={<NavBar><Footer><Purchased /></Footer></NavBar>} />
          <Route path="/myProducts" element={<NavBar><Footer><MyProducts /></Footer></NavBar>} />
          <Route path="/payment" element={<NavBar><Footer><Payment /></Footer></NavBar>} />
          <Route path="/sell" element={<NavBar><Footer><Sell /></Footer></NavBar>} />
          <Route path="/donate" element={<NavBar><Footer><Donate /></Footer></NavBar>} />
          <Route path="/profile/:id" element={<NavBar><Footer><Profile /></Footer></NavBar>} />




          <Route path="/adminManageAccounts" element={<AdminNavBar><ManageAccounts /></AdminNavBar>} />
          <Route path="/adminManageProducts" element={<AdminNavBar><ManageProducts /></AdminNavBar>} />
          <Route path="/adminManageSoldProducts" element={<AdminNavBar><ManageSoldProducts /></AdminNavBar>} />
          <Route path="/adminManageReports" element={<AdminNavBar><ManageReports /></AdminNavBar>} />
          {/* <Route path="/adminManageAccounts" element={<AdminNavBar><ManageAccounts /></AdminNavBar>} /> */}
        </Routes>
        <ToastContainer />
        {/* <Footer /> */}
      </BrowserRouter>
    </div >
  );
}

export default App;
