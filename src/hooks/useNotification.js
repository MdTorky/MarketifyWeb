import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { useItemsContext } from "./useItemsContext";

const useNotificationHandler = () => {
    const { user } = useAuthContext();
    const { dispatch } = useItemsContext();
    const [NotiError, setError] = useState(null);
    const api = process.env.REACT_APP_API_KEY;

    const handleNotification = async (userOne, content) => {
        const item = {
            type: 'message',
            sender: user.userId,
            receiver: userOne._id,
            content,
            status: 'unseen'
        };

        try {
            const response = await fetch(`${api}/api/notification`, {
                method: 'POST',
                body: JSON.stringify(item),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`
                }
            });

            if (!response.ok) {
                const json = await response.json();
                setError(json.error);
            } else {
                const json = await response.json();
                setError(null);
                dispatch({
                    type: 'CREATE_FORM',
                    collection: 'notifications',
                    payload: json
                });
            }
        } catch (NotiError) {
            console.error('Error handling notification:', NotiError);
            setError('An error occurred while handling the notification.');
        }
    };

    return { handleNotification, NotiError };
};

export default useNotificationHandler;
