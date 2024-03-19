import './Profile.css'
import profile from '../../images/Profile.jpg'
import { Link, useLocation } from 'react-router-dom';
import { Icon } from '@iconify-icon/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCommentDots, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react'
import { useLogout } from '../../hooks/useLogout';
import { useAuthContext } from '../../hooks/useAuthContext';

const Profile = ({ languageText }) => {
    const { user } = useAuthContext()
    const { logout } = useLogout()
    const handleLogout = () => {
        logout()
    }
    const [userAddress, setUserAddress] = useState('')
    const [selectedUserImageText, setSelectedUserImageText] = useState(null);
    const [userImg, setUserImg] = useState(null);
    const [selectedPassportImageText, setSelectedPassportImageText] = useState(null);
    const [userPassportImg, setUserPassportImg] = useState(null);

    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false)

    const handleUserImgChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setUserImg(file);
            setSelectedUserImageText(file.name);
        }
    };

    const handleRemoveUserImage = (e) => {
        e.preventDefault();
        setUserImg(null);
        setSelectedUserImageText(null);
    }


    const handlePassportImgChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setUserPassportImg(file);
            setSelectedPassportImageText(file.name);
        }
    };

    const handleRemovePassportImage = (e) => {
        e.preventDefault();
        setUserPassportImg(null);
        setSelectedPassportImageText(null);
    }

    const ReviewCard = () => {

        return (
            <div className="ReviewCard">
                <div className="ReviewCardLeft">
                    {/* <div className="ReviewCardImg"> */}
                    <img src={profile} alt="" />

                    {/* </div> */}
                    <p>Mohamed</p>
                </div>
                <div className="ReviewCardRight">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti saepe fuga hic, reprehenderit pariatur optio eos ducimus molestiae exercitationem est.</p>
                    <div class="SellerRatings">
                        <FontAwesomeIcon icon={faStar} className="Rating" />
                        <FontAwesomeIcon icon={faStar} className="Rating" />
                        <FontAwesomeIcon icon={faStar} className="Rating" />
                        <FontAwesomeIcon icon={faStar} className="Rating" />
                        <FontAwesomeIcon icon={faStar} />
                    </div>
                </div>
            </div>
        )
    }


    if (user.userStatus === 'Pendidng') {
        return (
            <div className="Sell">
                <div className="SellFormContainer">
                    <h2>{languageText.ProfileForm}</h2>

                    <form className='Form'>
                        <div className="InputField ">

                            <div className="InputLabelField">
                                <input
                                    type="text"
                                    className={`input ${(userAddress) ? 'valid' : ''}`}
                                    onChange={(e) => { setUserAddress(e.target.value) }}
                                    required
                                    id="address"
                                    name="address"
                                />
                                {!userAddress && <label for="name" className={`LabelInput ${(userAddress) ? 'valid' : ''}`}><Icon icon="entypo:address" />{languageText.Address}</label>}
                            </div>
                        </div>

                        <div className="InputField">

                            <label for="userImg" className={`LabelInputImg ${(userImg) ? 'valid' : ''}`}>
                                <div style={{ gap: "8px", display: "flex", alignItems: "center" }}><Icon icon="iconamoon:profile-circle-duotone" />{selectedUserImageText || languageText.ProfileImage}</div>
                                {(userImg)
                                    ? <button className="XImgButton" onClick={handleRemoveUserImage}>
                                        <Icon icon="line-md:close-circle" />
                                    </button>
                                    : <Icon icon="line-md:upload-loop" />}
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                id="userImg"
                                className={`input ${(userImg) ? 'valid' : ''}`}
                                style={{ display: 'none' }}
                                onChange={handleUserImgChange}
                            />
                        </div>

                        <div className="InputField">

                            <label for="img" className={`LabelInputImg ${(userPassportImg) ? 'valid' : ''}`}>
                                <div style={{ gap: "8px", display: "flex", alignItems: "center" }}><Icon icon="mdi:passport" />{selectedPassportImageText || languageText.PassportImage}</div>
                                {(userPassportImg)
                                    ? <button className="XImgButton" onClick={handleRemovePassportImage}>
                                        <Icon icon="line-md:close-circle" />
                                    </button>
                                    : <Icon icon="line-md:upload-loop" />}
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                id="userPassportImg"
                                className={`input ${(userPassportImg) ? 'valid' : ''}`}
                                style={{ display: 'none' }}
                                onChange={handlePassportImgChange}
                            />
                        </div>
                        <button className='SubmitButton'>{languageText.Submit}</button>
                    </form>
                </div>
            </div>
        )
    }
    else {
        return (

            <div className="Profile">
                <div className="ProfileBack">
                    <div className="ProfileLeft">
                        <div className="ProfileImgContainer">
                            <img src={profile} alt="" />
                            <div className="ProfileImgText">
                                <h2>{user.userFname}</h2>
                                <Link className="PopButton ProductBuyButton">
                                    <span className="ProductToolTip ProductTip" >{languageText.Edit}</span>
                                    <span><Icon icon="mingcute:user-edit-fill" /></span>
                                </Link>
                                <button className="PopButton ProductBuyButton" onClick={handleLogout}>
                                    <span className="ProductToolTip ProductTip" >{languageText.Logout}</span>
                                    <span><Icon icon="solar:logout-broken" /></span>
                                </button>
                                {/* <Link to="/" className='EditButton'><Icon icon="mingcute:user-edit-fill" /> </Link> */}
                                {/* <button onClick={handleLogout} className='EditButton'><Icon icon="solar:logout-broken" /> </button> */}
                            </div>
                        </div>
                        <div className="ProfileInfo">
                            <div className="ProfileInfoField">
                                <p><Icon icon="line-md:email" /> {languageText.Email}: </p>
                                <p className="ProfileInfoAddress">{user.userEmail}</p>
                            </div>
                            <div className="ProfileInfoField">
                                <p><Icon icon="line-md:phone" /> {languageText.Phone}: </p>
                                <p className="">{user.userPhoneNo}</p>

                            </div>
                            <div className="ProfileInfoField">
                                <p><Icon icon="mdi:passport" /> {languageText.Passport}: </p>
                                <p className="">{user.userPassport}</p>

                            </div>
                            <div className="ProfileInfoField">
                                <p><Icon icon="line-md:my-location" /> {languageText.Address}: </p>
                                <p className="ProfileInfoAddress">{user.userAddress}</p>

                            </div>
                        </div>
                    </div>
                    <div className="ProfileRight">
                        <h1>{languageText.Reviews}</h1>

                        {ReviewCard()}
                        {ReviewCard()}

                    </div>

                    {user.userFine && (
                        <button className='PayFineButton'><Icon icon="fa6-regular:money-bill-1" />{languageText.PayFine}: {user.userFine} {languageText.RM}</button>
                    )}
                </div>
            </div>
        );
    }
}

export default Profile;