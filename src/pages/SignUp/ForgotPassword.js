import './Sign.css'
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'font-awesome/css/font-awesome.min.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo2.png';
import { useForgotPassword } from '../../hooks/useForgotPassword';
import { Icon } from '@iconify/react';
import Loader from '../../components/Loader/Loader'



const ForgotPassword = ({ api }) => {

    const [userEmail, setEmail] = useState('');
    // const [error, setError] = useState('');
    const { forgotPassword, error, isLoading } = useForgotPassword(api);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    const handleSubmit = async (e) => {
        e.preventDefault();

        await forgotPassword({
            userEmail: userEmail,
        })
    }

    return (
        <div className="Sign">
            <div className="logo">
                <img src={logo} alt="" />
            </div>
            {isLoading ? (
                <div className="Loader">
                    <Loader />
                    <p className="LoaderText">Sending</p>
                </div>
            ) : (
                <div className="SignForm">
                    <h2>Forgot Password</h2>
                    <form onSubmit={handleSubmit} >
                        <div className="InputField">
                            <input
                                placeholder=" &#xf0e0; &nbsp; Enter your Email"
                                type="email"
                                className={`input ${emailRegex.test(userEmail) ? 'valid' : 'invalid'}`}
                                onChange={(e) => { setEmail(e.target.value) }}
                            />
                        </div>
                        <button type="submit">Submit</button>
                        {error && <div className="formError"><Icon icon="ooui:error" />{error}</div>}

                    </form>
                </div>
            )}
        </div>
    );
}

export default ForgotPassword;