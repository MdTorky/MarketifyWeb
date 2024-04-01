// Chat.js
import { faPaperPlane, faPlay, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useItemsContext } from '../../hooks/useItemsContext';
import profile from '../../images/Profile.jpg';
import './Chat.css';
import Loader from '../Loader/ChatLoader'
import TypingLoader from '../Loader/TypingLoa';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useChatState } from "../../context/ChatContext";
import ChatBody from './ChatBody';
import io from 'socket.io-client';


var socket, selectedChatCompare;

const Chat = ({ onClose, languageText, userSeller, api }) => {


    const [sellerData, setSellerData] = useState('')
    const { users = [], message = [], dispatch } = useItemsContext()
    const { user } = useAuthContext()
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)
    const [newMessage, setNewMessage] = useState('');
    const { selectedChat, notification, setNotification } = useChatState();
    const [socketConnected, setSocketConnected] = useState(false);
    const [typing, setTyping] = useState(false)
    const [isTyping, setIsTyping] = useState(false)

    const [fetchAgain, setFetchAgain] = useState(false);



    useEffect(() => {
        socket = io(api);
        socket.emit("setup", user);
        socket.on("connected", () => setSocketConnected(true));
        socket.on("typing", () => setIsTyping(true));
        socket.on("stop typing", () => setIsTyping(false));
    }, [])



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${api}/api/user/${userSeller.userID}`);
                if (!response.ok) {
                    console.error(`Error fetching suggestions. Status: ${response.status}, ${response.statusText}`);
                    return;
                }

                const data = await response.json();
                dispatch({
                    type: 'GET_ITEM',
                    collection: 'users',
                    payload: data,
                });
                setSellerData(data)
            } catch (error) {
                console.error('An error occurred while fetching data:', error);
            } finally {
            }
        };

        fetchData();
    }, [api, dispatch]);



    const fetchMessages = async () => {
        if (!selectedChat) return;

        setLoading(true)
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                },
            }

            const { data } = await axios.get(`${api}/api/message/${selectedChat._id}`, config)

            setMessages(data)
            setLoading(false)

            socket.emit('join chat', selectedChat._id)
        } catch (error) {
            toast({
                title: "Error Occurred!",
                description: "Failed to send the Message",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        }
    }



    // console.log(selectedChat)
    const sendMessage = async (event) => {
        if (event.key === "Enter" && newMessage) {
            socket.emit("stop typing", selectedChat._id)
            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user.token}`
                    }
                }


                setNewMessage("");

                const { data } = await axios.post(`${api}/api/message`, {
                    content: newMessage,
                    chatId: selectedChat
                },
                    config
                );
                // console.log(data)
                socket.emit('new message', data)
                setMessages([...messages, data])
            } catch (error) {
                toast({
                    title: "Error Occurred!",
                    description: "Failed to send the Message",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom-left",
                });
            }
        }
    }


    useEffect(() => {
        fetchMessages();

        selectedChatCompare = selectedChat
    }, [selectedChat])


    useEffect(() => {
        socket.on("message received", (newMessageReceived) => {
            if (
                !selectedChatCompare || // if chat is not selected or doesn't match current chat
                selectedChatCompare._id !== newMessageReceived.chat._id
            ) {
                if (!notification.includes(newMessageReceived)) {
                    setNotification([newMessageReceived, ...notification]);
                    setFetchAgain(!fetchAgain)
                }

            } else {
                setMessages([...messages, newMessageReceived]);
            }
        });
    });

    const typingHandler = (e) => {
        setNewMessage(e.target.value)

        if (!socketConnected) return

        if (!typing) {
            setTyping(true)
            socket.emit("typing", selectedChat._id)
        }

        let lastTypingTime = new Date().getTime()
        var timerLength = 3000;
        setTimeout(() => {
            var timeNow = new Date().getTime()
            var timeDiff = timeNow - lastTypingTime

            if (timeDiff >= timerLength && typing) {
                socket.emit("stop typing", selectedChat._id)
                setTyping(false)
            }
        }, timerLength)
    }


    return (
        <div className="Chat">
            <div className="ChatHeader">
                <div className="ChatHeaderLeft">
                    <img src={sellerData.userImage} alt="" />
                    <span>{sellerData.userFname}</span>
                </div>
                <button onClick={onClose}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
            </div>
            {loading ? (
                <div className="Loader">
                    <Loader />
                    <p className="LoaderText">{languageText.Loading}</p>
                </div>
            ) : (
                <div className="ChatBody">
                    <ChatBody messages={messages} />

                    {/* {messages.map((message) => (
                            <div key={message.id} className={`ChatMessage ${message.sender}`}>
                                <div className="ChatImg">
                                    {message.sender === 'seller' && <img src={sellerData.userImage} alt="Seller" className="MessageImage" />}
                                    {message.sender === 'seller' ? <p className="MessageTimestamp">{message.timestamp}</p> : <p className="MessageTimestampUser">{message.timestamp}</p>}
                                </div>
                                <div className={`MessageContent ${message.sender === 'seller' ? '' : 'UserContent'}`}>
                                <p className="MessageText">{message.text}</p>
                                {message.sender === 'seller' && <p className="MessageTriangle"><FontAwesomeIcon icon={faPlay} /></p>}
                                </div>
                            </div>
                        ))} */}
                </div>
            )}
            {isTyping ? (
                <div className="MessageTypingLoader">

                    <img className="TypingImage" src={sellerData.userImage} alt="" />
                    <TypingLoader />

                </div>
            ) : (
                <></>
            )}
            <form className="ChatInput" onSubmit={(e) => { e.preventDefault(); }} onKeyDown={sendMessage}>
                <input
                    type="text"
                    placeholder={languageText.TypeSomething}
                    value={newMessage}
                    // onChange={(e) => setNewMessage(e.target.value)}
                    onChange={typingHandler}

                />
                <button type="submit" className="PopButton ChatButton">
                    <span className="ProductToolTip ChatTip">{languageText.Send}</span>
                    <span><FontAwesomeIcon icon={faPaperPlane} /></span>
                </button>

            </form>


        </div>
    );
};

export default Chat;


// onSubmit={(e) => { e.preventDefault(); }}