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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Icon } from '@iconify/react';
import { useRegister } from '../../hooks/useRegister';
import Loader from '../../components/Loader/Loader'

const SignUp = ({ api, languageText }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [passport, setPassport] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };
    const { register, loading, error } = useRegister(api)

    const MySwal = withReactContent(Swal);

    const fullNameRegex = /^[a-zA-Z\s'-]{2,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(?:\+60|60)(?:(1[0-9])|(?:3[2-9]|4[2-9]|5[4-9]|6[2-9]|7[3-9]|8[2-9]|9[2-9]))\d{7,8}$/;
    // const passportRegex = /^[A-Za-z][2][0-4][A-Za-z]{2}\d{4}$/;
    const passportRegex = /^[a-zA-Z0-9]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;


    const letterRegex = /^(?=.*[a-z])(?=.*[A-Z]).+$/;
    const charRegex = /^.{8,}$/;

    const digitRegex = /.*\d.*/;
    const specialRegex = /[!@#$%&*_+\-=[\];':"\\|,./?]/;







    const handleSubmit = async (e) => {
        e.preventDefault();

        await register({
            userEmail: email,
            userFname: name,
            userPassword: password,
            userPhoneNo: phone,
            userPassport: passport,
            userStatus: "Pending",
            userType: "user",
            userPassportImage: "",
            userImage: "",
            userAddress: "",
            userFine: "",
            userError: "",

        });
    }



    // const handleChange = (errorText, regex, setter, field) => (e) => {
    //     const newInput = e.target.value;
    //     setter(newInput);

    //     if (newInput.trim() === '') {
    //         setErrors((prevErrors) => ({ ...prevErrors, [field]: null }));
    //     } else if (regex.test(newInput)) {
    //         setErrors((prevErrors) => ({ ...prevErrors, [field]: null }));
    //     } else {
    //         setErrors((prevErrors) => ({ ...prevErrors, [field]: errorText }));
    //     }
    // };

    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     // Check for invalid fields
    //     const fieldErrors = {
    //         name: !fullNameRegex.test(name) ? 'Please enter a valid Full name!' : null,
    //         email: !emailRegex.test(email) ? 'Please enter a valid Email!' : null,
    //         phone: !phoneRegex.test(phone) ? 'Please enter a valid Phone Number! (+60 11-111 1111)' : null,
    //         passport: !passportRegex.test(passport) ? 'Please enter a valid Passport Number' : null,
    //         password: !passwordRegex.test(password) ? (
    //             <>
    //                 - It has to be at least 8 characters long
    //                 <br />
    //                 - Contains both upper and lowercase letters
    //                 <br />
    //                 - Contains at least one digit
    //                 <br />
    //                 - Contains at least one special character
    //             </>
    //         ) : null,
    //     };

    //     setErrors(fieldErrors);

    //     if (Object.values(fieldErrors).some((value) => value !== null)) {
    //         MySwal.fire({
    //             title: 'Make sure every field is Correct',
    //             showDenyButton: true,
    //             icon: 'error',
    //             showConfirmButton: false,
    //             denyButtonText: 'Ok',
    //             showClass: {
    //                 popup: 'animate__animated animate__fadeInUp animate__faster',
    //             },
    //             hideClass: {
    //                 popup: 'animate__animated animate__fadeOutDown animate__faster',
    //             },
    //         });


    //         return;
    //     }

    //     else {
    //         toast.success('Account Created Successfully', {
    //             position: "bottom-right",
    //             autoClose: 3000,
    //             hideProgressBar: true,
    //             closeOnClick: true,
    //             pauseOnHover: true,
    //             draggable: true,
    //             progress: undefined,
    //             theme: "colored",
    //         });
    //     }
    // };



    return (
        <div className="Sign">
            <div className="logo">
                <img src={logo} alt="" />
            </div>
            {loading ? (
                <div className="Loader">
                    <Loader />
                    <p className="LoaderText">{languageText.Registering}</p>
                </div>
            ) : (
                <div className="SignForm">
                    <h2>SIGN UP</h2>
                    <form action="" onSubmit={handleSubmit}>
                        <div className="InputField">
                            <input
                                placeholder=" &#xF007; &nbsp; Full Name"
                                type="text"
                                className={`input ${fullNameRegex.test(name) ? 'valid' : 'invalid'}`}
                                // onChange={handleChange('Please enter a valid Full name!', fullNameRegex, setName, 'name')}
                                onChange={(e) => { setName(e.target.value) }}
                            />
                            {/* {errors.name && <span className="InputError">{errors.name}</span>} */}
                            {!fullNameRegex.test(name) && name && <div className={`PasswordCheckBack 
                        ${fullNameRegex.test(name) ? "PasswordCheckBackValid" : ""
                                }`}>
                                <p className={`PasswordCheck ${fullNameRegex.test(name) ? "PasswordCheckerValid" : ''}`}>
                                    {fullNameRegex.test(name) ? <Icon icon="mingcute:check-2-fill" className="PasswordIcon" /> : <Icon icon="icon-park-twotone:error" className="PasswordIcon" />} Enter a Valid Name
                                </p>
                            </div>}
                        </div>
                        <div className="InputField">
                            <input
                                placeholder=" &#xf0e0; &nbsp; Email"
                                type="email"
                                className={`input ${emailRegex.test(email) ? 'valid' : 'invalid'}`}
                                // onChange={handleChange('Please enter a valid Email!', emailRegex, setEmail, 'email')}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {/* {errors.email && <span className="InputError">{errors.email}</span>} */}
                            {!emailRegex.test(email) && email && <div className={`PasswordCheckBack 
                        ${emailRegex.test(email) ? "PasswordCheckBackValid" : ""
                                }`}>
                                <p className={`PasswordCheck ${emailRegex.test(email) ? "PasswordCheckerValid" : ''}`}>
                                    {emailRegex.test(email) ? <Icon icon="mingcute:check-2-fill" className="PasswordIcon" /> : <Icon icon="icon-park-twotone:error" className="PasswordIcon" />} Enter a Valid Email
                                </p>
                            </div>}
                        </div>
                        <div className="InputField">
                            <input
                                placeholder=" &#xf095; &nbsp; Phone Number"
                                type="number"
                                className={`input ${phoneRegex.test(phone) ? 'valid' : 'invalid'}`}
                                // onChange={handleChange('Please enter a valid Phone Number! (+60 11-111 1111)', phoneRegex, setPhone, 'phone')}
                                onChange={(e) => setPhone(e.target.value)}

                            />
                            {/* {errors.phone && <span className="InputError">{errors.phone}</span>} */}
                            {!phoneRegex.test(phone) && phone && <div className={`PasswordCheckBack 
                        ${phoneRegex.test(phone) ? "PasswordCheckBackValid" : ""
                                }`}>
                                <p className={`PasswordCheck ${phoneRegex.test(phone) ? "PasswordCheckerValid" : ''}`}>
                                    {phoneRegex.test(phone) ? <Icon icon="mingcute:check-2-fill" className="PasswordIcon" /> : <Icon icon="icon-park-twotone:error" className="PasswordIcon" />} Phone No. Should Be starting with 60
                                </p>
                            </div>}
                        </div>
                        <div className="InputField">
                            <input
                                placeholder=" &#xf0ac; &nbsp; Passport Number"
                                type="text"
                                className={`input ${passportRegex.test(passport) ? 'valid' : 'invalid'} passport`}
                                // onChange={handleChange('Please enter a valid Passport Number', passportRegex, setPassport, 'passport')}
                                onChange={(e) => setPassport(e.target.value)}

                            />
                            {errors.passport && <span className="InputError">{errors.passport}</span>}
                        </div>
                        <div className="InputField">
                            <div className="PasswordContainer">
                                <input
                                    placeholder=" &#xf023; &nbsp; Password"
                                    type={showPassword ? 'text' : 'password'}
                                    className={`input ${passwordRegex.test(password) ? 'valid' : 'invalid'}`}
                                    // onChange={handleChange(
                                    //     <>
                                    //         - It has to be at least 8 characters long
                                    //         <br />
                                    //         - Contains both upper and lowercase letters
                                    //         <br />
                                    //         - Contains at least one digit
                                    //         <br />
                                    //         - Contains at least one special character
                                    //     </>,
                                    //     passwordRegex,
                                    //     setPassword,
                                    //     'password',
                                    // )}

                                    onChange={(e) => setPassword(e.target.value)}

                                />
                                <span className="TogglePass" onClick={handleTogglePassword}>
                                    {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                                </span>
                            </div>
                            {/* {errors.password && <span className="InputError password">{errors.password}</span>} */}

                            {password && <div className={`PasswordCheckBack 
                        ${charRegex.test(password) &&
                                    letterRegex.test(password) &&
                                    digitRegex.test(password) &&
                                    specialRegex.test(password) ? "PasswordCheckBackValid" : ""
                                }`}>
                                <p className={`PasswordCheck ${charRegex.test(password) ? "PasswordCheckerValid" : ''}`}>
                                    {charRegex.test(password) ? <Icon icon="mingcute:check-2-fill" className="PasswordIcon" /> : <Icon icon="icon-park-twotone:error" className="PasswordIcon" />} {languageText.CharRegex}
                                </p>
                                <p className={`PasswordCheck ${letterRegex.test(password) ? "PasswordCheckerValid" : ''}`}>
                                    {letterRegex.test(password) ? <Icon icon="mingcute:check-2-fill" className="PasswordIcon" /> : <Icon icon="icon-park-twotone:error" className="PasswordIcon" />} {languageText.LetterRegex}
                                </p>
                                <p className={`PasswordCheck ${digitRegex.test(password) ? "PasswordCheckerValid" : ''}`}>
                                    {digitRegex.test(password) ? <Icon icon="mingcute:check-2-fill" className="PasswordIcon" /> : <Icon icon="icon-park-twotone:error" className="PasswordIcon" />} {languageText.DigitRegex}
                                </p>
                                <p className={`PasswordCheck ${specialRegex.test(password) ? "PasswordCheckerValid" : ''}`}>
                                    {specialRegex.test(password) ? <Icon icon="mingcute:check-2-fill" className="PasswordIcon" /> : <Icon icon="icon-park-twotone:error" className="PasswordIcon" />} {languageText.SpecialRegex}
                                </p>
                            </div>}
                        </div>
                        <div className="TermsContainer">
                            <label className="CheckboxLabel">
                                <input type="checkbox" className="CheckBox" required />
                                Agree to Terms and Conditions</label>
                        </div>
                        <button disabled={loading}>Sign Up</button>

                        <div className="SignIn">
                            <p>Have an Account?</p>
                            <Link to="/SignIn" className="SignButton">
                                Sign In
                            </Link>

                        </div>
                        {error && <div className="formError"><Icon icon="ooui:error" />{error}</div>}
                    </form>
                </div>
            )}
        </div>
    );
};

export default SignUp;
