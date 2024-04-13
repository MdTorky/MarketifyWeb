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
    const { users = [], message = [], notifications = [], dispatch } = useItemsContext()
    const { user } = useAuthContext()
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)
    const [newMessage, setNewMessage] = useState('');
    const { selectedChat, notification, setNotification } = useChatState();
    const [socketConnected, setSocketConnected] = useState(false);
    const [typing, setTyping] = useState(false)
    const [isTyping, setIsTyping] = useState(false)
    const [otherUser, setOtherUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!selectedChat) return;

        const otherUser = selectedChat.users.find(u => u._id !== user.userId);
        setOtherUser(otherUser);
        console.log(otherUser)
    }, [selectedChat, user]);




    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${api}/api/user/${userSeller}`);
                // const response = await fetch(`${api}/api/user/${userSeller.userID}`) || await fetch(`${api}/api/user/${userSeller._id}`);

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


    useEffect(() => {
        fetchMessages();

        selectedChatCompare = selectedChat
        // }, [selectedChat, api, dispatch, sellerData])
    }, [selectedChat])

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


                socket.emit('new message', data)
                setMessages([...messages, data])




                try {
                    const response = await fetch(`${api}/api/notification/${user.userId}/${otherUser._id}`, {
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
                    }

                } catch (error) {
                    console.error('An error occurred while deleting data:', error);
                }





                const item = {
                    type: 'message',
                    sender: user.userId,
                    receiver: otherUser._id,
                    content: newMessage,
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
        socket = io(api);
        socket.emit("setup", user);
        socket.on("connected", () => setSocketConnected(true));
        socket.on("typing", () => setIsTyping(true));
        socket.on("stop typing", () => setIsTyping(false));
    }, [])





    // console.log(notification, "-------------------")

    useEffect(() => {
        socket.on("message received", (newMessageReceived) => {
            if (
                !selectedChatCompare ||
                selectedChatCompare._id !== newMessageReceived.chat._id
            ) {
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
                    {<img src={sellerData.userImage} alt="" />}
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