import React, { useState, useStatus } from 'react';
import { Icon } from '@iconify-icon/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faStar, faCommentDots, faMoneyBill, faEnvelope, faPhone, faAddressBook, faLocation, faLocationPin, faLocationDot, faClose } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useItemsContext } from '../../hooks/useItemsContext'



const Pending = ({ CloseErrorForm, userOne, api, user }) => {
    const { users = [], dispatch } = useItemsContext()


    const handleNotification = async () => {


        const item = {
            type: 'admin',
            sender: user.userId,
            receiver: userOne._id,
            content: error,
            status: 'unseen'
        }

        const response = await fetch(`${api}/api/notification`, {
            method: "POST",
            body: JSON.stringify(item),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`

            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error);
        } else {
            setError(null);
            dispatch({
                type: 'CREATE_FORM',
                collection: "notifications",
                payload: json
            });
        }
    }





    const [error, setError] = useState('')
    return (
        <div className="PurchaseFormPopup">
            <h3>Enter the Reason for Not Approving </h3>
            <form className='Form' onSubmit={handleNotification}>


                <div className="InputField">
                    <div className="InputLabelField">
                        <input
                            type="text"
                            className={`input ${(error) ? 'valid' : ''}`}
                            onChange={(e) => setError(e.target.value)}
                            // value={buyerInfo.name}
                            required
                            id="name"
                            name="name"
                        />
                        {!error && <label for="name" className={`LabelInput ${(error) ? 'valid' : ''}`}><Icon icon="fluent:notebook-error-20-filled" />Enter the Reason</label>}
                    </div>
                </div>




                <button className='Submit' >
                    Submit Reason
                </button>
            </form>
            {/* <button onClick={closePurchaseForm} className="ClosePurchaseForm"><FontAwesomeIcon icon={faClose} /></button> */}
            <button className="PopButton ClosePurchaseForm" onClick={CloseErrorForm}>
                <span className="ProductToolTip" >Close</span>
                <span><FontAwesomeIcon icon={faClose} /></span>
            </button>

        </div>
    );
}

export default Pending;