import React, { useState } from 'react';
import { Icon } from '@iconify-icon/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faStar, faCommentDots, faMoneyBill, faEnvelope, faPhone, faAddressBook, faLocation, faLocationPin, faLocationDot, faClose } from '@fortawesome/free-solid-svg-icons';
import { useItemsContext } from '../../hooks/useItemsContext'
import { useAuthContext } from '../../hooks/useAuthContext';
import Loader from "../Loader/Loader";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"

const Proof = ({ CloseProofForm, languageText, transaction, api }) => {
    const { users = [], transactions: [], dispatch } = useItemsContext()
    const { user } = useAuthContext()
    const [updating, setUpdating] = useState(false)


    const uploadFile = async (type, file) => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", type === 'image' ? 'products_preset' : '');

        try {
            let cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
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

    const handleProofUpdate = async (e) => {
        e.preventDefault();
        setUpdating(true)
        const imgUrl = await uploadFile('image', proofImg);

        try {

            const response = await fetch(`${api}/api/transactions/${transaction._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({
                    proof: imgUrl,
                    transactionStatus: "Pending"
                }),
            });


            if (!response.ok) {
                console.error(`Error updating form status. Status: ${response.status}, ${response.statusText}`);
                return;
            }

            const updatedData = await response.json();
            dispatch({
                type: 'UPDATE_ITEM',
                collection: 'users',
                payload: { id: transaction._id, changes: updatedData },
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

                });
            }
            setUpdating(false)
            CloseProofForm()

        } catch (error) {
            console.error('An error occurred while updating form status:', error);
        }

    };

    const [proofImg, setProofImg] = useState('')
    const [selectedImageText, setSelectedImageText] = useState(null);

    const handleImgChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setProofImg(file);
            setSelectedImageText(file.name);
        }
    };

    const handleRemoveImage = (e) => {
        e.preventDefault();
        setProofImg(null);
        setSelectedImageText(null);
    }

    return (
        <div className="PurchaseFormPopup">
            {updating ? (
                <div className="Loader">
                    <Loader />
                    <p className="LoaderText">{languageText.Submitting}</p>
                </div>
            ) : (<>
                <h3>Upload the Proof</h3>
                <form className='Form' onSubmit={handleProofUpdate}>


                    <div className="InputField">

                        <label for="img" className={`LabelInputImg ${(proofImg) ? 'valid' : ''}`}>
                            <div style={{ gap: "8px", display: "flex", alignItems: "center" }}><Icon icon="line-md:image" />{selectedImageText || languageText.ProductImage}</div>
                            {(proofImg)
                                ? <button className="XImgButton" onClick={handleRemoveImage}>
                                    <Icon icon="line-md:close-circle" />
                                </button>
                                : <Icon icon="line-md:upload-loop" />}
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            id="img"
                            className={`input ${(proofImg) ? 'valid' : ''}`}
                            style={{ display: 'none' }}
                            onChange={handleImgChange}
                        />
                    </div>




                    <button className='Submit' >
                        {languageText.SubmitProof}
                    </button>
                </form>
                {/* <button onClick={closePurchaseForm} className="ClosePurchaseForm"><FontAwesomeIcon icon={faClose} /></button> */}
                <button className="PopButton ClosePurchaseForm" onClick={CloseProofForm}>
                    <span className="ProductToolTip" >Close</span>
                    <span><FontAwesomeIcon icon={faClose} /></span>
                </button>

            </>
            )}

        </div>
    );
}

export default Proof;