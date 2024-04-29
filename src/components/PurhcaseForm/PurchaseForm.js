
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faStar, faCommentDots, faMoneyBill, faEnvelope, faPhone, faAddressBook, faLocation, faLocationPin, faLocationDot, faClose } from '@fortawesome/free-solid-svg-icons';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useItemsContext } from '../../hooks/useItemsContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const PurchaseForm = ({ closePurchaseForm, api, product, languageText }) => {
    const navigate = useNavigate();
    const { user } = useAuthContext()
    const [paymentMethod, setPaymentMethod] = useState('')
    const { products = [], transactions = [], dispatch } = useItemsContext();
    const [error, setError] = useState(null)


    const handlePurchaseSubmit = async (e) => {
        e.preventDefault();


        if (!user) {
            setError(languageText.YouMustBeLoggedIn)
        }
        else {

            const item = {
                sellerID: product.userID,
                buyerID: user.userId,
                productID: product._id,
                paymentMethod
            }

            const response = await fetch(`${api}/api/transactions`, {
                method: "POST",
                body: JSON.stringify(item),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`

                }
            })
            const json = await response.json()


            const statusResponse = await fetch(`${api}/api/products/${product._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({
                    pStatus: "Unavailable"
                }),
            });
            const updatedData = await statusResponse.json();
            dispatch({
                type: 'UPDATE_ITEM',
                collection: 'products',
                payload: { id: product._id, changes: updatedData },
            });



            const notificationItem = {
                type: 'purchase',
                sender: user.userId,
                receiver: product.userID,
                product: product._id,
                content: "has been Purchased",
                status: 'unseen'
            }

            const notificationResponse = await fetch(`${api}/api/notification`, {
                method: "POST",
                body: JSON.stringify(notificationItem),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`

                }
            })
            const notificationJson = await notificationResponse.json()

            if (!notificationResponse.ok) {
                setError(notificationJson.error);
            } else {
                setError(null);
                dispatch({
                    type: 'CREATE_FORM',
                    collection: "notifications",
                    payload: notificationJson
                });
            }


            if (!response.ok) {
                setError(json.error);
            } else {
                setError(null);
                dispatch({
                    type: 'CREATE_FORM',
                    collection: "transactions",
                    payload: json
                });
                toast.success(languageText.PurchasedSuccessfully, {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    style: {
                        // fontFamily: language === 'ar' ?
                        //     'Noto Kufi Arabic, sans-serif' :
                        //     'Poppins, sans-serif',
                    },
                });
                navigate("/purchased")


            }
        }



        closePurchaseForm();
    };


    return (
        <div className="PurchaseFormPopup">
            <h3>{languageText.EnterYourInformation}</h3>
            <form className='Form' onSubmit={handlePurchaseSubmit}>
                <div className="InputRow">
                    <div className="InputField">
                        <div className="InputLabelField">
                            <input
                                type="text"
                                className="input disabled"
                                value={user.userFname}
                                required
                                disabled
                                id="name"
                                name="name"
                            />
                            {/* {!buyerInfo.name && <label for="name" className={`LabelInput ${(buyerInfo.name) ? 'valid' : ''}`}><FontAwesomeIcon icon={faStar} />{languageText.FullName}</label>} */}
                        </div>
                    </div>

                    <div className="InputField">
                        <div className="InputLabelField">
                            <input
                                type="email"
                                // className={`input ${(buyerInfo.email) ? 'valid' : ''}`}
                                className="input disabled"

                                value={user.userEmail}
                                disabled

                                required
                                id="email"
                                name="email"
                            />
                            {/* {!buyerInfo.email && <label for="email" className={`LabelInput ${(buyerInfo.email) ? 'valid' : ''}`}><FontAwesomeIcon icon={faEnvelope} />{languageText.Email}</label>} */}
                        </div>
                    </div>
                </div>
                <div className="InputRow">
                    <div className="InputLabelField">
                        <input
                            type="number"
                            // className={`input ${(buyerInfo.phone) ? 'valid' : ''}`}
                            className="input disabled"

                            value={user.userPhoneNo}
                            disabled
                            required
                            id="phone"
                            name="phone"
                        />
                        {/* {!buyerInfo.phone && <label for="phone" className={`LabelInput ${(buyerInfo.phone) ? 'valid' : ''}`}><FontAwesomeIcon icon={faPhone} />{languageText.Phone}</label>} */}
                    </div>
                    {product.pType === "Sell" && <div className="InputField">
                        <select
                            className={`input ${(paymentMethod) ? 'valid' : ''}`}
                            name="paymentMethod"
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            required

                        >
                            <option value="" disabled selected hidden>{languageText.PaymentMethod}</option>
                            <option value="Cash">{languageText.Cash}</option>
                            <option value="Credit Card">{languageText.CreditCard}</option>
                        </select>
                    </div>}
                </div>

                <div className="InputField WholeWidth">
                    <div className="InputLabelField">
                        <textarea
                            className="input disabled"

                            rows="1"
                            // className={`input ${(buyerInfo.address) ? 'valid' : ''}`}
                            columns="20"
                            required
                            value={user.userAddress}
                            id="address"
                            name='address'
                            disabled

                        />
                        {/* {!buyerInfo.address && <label for="address" className={`LabelInput ${(buyerInfo.address) ? 'valid' : ''}`}><FontAwesomeIcon icon={faLocationDot} /> {languageText.Address}</label>} */}
                    </div>
                </div>


                <button className='Submit'>
                    {languageText.SubmitPurchase}
                </button>

            </form>
            <button className="PopButton ClosePurchaseForm" onClick={closePurchaseForm}>
                <span className="ProductToolTip" >{languageText.Close}</span>
                <span><FontAwesomeIcon icon={faClose} /></span>
            </button>

        </div>

    );
}

export default PurchaseForm;