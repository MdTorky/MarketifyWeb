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
        </Routes>
        <ToastContainer />
        {/* <Footer /> */}
      </BrowserRouter>
    </div >
  );
}

export default App;
