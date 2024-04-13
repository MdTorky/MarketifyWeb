import React, { useState } from 'react';
import { Icon } from '@iconify-icon/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faStar, faCommentDots, faMoneyBill, faEnvelope, faPhone, faAddressBook, faLocation, faLocationPin, faLocationDot, faClose } from '@fortawesome/free-solid-svg-icons';
import { useItemsContext } from '../../hooks/useItemsContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Fine = ({ CloseFineForm, userOne, api }) => {
    const { users = [], dispatch } = useItemsContext()

    const handleFineUpdate = async (e) => {
        e.preventDefault();

        try {

            const response = await fetch(`${api}/api/user/${userOne._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userFine: fine
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
                payload: { id: userOne._id, changes: updatedData },
            });

            {
                toast.success("Fine Added Successfully", {
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
            CloseFineForm()

        } catch (error) {
            console.error('An error occurred while updating form status:', error);
        }
    };

    const [fine, setFine] = useState('')
    return (
        <div className="PurchaseFormPopup">
            <h3>Enter the Fine</h3>
            <form className='Form' onSubmit={handleFineUpdate}>


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




                <button className='Submit' >
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