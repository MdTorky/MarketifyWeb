import './Sign.css'
import logo from '../../images/logo2.png';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import 'font-awesome/css/font-awesome.min.css';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import withReactContent from 'sweetalert2-react-content';
import { Icon } from '@iconify/react';
import { useLogin } from '../../hooks/useLogin';
import Loader from '../../components/Loader/Loader'
import { useAuthContext } from '../../hooks/useAuthContext';

const SignIn = ({ api, languageText }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { login, loading, error } = useLogin(api)
    const { user } = useAuthContext()


    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };



    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;


    const handleSubmit = async (e) => {
        e.preventDefault();

        await login({
            userEmail: email,
            userPassword: password,
        })
    }
    return (
        <div className="Sign">

            <div className="logo">
                <img src={logo} alt="" />
            </div>
            {loading ? (
                <div className="Loader">
                    <Loader />
                    <p className="LoaderText">{languageText.LoggingIn}</p>
                </div>
            ) : (
                <div className="SignForm">
                    <h2>SIGN IN</h2>
                    <form onSubmit={handleSubmit} >
                        <div className="InputField">
                            <input
                                placeholder=" &#xf0e0; &nbsp; Email"
                                type="email"
                                className={`input ${emailRegex.test(email) ? 'valid' : 'invalid'}`}
                                // onChange={handleChange('Please enter a valid Full name!', fullNameRegex, setName, 'name')}
                                onChange={(e) => { setEmail(e.target.value) }}
                            />
                            {/* {error} */}
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
                            {/* {error} */}
                        </div>
                        <button disabled={loading}>Sign In</button>

                        <div className="ForgotPassword">
                            <Link to="/ForgotPassword" className="ForgotPasswordLink">Forgot Password?</Link>
                        </div>
                        <div className="SignIn">
                            <p>Don't have an Account?</p>
                            <Link to="/SignUp" className="SignButton">
                                Sign Up
                            </Link>
                        </div>
                        {error && <div className="formError"><Icon icon="ooui:error" />{error}</div>}

                    </form>
                </div>
            )}
        </div>
    );
}

export default SignIn;