import './Profile.css'
import profile from '../../images/Profile.jpg'
import { Link, useLocation } from 'react-router-dom';
import { Icon } from '@iconify-icon/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCommentDots, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react'
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
    const { users = [], reviews = [], dispatch } = useItemsContext()

    const [userAddress, setUserAddress] = useState('')
    const [selectedUserImageText, setSelectedUserImageText] = useState(null);
    const [userImg, setUserImg] = useState(null);
    const [selectedPassportImageText, setSelectedPassportImageText] = useState(null);
    const [userPassportImg, setUserPassportImg] = useState(null);
    const [updating, setUpdating] = useState(false)
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false)
    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [userBankAccount, setUserBankAccount] = useState(null)
    const [userBankType, setUserBankType] = useState(null)
    const [userQrImage, setUserQrImage] = useState(null);
    const [selectedQrImageText, setSelectedQrImageText] = useState(null);

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

    const handleQrImgChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setUserQrImage(file);
            setSelectedQrImageText(file.name);
        }
    };

    const handleRemoveQrImage = (e) => {
        e.preventDefault();
        setUserQrImage(null);
        setSelectedQrImageText(null);
    }



    const handleCheckout = (user) => {
        const payload = {
            users: [user],
            userId: user.userId,
        };

        console.log('Payload:', payload);

        axios.post(`${api}/api/stripe/create-checkout-session`, payload)
            .then((res) => {
                if (res.data.url) {
                    window.location.href = res.data.url;
                }
            })
            .catch((err) => {
                console.error('Error:', err.response?.data || err.message);
            });
    };


    useEffect(() => {
        // Fetch form data based on type and formId
        const fetchData = async () => {
            try {
                const response = await fetch(`${api}/api/user/${user.userId}`, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                if (!response.ok) {
                    console.error(`Error fetching form data. Status: ${response.status}, ${response.statusText}`);
                    return;
                }

                const data = await response.json();
                dispatch({
                    type: 'GET_ITEM',
                    collection: "users",
                    payload: data,
                });
                setUserData(data);

                const reviewsResponse = await fetch(`${api}/api/reviews`, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                if (!reviewsResponse.ok) {
                    console.error(`Error fetching Items. Status: ${reviewsResponse.status}, ${reviewsResponse.statusText}`);
                    setError('Failed to fetch data');

                    return;
                }
                const reviewJson = await reviewsResponse.json()
                const reviewFilter = reviewJson.filter((review) => review.sellerID === user.userId)


                dispatch({
                    type: 'SET_ITEM',
                    collection: "reviews",
                    payload: reviewFilter,
                });


                const userResponse = await fetch(`${api}/api/user/`, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                if (!userResponse.ok) {
                    console.error(`Error fetching form data. Status: ${userResponse.status}, ${userResponse.statusText}`);
                    return;
                }

                const userData = await userResponse.json();
                dispatch({
                    type: 'SET_ITEM',
                    collection: "users",
                    payload: userData,
                });

            } catch (error) {
                console.error('An error occurred while fetching form data:', error);
            } finally {
                // Set loading to false once the data is fetched (success or error)
                setLoading(false);
            }
        };

        if (user) {
            fetchData();
        }
    }, [api, dispatch, user, userData]);



    const ReviewCard = ({ review, index }) => {
        const userFilter = users.find(reviewer => reviewer._id === review.reviewerID)
        return (
            <div className="ReviewCard">
                <div className="ReviewCardLeft">
                    {/* <div className="ReviewCardImg"> */}
                    <img src={userFilter?.userImage} alt="" />

                    {/* </div> */}
                    <p>{userFilter?.userFname}</p>
                </div>
                <div className="ReviewCardRight">
                    <p>{review.reviewComment}</p>
                    {/* <div className="SellerRatings">
                        <FontAwesomeIcon icon={faStar} className="Rating" />
                        <FontAwesomeIcon icon={faStar} className="Rating" />
                        <FontAwesomeIcon icon={faStar} className="Rating" />
                        <FontAwesomeIcon icon={faStar} className="Rating" />
                        <FontAwesomeIcon icon={faStar} />
                    </div> */}

                    <div className="SellerRatings">
                        {[...Array(5)].map((_, i) => (
                            <FontAwesomeIcon
                                key={i}
                                icon={faStar}
                                className={i < review.reviewRating ? 'Rating' : ''}
                            />
                        ))}


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
        let userQrUrl = await uploadFile('image', userQrImage)

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
                    userStatus: "Waiting",
                    userQrImage: userQrUrl,
                    user: userQrUrl,
                    userBankAccount: userBankAccount,
                    userBankType: userBankType,
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

                            <div className="InputField ">

                                <div className="InputLabelField">
                                    <input
                                        type="number"
                                        className={`input ${(userBankAccount) ? 'valid' : ''}`}
                                        onChange={(e) => { setUserBankAccount(e.target.value) }}
                                        required
                                        id="account"
                                        name="account"
                                    />
                                    {!userBankAccount && <label for="name" className={`LabelInput ${(userBankAccount) ? 'valid' : ''}`}><Icon icon="mdi:bank" />{languageText.BankAccount}</label>}
                                </div>
                            </div>
                            <div className="InputField">
                                <select
                                    className={`input ${(userBankType) ? 'valid' : ''}`}
                                    name="userBankType"
                                    required
                                    onChange={(e) => { setUserBankType(e.target.value) }}
                                >
                                    <option value="" disabled selected hidden>{languageText.BankType}</option>
                                    <option value="AEON Bank">AEON Bank</option>
                                    <option value="Affin Bank Berhad">Affin Bank Berhad</option>
                                    <option value="Al-Rajhi Banking">Al-Rajhi Banking</option>
                                    <option value="Alliance Bank">Alliance Bank</option>
                                    <option value="AmBank/AmFinance">AmBank/AmFinance</option>
                                    <option value="BNP Paribas">BNP Paribas</option>
                                    <option value="Bangkok Bank">Bangkok Bank</option>
                                    <option value="Bank Islam">Bank Islam</option>
                                    <option value="Bank Kerjasama">Bank Kerjasama</option>
                                    <option value="Bank Muamalat">Bank Muamalat</option>
                                    <option value="Bank Pertanian">Bank Pertanian</option>
                                    <option value="Bank Simpanan">Bank Simpanan</option>
                                    <option value="Bank of America">Bank of America</option>
                                    <option value="Bank of China">Bank of China</option>
                                    <option value="BigPay">BigPay</option>
                                    <option value="Boost Bank">Boost Bank</option>
                                    <option value="China Construction Bank">China Construction Bank</option>
                                    <option value="CIMB Bank">CIMB Bank</option>
                                    <option value="CitiBank">CitiBank</option>
                                    <option value="Deutshe Bank">Deutshe Bank</option>
                                    <option value="Finexus Cards">Finexus Cards</option>
                                    <option value="GXBank">GXBank</option>
                                    <option value="HSBC Bank">HSBC Bank</option>
                                    <option value="Hong Leong Bank">Hong Leong Bank</option>
                                    <option value="Industrial and Commercial Bank of China">Industrial and Commercial Bank of China</option>
                                    <option value="J.P. Morgan Chase Bank">J.P. Morgan Chase Bank</option>
                                    <option value="Kuwait Finance House">Kuwait Finance House</option>
                                    <option value="MBSB Bank">MBSB Bank</option>
                                    <option value="MUFG Bank">MUFG Bank</option>
                                    <option value="MayBank">MayBank</option>
                                    <option value="Merchantrade">Merchantrade</option>
                                    <option value="Mizhuo Corporate Bank">Mizhuo Corporate Bank</option>
                                    <option value="OCBC Bank">OCBC Bank</option>
                                    <option value="Public Bank">Public Bank</option>
                                    <option value="RHB Bank">RHB Bank</option>
                                    <option value="ShopeePay">ShopeePay</option>
                                    <option value="Standard Chartered Bank">Standard Chartered Bank</option>
                                    <option value="Sumitomo Mitsui Banking">Sumitomo Mitsui Banking</option>
                                    <option value="Touch N Go eWallet (TnG)">Touch N Go eWallet (TnG)</option>
                                    <option value="United Overseas Bank">United Overseas Bank</option>
                                </select>
                            </div>
                            <div className="InputField">

                                <label for="userQrImage" className={`LabelInputImg ${(userQrImage) ? 'valid' : ''}`}>
                                    <div style={{ gap: "8px", display: "flex", alignItems: "center" }}><Icon icon="clarity:qr-code-line" />{selectedQrImageText || languageText.QrCode}</div>
                                    {(userQrImage)
                                        ? <button className="XImgButton" onClick={handleRemoveQrImage}>
                                            <Icon icon="line-md:close-circle" />
                                        </button>
                                        : <Icon icon="line-md:upload-loop" />}
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    id="userQrImage"
                                    className={`input ${(userQrImage) ? 'valid' : ''}`}
                                    style={{ display: 'none' }}
                                    onChange={handleQrImgChange}
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
                {loading ? (
                    <div className="Loader">
                        <Loader />
                        <p className="LoaderText">{languageText.Loading}</p>
                    </div>
                ) : (
                    <div className="ProfileBack">
                        <div className="ProfileLeft">
                            <div className="ProfileImgContainer">
                                <img src={userData?.userImage} alt="" />
                                <div className="ProfileImgText">
                                    <h2>{userData?.userFname}</h2>
                                    <button onClick={() => { window.open(userData?.userQrImage, "_blank") }} className="PopButton ProductBuyButton">
                                        <span className="ProductToolTip ProductTip" >{languageText.QrCode}</span>
                                        <span><Icon icon="f7:qrcode-viewfinder" /></span>
                                    </button>
                                    <Link to="/editProfile" className="PopButton ProductBuyButton">
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
                                    <p className="ProfileInfoAddress">{userData?.userEmail}</p>
                                </div>
                                <div className="ProfileInfoField">
                                    <p><Icon icon="line-md:phone" /> {languageText.Phone}: </p>
                                    <p className="">{userData?.userPhoneNo}</p>

                                </div>
                                <div className="ProfileInfoField">
                                    <p><Icon icon="mdi:passport" /> {languageText.Passport}: </p>
                                    <p className="">{userData?.userPassport}</p>

                                </div>
                                <div className="ProfileInfoField">
                                    <p><Icon icon="line-md:my-location" /> {languageText.Address}: </p>
                                    <p className="ProfileInfoAddress">{userData?.userAddress}</p>

                                </div>
                                <div className="ProfileInfoField">
                                    <p><Icon icon="icon-park-outline:bank" /> {languageText.BankType}: </p>
                                    <p>{userData?.userBankType}</p>

                                </div>
                                <div className="ProfileInfoField">
                                    <p><Icon icon="mdi:bank" /> {languageText.BankAccount}: </p>
                                    <p>{userData?.userBankAccount}</p>

                                </div>
                            </div>
                        </div>
                        <div className="ProfileRight">
                            <h1>{languageText.Reviews}</h1>


                            {reviews && reviews.map((review) => (
                                <ReviewCard review={review} />

                            ))}

                            {reviews.length <= 0 && (
                                <div className="NoProductsContainer">
                                    <p><Icon icon="material-symbols:preview-off" />{languageText.NoReviews}</p>
                                </div>
                            )}


                        </div>

                        {userData?.userFine > 0 && (
                            <button className='PayFineButton' onClick={() => handleCheckout(userData)}><Icon icon="fa6-regular:money-bill-1" />{languageText.PayFine}: {userData?.userFine} {languageText.RM}</button>
                        )}
                    </div>
                )}
            </div>
        );
    }
}

export default Profile;