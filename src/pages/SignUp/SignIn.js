import './Sign.css'
import logo from '../../images/logo2.png';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import 'font-awesome/css/font-awesome.min.css';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';


const SignIn = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;


    return (
        <div className="Sign">
            <div className="logo">
                <img src={logo} alt="" />
            </div>
            <div className="SignForm">
                <h2>SIGN IN</h2>
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
                    <div className="InputField">
                        <div className="PasswordContainer">
                            <input
                                placeholder=" &#xf023; &nbsp; Password"
                                type={showPassword ? 'text' : 'password'}
                                className={`input ${passwordRegex.test(password) ? 'valid' : 'invalid'}`}
                                onChange={(e) => { setPassword(e.target.value) }}

                            />
                            <span className="TogglePass" onClick={handleTogglePassword}>
                                {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                            </span>
                        </div>
                        {error}
                    </div>
                    <button type="submit">Submit</button>
                    <div className="ForgotPassword">
                        <Link to="/ForgotPassword" className="ForgotPasswordLink">Forgot Password?</Link>
                    </div>
                    <div className="SignIn">
                        <p>Don't have an Account?</p>
                        <Link to="/SignUp" className="SignButton">
                            Sign Up
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignIn;