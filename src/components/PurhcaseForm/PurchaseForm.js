import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useItemsContext } from '../../hooks/useItemsContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "../Loader/Loader";
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify-icon/react';

const PurchaseForm = ({ closePurchaseForm, api, product, languageText }) => {
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const [paymentMethod, setPaymentMethod] = useState('');
    const { dispatch } = useItemsContext();
    const [error, setError] = useState(null);
    const [cooldown, setCooldown] = useState(null);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        if (user) {
            checkCooldown();
        }
    }, [user]);

    const checkCooldown = async () => {
        const response = await fetch(`${api}/api/user/${user.userId}`);
        const userData = await response.json();

        if (userData.lastDonation) {
            const lastDonationDate = new Date(userData.lastDonation);
            const currentTime = new Date();
            const timeDiff = currentTime - lastDonationDate;
            const remainingTime = 24 * 60 * 60 * 1000 - timeDiff;

            if (remainingTime > 0) {
                const hours = Math.floor(remainingTime / (60 * 60 * 1000));
                const minutes = Math.floor((remainingTime % (60 * 60 * 1000)) / (60 * 1000));
                setCooldown(remainingTime);
                setError(`You have to wait ${hours} hours and ${minutes} minutes to get another donation item.`);
            }
        }
    };

    const handlePurchaseSubmit = async (e) => {
        e.preventDefault();
        setUpdating(true);

        if (!user) {
            setError(languageText.YouMustBeLoggedIn);
            return;
        }

        if (product.pType === "Donations" && cooldown > 0) {
            const hours = Math.floor(cooldown / (60 * 60 * 1000));
            const minutes = Math.floor((cooldown % (60 * 60 * 1000)) / (60 * 1000));
            setError(`You have to wait ${hours} hours and ${minutes} minutes to get another donation item.`);
            setUpdating(false);
            return;
        }

        const item = {
            sellerID: product.userID,
            buyerID: user.userId,
            productID: product._id,
            paymentMethod
        };

        const response = await fetch(`${api}/api/transactions`, {
            method: "POST",
            body: JSON.stringify(item),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        });

        const json = await response.json();

        if (response.ok) {
            if (product.pType === "Donations") {
                const userCoolDown = await fetch(`${api}/api/user/${user.userId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                    },
                    body: JSON.stringify({ lastDonation: new Date() })
                });
                const updatedDataCoolDown = await userCoolDown.json();

                dispatch({
                    type: 'UPDATE_ITEM',
                    collection: 'users',
                    payload: { id: user.userId, changes: updatedDataCoolDown },
                });
            }

            const statusResponse = await fetch(`${api}/api/products/${product._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({ pStatus: "Unavailable" })
            });
            const updatedData = await statusResponse.json();
            dispatch({ type: 'UPDATE_ITEM', collection: 'products', payload: { id: product._id, changes: updatedData } });

            const notificationItem = {
                type: 'purchase',
                sender: user.userId,
                receiver: product.userID,
                product: product._id,
                content: "has been Purchased",
                status: 'unseen'
            };

            const notificationResponse = await fetch(`${api}/api/notification`, {
                method: "POST",
                body: JSON.stringify(notificationItem),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const notificationJson = await notificationResponse.json();

            if (notificationResponse.ok) {
                dispatch({ type: 'CREATE_FORM', collection: "notifications", payload: notificationJson });
            }

            dispatch({ type: 'CREATE_FORM', collection: "transactions", payload: json });
            toast.success(languageText.PurchasedSuccessfully, {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                style: {}
            });
            setUpdating(false);
            navigate("/purchased");
        } else {
            setError(json.error);
        }

        closePurchaseForm();
    };

    return (
        <div className="PurchaseFormPopup">
            {updating ? (
                <div className="Loader">
                    <Loader />
                    <p className="LoaderText">{languageText.Submitting}</p>
                </div>
            ) : cooldown > 0 ? (
                <div className="CooldownMessage">
                    <Icon className="ClockItem" icon="fluent:clock-lock-24-filled" />
                    <p className="CoolDownError">{error}</p>
                    <button className="PopButton ClosePurchaseForm" onClick={closePurchaseForm}>
                        <span className="ProductToolTip">{languageText.Close}</span>
                        <span><FontAwesomeIcon icon={faClose} /></span>
                    </button>
                </div>
            ) : (
                <>
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
                                </div>
                            </div>

                            <div className="InputField">
                                <div className="InputLabelField">
                                    <input
                                        type="email"
                                        className="input disabled"
                                        value={user.userEmail}
                                        disabled
                                        required
                                        id="email"
                                        name="email"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="InputRow">
                            <div className="InputLabelField">
                                <input
                                    type="number"
                                    className="input disabled"
                                    value={user.userPhoneNo}
                                    disabled
                                    required
                                    id="phone"
                                    name="phone"
                                />
                            </div>
                            {product.pType === "Sell" && (
                                <div className="InputField">
                                    <select
                                        className={`input ${paymentMethod ? 'valid' : ''}`}
                                        name="paymentMethod"
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        required
                                    >
                                        <option value="" disabled selected hidden>{languageText.PaymentMethod}</option>
                                        <option value="Qr Code">{languageText.QrCode}</option>
                                        <option value="Transfer">{languageText.Transfer}</option>
                                        <option value="Cash">{languageText.Cash}</option>
                                    </select>
                                </div>
                            )}
                        </div>

                        <div className="InputField WholeWidth">
                            <div className="InputLabelField">
                                <textarea
                                    className="input disabled"
                                    rows="1"
                                    columns="20"
                                    required
                                    value={user.userAddress}
                                    id="address"
                                    name='address'
                                    disabled
                                />
                            </div>
                        </div>

                        {error && <div className="error">{error}</div>}
                        <button className='Submit'>
                            {languageText.SubmitPurchase}
                        </button>
                    </form>
                </>
            )}
            <button className="PopButton ClosePurchaseForm" onClick={closePurchaseForm}>
                <span className="ProductToolTip">{languageText.Close}</span>
                <span><FontAwesomeIcon icon={faClose} /></span>
            </button>
        </div>
    );
};

export default PurchaseForm;
