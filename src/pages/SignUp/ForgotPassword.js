import './Sign.css'
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'font-awesome/css/font-awesome.min.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo2.png';


const ForgotPassword = () => {

    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return (
        <div className="Sign">
            <div className="logo">
                <img src={logo} alt="" />
            </div>
            <div className="SignForm">
                <h2>Forgot Password</h2>
                <form action="" >
                    <div className="InputField">
                        <input
                            placeholder=" &#xf0e0; &nbsp; Email"
                            type="email"
                            className={`input ${emailRegex.test(email) ? 'valid' : 'invalid'}`}
                            // onChange={handleChange('Please enter a valid Full name!', fullNameRegex, setName, 'name')}
                            onChange={(e) => { setEmail(e.target.value) }}
                        />
                        {error}
                    </div>
                    <button type="submit">Submit</button>

                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;