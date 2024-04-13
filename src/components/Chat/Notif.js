import React, { useState } from 'react'
import Loader from '../Loader/Loader';
import { useItemsContext } from '../../hooks/useItemsContext'
import { useAuthContext } from '../../hooks/useAuthContext';
import { Link, useLocation } from 'react-router-dom';
import './Notification.css'
const Notification = ({ NotificationLengthUnseen, notifications, notificationsOpen, openChat, loading, api }) => {

    const [sender, setSender] = useState()
    const { users = [], dispatch } = useItemsContext();
    const { user } = useAuthContext()




    const fetchData = async (id, index) => {
        try {
            const response = await fetch(`${api}/api/user/${id}`, {
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
                collection: "notifications",
                index, // index of the notification in the array
                payload: data,
            });
        } catch (error) {
            console.error('An error occurred while fetching form data:', error);
        } finally {
            // Set loading to false once the data is fetched (success or error)
        }
    };




    return (
        <>
            {NotificationLengthUnseen > 0 && <div className="MessagesCount">{NotificationLengthUnseen}</div>}
            {notificationsOpen && (
                <div className="Notifications">
                    <h2>Notification Wall</h2>
                    {loading ? (<div className="Loader">
                        <Loader />
                    </div>) : (
                        notifications.map((single, index) => (
                            single.type === "message" ?
                                <div key={index}>
                                    {fetchData(single.sender, index)}
                                    <img src={single.sender.userImage} alt="" />
                                    <Link onClick={() => openChat(single.sender)} className="link">{single.content}</Link>
                                </div>
                                : null
                        ))
                    )}
                    <button>Clear All Notifications</button>
                </div>
            )}
        </>
    )
}

export default Notification
