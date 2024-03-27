import React, { useState, useStatus } from 'react';
import { Icon } from '@iconify-icon/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faStar, faCommentDots, faMoneyBill, faEnvelope, faPhone, faAddressBook, faLocation, faLocationPin, faLocationDot, faClose } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useItemsContext } from '../../hooks/useItemsContext'



const UserError = ({ CloseErrorForm, userOne, api }) => {
    const { users = [], dispatch } = useItemsContext()


    const handleUpdate = async (e) => {
        e.preventDefault();

        try {

            const response = await fetch(`${api}/api/user/${userOne._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userError: error
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
                toast.success("Error Added Successfully", {
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
            CloseErrorForm()

        } catch (error) {
            console.error('An error occurred while updating form status:', error);
        }
    };

    const [error, setError] = useState('')
    return (
        <div className="PurchaseFormPopup">
            <h3>Enter the Reason for Not Approving </h3>
            <form className='Form' onSubmit={handleUpdate}>


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

export default UserError;