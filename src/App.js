import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
import { useLanguage } from './context/languageContext';
import languageData from './language.json';
import { useAuthContext } from './hooks/useAuthContext';
import ResetPassword from './pages/SignUp/ResetPassword';



function App() {

  const { user } = useAuthContext()
  const api = process.env.REACT_APP_API_KEY;
  // const api = "http://localhost:4000";


  const { isRTL, language } = useLanguage();
  const languageText = languageData[language];


  return (
    <div className={`App ${isRTL ? 'arabic' : ''}`}>
      <BrowserRouter>
        <Routes>

          {/* Auth */}
          <Route
            path="/SignUp"
            element={
              !user ? (
                <SignUp api={api} languageText={languageText} />
              ) : user.userType === "admin" ? (
                <Navigate to="/adminManageAccounts" />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/SignIn"
            element={
              !user ? (
                <SignIn api={api} languageText={languageText} />
              ) : user.userType === "admin" ? (
                <Navigate to="/adminManageAccounts" />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route path="/forgotPassword" element={<ForgotPassword api={api} />} />
          <Route path="/resetPassword/:id" element={<ResetPassword api={api} languageText={languageText} />} />



          <Route path="/" element={user ? <NavBar><Footer><Home languageText={languageText} /></Footer></NavBar> : <Navigate to='/SignIn' />} />
          {/* <Route path="/browse" element={user ? <NavBar><Footer><Browse api={api} languageText={languageText} /></Footer></NavBar> : <Navigate to='/SignIn' />} /> */}
          {/* <Route path="/product/:id" element={user ? <NavBar><Footer><Product api={api} languageText={languageText} /></Footer></NavBar> : <Navigate to='/SignIn' />} /> */}

          <Route path="/browse" element={
            !user ? (<Navigate to='/SignIn' />
            ) : user.userStatus === "Pending" || user.userStatus === "Waiting" || user.userStatus === "Inactive" || user.userStatus === "Inactive" ? (
              <Navigate to='/profile' />
            ) : (
              <NavBar><Footer><Browse api={api} languageText={languageText} /></Footer></NavBar>
            )
          } />
          <Route path="/product/:id" element={
            !user ? (<Navigate to='/SignIn' />
            ) : user.userStatus === "Pending" || user.userStatus === "Waiting" || user.userStatus === "Inactive" ? (
              <Navigate to='/profile' />
            ) : (
              <NavBar><Footer><Product api={api} languageText={languageText} /></Footer></NavBar>
            )
          } />

          <Route path="/purchased" element={
            !user ? (<Navigate to='/SignIn' />
            ) : user.userStatus === "Pending" || user.userStatus === "Waiting" || user.userStatus === "Inactive" ? (
              <Navigate to='/profile' />
            ) : (
              <NavBar><Footer><Purchased api={api} languageText={languageText} /></Footer></NavBar>
            )
          } />


          <Route path="/myProducts" element={
            !user ? (<Navigate to='/SignIn' />
            ) : user.userStatus === "Pending" || user.userStatus === "Waiting" || user.userStatus === "Inactive" ? (
              <Navigate to='/profile' />
            ) : (
              <NavBar><Footer><MyProducts api={api} languageText={languageText} /></Footer></NavBar>
            )
          } />

          <Route path="/payment" element={
            !user ? (<Navigate to='/SignIn' />
            ) : user.userStatus === "Pending" || user.userStatus === "Waiting" || user.userStatus === "Inactive" ? (
              <Navigate to='/profile' />
            ) : (
              <NavBar><Footer><Payment api={api} languageText={languageText} /></Footer></NavBar>
            )
          } />
          <Route path="/sell" element={
            !user ? (<Navigate to='/SignIn' />
            ) : user.userStatus === "Pending" || user.userStatus === "Waiting" || user.userStatus === "Inactive" ? (
              <Navigate to='/profile' />
            ) : (
              <NavBar><Footer><Sell api={api} languageText={languageText} /></Footer></NavBar>
            )
          } />
          <Route path="/donate" element={
            !user ? (<Navigate to='/SignIn' />
            ) : user.userStatus === "Pending" || user.userStatus === "Waiting" || user.userStatus === "Inactive" ? (
              <Navigate to='/profile' />
            ) : (
              <NavBar><Footer><Donate api={api} languageText={languageText} /></Footer></NavBar>
            )
          } />
          {/* <Route path="/payment" element={
            !user ? (<Navigate to='/SignIn' />
            ) : user.userStatus === "Pending" ? (
              <Navigate to='/profile' />
            ) : (
              <NavBar><Footer><Payment api={api} languageText={languageText} /></Footer></NavBar>
            )
          } /> */}

          {/* <Route path="/purchased" element={user ? <NavBar><Footer><Purchased api={api} languageText={languageText} /></Footer></NavBar> : <Navigate to='/SignIn' />} /> */}
          {/* <Route path="/myProducts" element={user ? <NavBar><Footer><MyProducts api={api} languageText={languageText} /></Footer></NavBar> : <Navigate to='/SignIn' />} /> */}
          {/* <Route path="/payment" element={user ? <NavBar><Footer><Payment api={api} languageText={languageText} /></Footer></NavBar> : <Navigate to='/SignIn' />} /> */}
          {/* <Route path="/sell" element={user ? <NavBar><Footer><Sell api={api} languageText={languageText} /></Footer></NavBar> : <Navigate to='/SignIn' />} /> */}
          {/* <Route path="/donate" element={user ? <NavBar><Footer><Donate api={api} languageText={languageText} /></Footer></NavBar> : <Navigate to='/SignIn' />} /> */}
          <Route path="/profile" element={user ? <NavBar><Footer><Profile api={api} languageText={languageText} /></Footer></NavBar> : <Navigate to='/SignIn' />} />





          <Route path="/adminManageAccounts" element={user && user.userType == "admin" ? <AdminNavBar ><ManageAccounts api={api} languageText={languageText} /></AdminNavBar> : <Navigate to='/SignIn' />} />
          <Route path="/adminManageProducts" element={user && user.userType == "admin" ? <AdminNavBar><ManageProducts /></AdminNavBar> : <Navigate to='/SignIn' />} />
          <Route path="/adminManageSoldProducts" element={user && user.userType == "Admin" ? <AdminNavBar><ManageSoldProducts /></AdminNavBar> : <Navigate to='/SignIn' />} />
          <Route path="/adminManageReports" element={user && user.userType == "Admin" ? <AdminNavBar><ManageReports /></AdminNavBar> : <Navigate to='/SignIn' />} />
          {/* <Route path="/adminManageAccounts" element={<AdminNavBar><ManageAccounts /></AdminNavBar>} /> */}
        </Routes>
        <ToastContainer />
        {/* <Footer /> */}
      </BrowserRouter>
    </div >
  );
}

export default App;
