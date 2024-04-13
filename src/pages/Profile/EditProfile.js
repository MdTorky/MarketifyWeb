import React from 'react'
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

const EditProfile = ({ languageText, api }) => {

    const { user } = useAuthContext()
    const { users = [], dispatch } = useItemsContext()

    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false)
    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [updating, setUpdating] = useState(false)
    const [userImg, setUserImg] = useState(null);
    const [selectedImageText, setSelectedImageText] = useState(null);


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
    }, [api, dispatch]);










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

        // let userImgUrl = await uploadFile('image', userImg)
        let userImgUrl = userData.userImage
        if (userImg) {
            userImgUrl = await uploadFile('image', userData.userImage)
        }

        try {

            const response = await fetch(`${api}/api/user/${user.userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userAddress: userData.userAddress,
                    userImage: userImgUrl,
                    userFname: userData.userFname,
                    userPhoneNo: userData.userPhoneNo
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
                payload: { id: userData._id, changes: updatedData },
            });

            {
                toast.success(`${languageText.ProfileUpdatedSuccessfully}`, {
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


        } catch (error) {
            console.error('An error occurred while updating form status:', error);
        }
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };


    const handleImgChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setUserData((prevForm) => ({
                ...prevForm,
                userImage: file,
            }));
            setSelectedImageText(file.name);
            setUserImg(file)
        }
    };

    const handleRemoveImage = () => {
        setUserData((prevForm) => ({
            ...prevForm,
            userImage: null,
        }));
        setSelectedImageText(null);
    }


    const fullNameRegex = /^[a-zA-Z\s'-]{2,}$/;

    const phoneRegex = /^(?:\+60|60)(?:(1[0-9])|(?:3[2-9]|4[2-9]|5[4-9]|6[2-9]|7[3-9]|8[2-9]|9[2-9]))\d{7,8}$/;


    return (

        <div className="Sell">
            {updating ? (
                <div className="Loader">
                    <Loader />
                    <p className="LoaderText">{languageText.Updating}</p>
                </div>
            ) : (
                loading ? (
                    <div className="Loader">
                        <Loader />
                        <p className="LoaderText">{languageText.Loading}</p>
                    </div>
                ) : (
                    <div className="SellFormContainer">
                        <h2>{languageText.EditProfile}</h2>
                        <form className='Form' onSubmit={handleUpdate}>

                            <img src={userData.userImage} className='EditUserImage' alt="" />

                            <div className="InputField">
                                <div className="InputLabelField">
                                    <input
                                        type="text"
                                        className={`input ${fullNameRegex.test((userData.userFname)) ? 'valid' : 'invalid'}`}
                                        required
                                        value={userData.userFname}
                                        id="UserFname"
                                        name="userFname"
                                        onChange={handleInputChange}
                                        style={{
                                            direction: "ltr"
                                        }}

                                    />
                                    {!userData.userFname && <label htmlFor="userFname" className={`LabelInput ${(userData.userFname) ? 'valid' : ''}`}><Icon icon="bx:rename" />  {languageText.FullName}</label>}
                                </div>
                            </div>
                            {!fullNameRegex.test(userData.userFname) && userData.userFname &&
                                <div className={`PasswordCheckBack ${fullNameRegex.test(userData.userFname) ? "PasswordCheckBackValid" : ""}`}>
                                    <p className={`PasswordCheck ${fullNameRegex.test(userData.userFname) ? "PasswordCheckerValid" : ''}`}>
                                        {fullNameRegex.test(userData.userFname) ? <Icon icon="mingcute:check-2-fill" className="PasswordIcon" /> : <Icon icon="icon-park-twotone:error" className="PasswordIcon" />} Enter a Valid Name
                                    </p>
                                </div>}
                            <div className="InputField">
                                <div className="InputLabelField">
                                    <input
                                        type="number"
                                        className={`input ${(phoneRegex.test(userData.userPhoneNo)) ? 'valid' : 'invalid'}`}
                                        required
                                        value={userData.userPhoneNo}
                                        id="userPhoneNo"
                                        name="userPhoneNo"
                                        onChange={handleInputChange}
                                        style={{
                                            direction: "ltr"
                                        }}

                                    />

                                    {!userData.userPhoneNo && <label htmlFor="userFname" className={`LabelInput ${(userData.userPhoneNo) ? 'valid' : ''}`}><Icon icon="bi:phone-fill" />{languageText.PhoneNo}</label>}
                                </div>

                            </div>
                            {!phoneRegex.test(userData.userPhoneNo) && userData.userPhoneNo && <div className={`PasswordCheckBack 
                                ${phoneRegex.test(userData.userPhoneNo) ? "PasswordCheckBackValid" : ""
                                }`}>
                                <p className={`PasswordCheck ${phoneRegex.test(userData.userPhoneNo) ? "PasswordCheckerValid" : ''}`}>
                                    {phoneRegex.test(userData.userPhoneNo) ? <Icon icon="mingcute:check-2-fill" className="PasswordIcon" /> : <Icon icon="icon-park-twotone:error" className="PasswordIcon" />} Enter a Valid Phone Number
                                </p>
                            </div>}
                            <div className="InputField">
                                <div className="InputLabelField">
                                    <input
                                        type="text"
                                        className={`input ${(userData.userAddress) ? 'valid' : ''}`}
                                        required
                                        value={userData.userAddress}
                                        id="userAddress"
                                        name="userAddress"
                                        onChange={handleInputChange}
                                        style={{
                                            direction: "ltr"
                                        }}

                                    />
                                    {!userData.userAddress && <label htmlFor="userAddress" className={`LabelInput ${(userData.userAddress) ? 'valid' : ''}`}><Icon icon="entypo:address" />{languageText.Address}</label>}
                                </div>
                            </div>

                            <div className="InputField">

                                <label for="img" className={`LabelInputImg ${(userData.userImage) ? 'valid' : ''}`}>
                                    <div style={{ gap: "8px", display: "flex", alignItems: "center" }}><Icon icon="iconamoon:profile-circle-duotone" />{selectedImageText || languageText.ProfileImage}</div>
                                    {(userData.userImage)
                                        ? <button className="XImgButton" onClick={handleRemoveImage}>
                                            <Icon icon="line-md:close-circle" />
                                        </button>
                                        : <Icon icon="line-md:upload-loop" />}
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    id="img"
                                    className={`input ${(userData.userImage) ? 'valid' : ''}`}
                                    style={{ display: 'none' }}
                                    onChange={handleImgChange}
                                // value={form.eventImg}
                                />
                            </div>
                            {phoneRegex.test(userData.userPhoneNo) && fullNameRegex.test(userData.userFname) && <button className='SubmitButton'>{languageText.Submit}</button>}

                        </form>
                    </div>
                ))}
        </div>
    )
}

export default EditProfile
