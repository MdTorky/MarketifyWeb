// ChatContext.js
import React, { createContext, useContext, useState } from "react";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
    const [selectedChat, setSelectedChat] = useState(null);
    const [notification, setNotification] = useState([]);
    const [chats, setChats] = useState([]);


    return (
        <ChatContext.Provider
            value={{
                selectedChat,
                setSelectedChat,
                notification,
                setNotification,
                chats,
                setChats,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};

const useChatState = () => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error("useChatState must be used within a ChatProvider");
    }
    return context;
};


export { ChatProvider as default, useChatState }
