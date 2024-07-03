import React, { useEffect } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext';
import { useItemsContext } from '../../hooks/useItemsContext'
import { Link, useLocation, useNavigate } from 'react-router-dom';

import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const CheckoutSuccess = ({ api, languageText }) => {
    const navigate = useNavigate();

    const { user } = useAuthContext()
    const { users = [], dispatch } = useItemsContext()




    const handleUpdate = async () => {


        try {

            const response = await fetch(`${api}/api/user/${user.userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userFine: 0
                }),
            });


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
                toast.success(`${languageText.CheckoutSuccess}`, {
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
            navigate("/");


        } catch (error) {
            console.error('An error occurred while updating form status:', error);
        }
    };
    if (user) {
        handleUpdate();
    }



    return (
        <div>
            {/* <h2>Checkout Success</h2> */}
        </div>
    )
}

export default CheckoutSuccess
