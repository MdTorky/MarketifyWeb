
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faStar, faCommentDots, faMoneyBill, faEnvelope, faPhone, faAddressBook, faLocation, faLocationPin, faLocationDot, faClose } from '@fortawesome/free-solid-svg-icons';


const PurchaseForm = ({ closePurchaseForm }) => {




    const [buyerInfo, setBuyerInfo] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
        paymentMethod: 'Cash',
    });



    const [isPurchaseFormOpen, setPurchaseFormOpen] = useState(false);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBuyerInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));
    };


    const handlePaymentMethodChange = (e) => {
        setBuyerInfo((prevInfo) => ({
            ...prevInfo,
            paymentMethod: e.target.value,
        }));
    };

    const handlePurchaseSubmit = () => {
        // Handle the purchase submission logic (e.g., send to the server)
        console.log('Purchase submitted:', buyerInfo);
        closePurchaseForm();
    };


    return (
        <div className="PurchaseFormPopup">
            <h3>Enter your information</h3>
            <form className='Form'>
                <div className="InputRow">
                    {/* <div className="InputField">
                                <input
                                    placeholder=" &#xF007; &nbsp; Name"
                                    type="text"
                                    name="name"
                                    className={`input ${(buyerInfo.name) ? 'valid' : 'invalid'}`}
                                    value={buyerInfo.name}
                                    onChange={handleInputChange}
                                />
                            </div> */}

                    <div className="InputField">
                        <div className="InputLabelField">
                            <input
                                type="text"
                                className={`input ${(buyerInfo.name) ? 'valid' : ''}`}
                                onChange={handleInputChange}
                                value={buyerInfo.name}
                                required
                                id="name"
                                name="name"
                            />
                            {!buyerInfo.name && <label for="name" className={`LabelInput ${(buyerInfo.name) ? 'valid' : ''}`}><FontAwesomeIcon icon={faStar} />Full Name</label>}
                        </div>
                    </div>

                    <div className="InputField">
                        <div className="InputLabelField">
                            <input
                                type="email"
                                className={`input ${(buyerInfo.email) ? 'valid' : ''}`}
                                onChange={handleInputChange}
                                value={buyerInfo.email}
                                required
                                id="email"
                                name="email"
                            />
                            {!buyerInfo.email && <label for="email" className={`LabelInput ${(buyerInfo.email) ? 'valid' : ''}`}><FontAwesomeIcon icon={faEnvelope} />Email</label>}
                        </div>
                    </div>
                </div>
                <div className="InputRow">
                    <div className="InputLabelField">
                        <input
                            type="number"
                            className={`input ${(buyerInfo.phone) ? 'valid' : ''}`}
                            onChange={handleInputChange}
                            value={buyerInfo.phone}
                            required
                            id="phone"
                            name="phone"
                        />
                        {!buyerInfo.phone && <label for="phone" className={`LabelInput ${(buyerInfo.phone) ? 'valid' : ''}`}><FontAwesomeIcon icon={faPhone} />Phone</label>}
                    </div>
                    <div className="InputField">
                        <select
                            className={`input ${(buyerInfo.paymentMethod) ? 'valid' : ''}`}
                            name="paymentMethod"
                            onChange={handlePaymentMethodChange}
                            required

                        >
                            <option value="" disabled selected hidden>Payment Method</option>
                            <option value="Cash">Cash</option>
                            <option value="Credit Card">Credit Card</option>
                        </select>
                    </div>
                </div>

                <div className="InputField WholeWidth">
                    <div className="InputLabelField">
                        <textarea
                            rows="1"
                            className={`input ${(buyerInfo.address) ? 'valid' : ''}`}
                            columns="20"
                            value={buyerInfo.address}
                            onChange={handleInputChange}
                            required
                            id="address"
                            name='address'

                        />
                        {!buyerInfo.address && <label for="address" className={`LabelInput ${(buyerInfo.address) ? 'valid' : ''}`}><FontAwesomeIcon icon={faLocationDot} /> Address</label>}
                    </div>
                </div>


                <button type="button" className='Submit' onClick={handlePurchaseSubmit}>
                    Submit Purchase
                </button>
            </form>
            {/* <button onClick={closePurchaseForm} className="ClosePurchaseForm"><FontAwesomeIcon icon={faClose} /></button> */}
            <button className="PopButton ClosePurchaseForm" onClick={closePurchaseForm}>
                <span className="ProductToolTip" >Close</span>
                <span><FontAwesomeIcon icon={faClose} /></span>
            </button>

        </div>

    );
}

export default PurchaseForm;