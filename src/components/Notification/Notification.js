import React, { useState, useEffect } from 'react';
import Loader from '../Loader/Loader';
import NotificationLoader from '../Loader/NotificationLoader';
import { useItemsContext } from '../../hooks/useItemsContext';
import { useAuthContext } from '../../hooks/useAuthContext';
import { Link } from 'react-router-dom';
import ScrollableFeed from 'react-scrollable-feed';

import './Notification.css';

const Notification = ({ NotificationLengthUnseen, notifications, notificationsOpen, openChat, loading, api, languageText }) => {
    const [sender, setSender] = useState([]);
    const { users = [], dispatch } = useItemsContext();
    const { user } = useAuthContext();
    const [deleting, setDeleting] = useState(false);
    const [product, setProduct] = useState([])
    useEffect(() => {
        fetchSendersData();
        fetchProductsData()
    }, [notifications, api, dispatch]); // Fetch data whenever notifications change

    useEffect(() => {
        if (notifications.length === 0) {
            setSender([]);
            setProduct([]); // Clear sender data if notifications are empty
        }
    }, [notifications, api, dispatch]);

    const fetchSendersData = async () => {
        const sendersData = [];
        for (const single of notifications) {
            // if (single.type === "message" || single.type === "admin") {
            const senderData = await fetchSenderData(single.sender);
            sendersData.push({ senderData, notificationData: single });
            // }

        }
        setSender(sendersData);
    };

    const fetchProductsData = async () => {
        const productsData = []
        for (const item of notifications) {
            const productData = await fetchProductData(item.product);
            productsData.push({ productData, notificationData: item })
        }

        setProduct(productsData)
    }

    const fetchSenderData = async (id) => {
        try {
            const response = await fetch(`${api}/api/user/${id}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            if (!response.ok) {
                console.error(`Error fetching form data. Status: ${response.status}, ${response.statusText}`);
                return null;
            }

            const data = await response.json();
            dispatch({
                type: 'GET_ITEM',
                collection: "users",
                payload: data,
            });
            return data;
        } catch (error) {
            console.error('An error occurred while fetching form data:', error);
            return null;
        }
    };


    const fetchProductData = async (id) => {
        try {
            const response = await fetch(`${api}/api/products/${id}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            if (!response.ok) {
                console.error(`Error fetching form data. Status: ${response.status}, ${response.statusText}`);
                return null;
            }

            const data = await response.json();
            dispatch({
                type: 'GET_ITEM',
                collection: "products",
                payload: data,
            });
            return data;

        } catch (error) {
            console.error('An error occurred while fetching form data:', error);
            return null;
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const months = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
        const month = months[date.getMonth()];
        const day = date.getDate();
        let hour = date.getHours();
        const minute = date.getMinutes();
        const period = hour >= 12 ? 'PM' : 'AM';
        hour = hour % 12 || 12;

        return `${month} ${day}, ${hour}:${minute.toString().padStart(2, '0')}${period}`;
    };

    const clearAll = async () => {
        setDeleting(true)
        try {
            const response = await fetch(`${api}/api/notification/${user.userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            });

            if (!response.ok) {
                console.error(`Error deleting suggestion. Status: ${response.status}, ${response.statusText}`);
                return;
            }
            if (response.ok) {
                const json = await response.json();
                dispatch({
                    type: 'DELETE_ITEM',
                    collection: "notifications",
                    payload: json
                });
                setDeleting(false)

            }

        } catch (error) {
            console.error('An error occurred while deleting data:', error);
        }
    };

    return (
        <>
            {NotificationLengthUnseen > 0 && <div className="MessagesCount">{NotificationLengthUnseen}</div>}
            {notificationsOpen && (
                <div className="Notifications">
                    <h2>{languageText.NotificationWall}</h2>
                    {loading ? (
                        <div>
                            <NotificationLoader />
                            <p className="LoaderText">{languageText.Loading}</p>

                        </div>
                    ) : (
                        <ScrollableFeed>
                            <div className="NotificationMessages">
                                {deleting ? (
                                    <div className="Loader">
                                        <NotificationLoader />
                                        <p className="LoaderText">{languageText.Clearing}</p>
                                    </div>
                                ) : (
                                    sender.length > 0 ? (
                                        sender.map(({ senderData, notificationData }, index) => (
                                            <div key={index}>
                                                {notificationData.type === 'message' ? (
                                                    <Link onClick={() => openChat(senderData._id)} className="NotificationMessage">
                                                        <div className='NotificationImageTime'>
                                                            <img className="NotificationImage" src={senderData.userImage} alt="" />
                                                            <p>{formatDate(notificationData.createdAt)}</p>
                                                        </div>
                                                        <div className="UserCardInfo">
                                                            <div className="SenderName">{senderData.userFname}</div>
                                                            <p className='NotificationContent'>{notificationData.content}</p>
                                                        </div>
                                                    </Link>
                                                ) : notificationData.type === 'admin' ? (
                                                    <Link className="NotificationMessage">
                                                        <div className='NotificationImageTime'>
                                                            <img className="NotificationImage" src={senderData.userImage} alt="" />
                                                            <p>{formatDate(notificationData.createdAt)}</p>
                                                        </div>
                                                        <div className="UserCardInfo">
                                                            <div className="SenderName">Admin Notification</div>
                                                            <p className='NotificationContent'>{notificationData.content}</p>
                                                        </div>
                                                    </Link>
                                                ) : (
                                                    <Link to="/purchased" className="NotificationMessage">
                                                        <div className='NotificationImageTime'>
                                                            <img className="NotificationImage" src={product[index]?.productData?.pImage} alt="" />
                                                            <p>{formatDate(notificationData.createdAt)}</p>
                                                        </div>
                                                        <div className="UserCardInfo">
                                                            <div className="SenderName">{languageText.SoldProduct}</div>
                                                            <p className='NotificationContent'>{"Your " + product[index]?.productData?.pTitle + " " + notificationData.content + " by " + senderData.userFname}</p>
                                                        </div>
                                                    </Link>
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        <div>
                                            <p>{languageText.NoNotifications}</p>
                                        </div>
                                    ))}
                            </div>
                        </ScrollableFeed>
                    )}
                    {sender.length > 0 && <button className='type1' data-attr={languageText.Clear} onClick={clearAll}></button>}
                </div >
            )}
        </>
    );
};

export default Notification;
