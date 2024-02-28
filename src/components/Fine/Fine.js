import React, { useState } from 'react';
import { Icon } from '@iconify-icon/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faStar, faCommentDots, faMoneyBill, faEnvelope, faPhone, faAddressBook, faLocation, faLocationPin, faLocationDot, faClose } from '@fortawesome/free-solid-svg-icons';
const Fine = ({ CloseFineForm }) => {

    const [fine, setFine] = useState('')
    return (
        <div className="PurchaseFormPopup">
            <h3>Enter the Fine</h3>
            <form className='Form'>


                <div className="InputField">
                    <div className="InputLabelField">
                        <input
                            type="number"
                            className={`input ${(fine) ? 'valid' : ''}`}
                            onChange={(e) => setFine(e.target.value)}
                            // value={buyerInfo.name}
                            required
                            id="name"
                            name="name"
                        />
                        {!fine && <label for="name" className={`LabelInput ${(fine) ? 'valid' : ''}`}><Icon icon="fluent:money-16-filled" />Fine Amount</label>}
                    </div>
                </div>




                <button type="button" className='Submit' >
                    Submit Fine
                </button>
            </form>
            {/* <button onClick={closePurchaseForm} className="ClosePurchaseForm"><FontAwesomeIcon icon={faClose} /></button> */}
            <button className="PopButton ClosePurchaseForm" onClick={CloseFineForm}>
                <span className="ProductToolTip" >Close</span>
                <span><FontAwesomeIcon icon={faClose} /></span>
            </button>

        </div>
    );
}

export default Fine;