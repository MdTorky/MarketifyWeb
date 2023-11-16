import './Sign.css';
import logo from '../../images/logo2.png';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import 'font-awesome/css/font-awesome.min.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import 'animate.css';
import { Link } from 'react-router-dom';

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [matric, setMatric] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const MySwal = withReactContent(Swal);

    const fullNameRegex = /^[a-zA-Z\s'-]{2,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(?:\+60|60)(?:(1[0-9])|(?:3[2-9]|4[2-9]|5[4-9]|6[2-9]|7[3-9]|8[2-9]|9[2-9]))\d{7,8}$/;
    const matricRegex = /^[A-Za-z][2][0-4][A-Za-z]{2}\d{4}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const handleChange = (errorText, regex, setter, field) => (e) => {
        const newInput = e.target.value;
        setter(newInput);

        if (newInput.trim() === '') {
            setErrors((prevErrors) => ({ ...prevErrors, [field]: null }));
        } else if (regex.test(newInput)) {
            setErrors((prevErrors) => ({ ...prevErrors, [field]: null }));
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, [field]: errorText }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check for invalid fields
        const fieldErrors = {
            name: !fullNameRegex.test(name) ? 'Please enter a valid Full name!' : null,
            email: !emailRegex.test(email) ? 'Please enter a valid Email!' : null,
            phone: !phoneRegex.test(phone) ? 'Please enter a valid Phone Number! (+60 11-111 1111)' : null,
            matric: !matricRegex.test(matric) ? 'Please enter a valid Matric Number' : null,
            password: !passwordRegex.test(password) ? (
                <>
                    - It has to be at least 8 characters long
                    <br />
                    - Contains both upper and lowercase letters
                    <br />
                    - Contains at least one digit
                    <br />
                    - Contains at least one special character
                </>
            ) : null,
        };

        setErrors(fieldErrors);

        // Check if there are any errors
        if (Object.values(fieldErrors).some((value) => value !== null)) {
            MySwal.fire({
                title: 'Make sure every field is Correct',
                showDenyButton: true,
                icon: 'error',
                showConfirmButton: false,
                denyButtonText: 'Ok',
                showClass: {
                    popup: 'animate__animated animate__fadeInUp animate__faster',
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutDown animate__faster',
                },
            });

            return;
        }

        // Perform further actions for a valid submission
        alert('Form submitted successfully!');
    };

    return (
        <div className="Sign">
            <div className="logo">
                <img src={logo} alt="" />
            </div>
            <div className="SignForm">
                <h2>SIGN UP</h2>
                <form action="" onSubmit={handleSubmit}>
                    <div className="InputField">
                        <input
                            placeholder="&#xF007; &nbsp; Full Name"
                            type="text"
                            className={`input ${fullNameRegex.test(name) ? 'valid' : 'invalid'}`}
                            onChange={handleChange('Please enter a valid Full name!', fullNameRegex, setName, 'name')}
                        />
                        {errors.name && <span className="InputError">{errors.name}</span>}
                    </div>
                    <div className="InputField">
                        <input
                            placeholder="&#xf0e0; &nbsp; Email"
                            type="email"
                            className={`input ${emailRegex.test(email) ? 'valid' : 'invalid'}`}
                            onChange={handleChange('Please enter a valid Email!', emailRegex, setEmail, 'email')}
                        />
                        {errors.email && <span className="InputError">{errors.email}</span>}
                    </div>
                    <div className="InputField">
                        <input
                            placeholder="&#xf095; &nbsp; Phone Number"
                            type="number"
                            className={`input ${phoneRegex.test(phone) ? 'valid' : 'invalid'}`}
                            onChange={handleChange('Please enter a valid Phone Number! (+60 11-111 1111)', phoneRegex, setPhone, 'phone')}
                        />
                        {errors.phone && <span className="InputError">{errors.phone}</span>}
                    </div>
                    <div className="InputField">
                        <input
                            placeholder="&#xf2c1; &nbsp; Matric Number"
                            type="text"
                            className={`input ${matricRegex.test(matric) ? 'valid' : 'invalid'} matric`}
                            onChange={handleChange('Please enter a valid Matric Number', matricRegex, setMatric, 'matric')}
                        />
                        {errors.matric && <span className="InputError">{errors.matric}</span>}
                    </div>
                    <div className="InputField">
                        <div className="PasswordContainer">
                            <input
                                placeholder="&#xf023; &nbsp; Password"
                                type={showPassword ? 'text' : 'password'}
                                className={`input ${passwordRegex.test(password) ? 'valid' : 'invalid'}`}
                                onChange={handleChange(
                                    <>
                                        - It has to be at least 8 characters long
                                        <br />
                                        - Contains both upper and lowercase letters
                                        <br />
                                        - Contains at least one digit
                                        <br />
                                        - Contains at least one special character
                                    </>,
                                    passwordRegex,
                                    setPassword,
                                    'password',
                                )}
                            />
                            <span className="TogglePass" onClick={handleTogglePassword}>
                                {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                            </span>
                        </div>
                        {errors.password && <span className="InputError password">{errors.password}</span>}
                    </div>
                    <div className="TermsContainer">
                        <label className="CheckboxLabel">
                            <input type="checkbox" className="CheckBox" required />
                            Agree to Terms and Conditions</label>
                    </div>
                    <button type="submit">Submit</button>

                    <div className="SignIn">
                        <p>Have an Account?</p>
                        <Link to="/hello" className="SignButton">
                            Sign In
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
