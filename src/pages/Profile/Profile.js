import './Profile.css'
import profile from '../../images/Profile.jpg'
import { Link, useLocation } from 'react-router-dom';
import { Icon } from '@iconify-icon/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCommentDots, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react'
import { useLogout } from '../../hooks/useLogout';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useItemsContext } from '../../hooks/useItemsContext'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../components/Loader/Loader'

const Profile = ({ languageText, api }) => {
    const { user } = useAuthContext()
    const { logout } = useLogout()
    const handleLogout = () => {
        logout()
    }
    const { users = [], dispatch } = useItemsContext()

    const [userAddress, setUserAddress] = useState('')
    const [selectedUserImageText, setSelectedUserImageText] = useState(null);
    const [userImg, setUserImg] = useState(null);
    const [selectedPassportImageText, setSelectedPassportImageText] = useState(null);
    const [userPassportImg, setUserPassportImg] = useState(null);
    const [updating, setUpdating] = useState(false)
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






    const uploadFile = async (type, file) => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", type === 'image' ? 'images_preset' : '');

        try {
            let cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
            // console.log('Cloud Name:', process.env.REACT_APP_CLOUDINARY_CLOUD_NAME);
            let resourceType = type === 'image' ? 'image' : 'video';
            let api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

            const res = await axios.post(api, data);
            const { secure_url } = res.data;
            console.log(secure_url);
            return secure_url;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }


    const handleUpdate = async (e) => {
        e.preventDefault();
        setUpdating(true);

        let userImgUrl = await uploadFile('image', userImg)
        let userPassportUrl = await uploadFile('image', userPassportImg)

        try {

            const response = await fetch(`${api}/api/user/${user.userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userAddress: userAddress,
                    userImage: userImgUrl,
                    userPassportImage: userPassportUrl,
                    userStatus: "Waiting"
                }),
            });

            // console.log('API Response:', response);

            if (!response.ok) {
                console.error(`Error updating form status. Status: ${response.status}, ${response.statusText}`);
                return;
            }

            // Assuming the API response contains the updated form data
            const updatedData = await response.json();
            // console.log('Updated Form Data:', updatedMemberData);
            dispatch({
                type: 'UPDATE_ITEM',
                collection: 'users',
                payload: { id: user.userId, changes: updatedData },
            });

            {
                toast.success(`${languageText.InformationAddedSuccessfully}`, {
                    position: "bottom-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    // style: {
                    //     fontFamily: language === 'ar' ?
                    //         'Noto Kufi Arabic, sans-serif' :
                    //         'Poppins, sans-serif',
                    // },
                });
            }
            setUpdating(false);
            logout()


        } catch (error) {
            console.error('An error occurred while updating form status:', error);
        }
    };





    if (user.userStatus === 'Pending') {
        return (

            <div className="Sell">
                {updating ? (
                    <div className="Loader">
                        <Loader />
                        <p className="LoaderText">{languageText.Updating}</p>
                    </div>
                ) : (<>
                    <div className="SellFormContainer">
                        <h2>{languageText.ProfileForm}</h2>

                        <form className='Form' onSubmit={handleUpdate}>

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
                                    required
                                    onChange={handleUserImgChange}
                                />
                            </div>

                            <div className="InputField">

                                <label for="userPassportImg" className={`LabelInputImg ${(userPassportImg) ? 'valid' : ''}`}>
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
                                    required

                                />
                            </div>
                            <button className='SubmitButton'>{languageText.Submit}</button>
                        </form>
                    </div>
                </>
                )}
            </div>
        )

    }
    else if (user.userStatus === "Waiting") {
        return (
            <div className="Sell">
                <div className="SellFormContainer">
                    <div className="ApprovalIconContainer">
                        <Icon icon="material-symbols:approval-outline-rounded" className="ApprovalIcon" />
                    </div>
                    <div className="ApprovalText">
                        <h3>{languageText.UnderEvaluation}</h3>
                        <p>{languageText.ValidAccount}</p>
                    </div>
                    {/* <h2>{languageText.ProfileForm}</h2> */}


                </div>
            </div>
        )
    }
    else if (user.userStatus === "Inactive") {
        return (
            <div className="Sell">
                <div className="SellFormContainer">
                    <div className="ApprovalIconContainer">
                        <Icon icon="material-symbols:account-circle-off-outline-rounded" className="ApprovalIcon" />
                    </div>
                    <div className="ApprovalText">
                        <h3>{languageText.Deactivated}</h3>
                        <p>{languageText.DeactivatedDescription}</p>
                    </div>
                    <h2>{user.userError}</h2>


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
                            <img src={user.userImage} alt="" />
                            <div className="ProfileImgText">
                                <h2>{user.userFname}</h2>
                                <Link className="PopButton ProductBuyButton">
                                    <span className="ProductToolTip ProductTip" >{languageText.Edit}</span>
                                    <span><Icon icon="mingcute:user-edit-fill" /></span>
                                </Link>
                                {/* <button className="PopButton ProductBuyButton" onClick={handleLogout}>
                                    <span className="ProductToolTip ProductTip" >{languageText.Logout}</span>
                                    <span><Icon icon="solar:logout-broken" /></span>
                                </button> */}
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