import { useState } from 'react';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';
import { useChatState } from "../context/ChatContext";

export const useChat = (api, toast) => {
    // const { user, setSelectedChat, chats, setChats, selectedChat } = useAuthContext()
    const { user } = useAuthContext()
    const {
        setSelectedChat,
        notification,
        setNotification,
        chats,
        setChats,
        selectedChat
    } = useChatState();
    const [chatError, setError] = useState('');

    const accessChat = async (userId) => {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.post(`${api}/api/chat`, { userId }, config);

            if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
            setSelectedChat(data);

        } catch (chatError) {
            toast({
                title: "Error fetching the chat",
                description: chatError.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
            setError('Error fetching the chat');
        }
    };

    return { accessChat, chatError };
};
