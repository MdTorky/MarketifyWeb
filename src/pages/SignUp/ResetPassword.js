import './Sign.css'
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import 'font-awesome/css/font-awesome.min.css';
import { Link, useParams } from 'react-router-dom';
import logo from '../../images/logo2.png';
import { useResetPassword } from '../../hooks/useResetPassword';
import { Icon } from '@iconify/react';
import Loader from '../../components/Loader/Loader'
import { useAuthContext } from '../../hooks/useAuthContext';



const ResetPassword = ({ api, languageText }) => {
    const { id } = useParams()
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { resetPassword, error, isLoading } = useResetPassword(api);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };
    const handleToggleConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    const letterRegex = /^(?=.*[a-z])(?=.*[A-Z]).+$/;
    const charRegex = /^.{8,}$/;

    const digitRegex = /.*\d.*/;
    const specialRegex = /[!@#$%&*_+\-=[\];':"\\|,./?]/;

    const handleSubmit = async (e) => {
        e.preventDefault();

        await resetPassword({
            userPassword: password,
            id: id
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
                    <p className="LoaderText">"Sending"</p>
                </div>
            ) : (
                <div className="SignForm">
                    <h2>Reset Password</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="InputField">
                            <div className="PasswordContainer">
                                <input
                                    placeholder=" &#xf023; &nbsp; New Password"
                                    type={showPassword ? 'text' : 'password'}
                                    className={`input ${passwordRegex.test(password) ? 'valid' : 'invalid'}`}
                                    onChange={(e) => { setPassword(e.target.value) }}

                                />
                                <span className="TogglePass" onClick={handleTogglePassword}>
                                    {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                                </span>
                            </div>

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

                        <div className="InputField">
                            <div className="PasswordContainer">
                                <input
                                    placeholder=" &#xf023; &nbsp; Confirm Password"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    className={`input ${passwordRegex.test(confirmPassword) ? 'valid' : 'invalid'}`}
                                    onChange={(e) => { setConfirmPassword(e.target.value) }}

                                />
                                <span className="TogglePass" onClick={handleToggleConfirmPassword}>
                                    {showConfirmPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                                </span>
                            </div>
                            {confirmPassword != password && confirmPassword && <div className={`PasswordCheckBack 
                        ${confirmPassword === password ? "PasswordCheckBackValid" : ""
                                }`}>
                                <p className={`PasswordCheck ${confirmPassword === password ? "PasswordCheckerValid" : ''}`}>
                                    {confirmPassword === password ? <Icon icon="mingcute:check-2-fill" className="PasswordIcon" /> : <Icon icon="icon-park-twotone:error" className="PasswordIcon" />} The Password Doesn't Match
                                </p>
                            </div>}
                        </div>
                        {confirmPassword == password && password && confirmPassword && <button type="submit">Submit</button>}
                        {error && <div className="formError"><Icon icon="ooui:error" />{error}</div>}

                    </form>
                </div>
            )}
        </div>
    );
}

export default ResetPassword;