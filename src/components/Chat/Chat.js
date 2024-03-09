// Chat.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPaperPlane, faPlay } from '@fortawesome/free-solid-svg-icons';
import './Chat.css';
import profile from '../../images/Profile.jpg'

const Chat = ({ onClose, languageText }) => {


    const getCurrentTime = () => {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
    };

    const [messages, setMessages] = useState([
        { id: 1, text: "Hello, how can I help you?", sender: "seller", timestamp: getCurrentTime() },
        { id: 2, text: "Hello", sender: "seller", timestamp: getCurrentTime() },
    ]);
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = () => {
        if (newMessage.trim() !== '') {
            setMessages([...messages, { id: messages.length + 1, text: newMessage, sender: "user", timestamp: getCurrentTime() },]);
            setNewMessage('');
        }
    };





    return (
        <div className="Chat">
            <div className="ChatHeader">
                <div className="ChatHeaderLeft">
                    <img src={profile} alt="" />
                    <span>Seller Name</span>
                </div>
                <button onClick={onClose}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
            </div>
            <div className="ChatBody">
                {messages.map((message) => (
                    <div key={message.id} className={`ChatMessage ${message.sender}`}>
                        <div className="ChatImg">
                            {message.sender === 'seller' && <img src={profile} alt="Seller" className="MessageImage" />}
                            {message.sender === 'seller' ? <p className="MessageTimestamp">{message.timestamp}</p> : <p className="MessageTimestampUser">{message.timestamp}</p>}
                        </div>
                        <div className={`MessageContent ${message.sender === 'seller' ? '' : 'UserContent'}`}>
                            <p className="MessageText">{message.text}</p>
                            {message.sender === 'seller' && <p className="MessageTriangle"><FontAwesomeIcon icon={faPlay} /></p>}
                        </div>
                    </div>
                ))}
            </div>
            <form className="ChatInput" onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}>
                <input
                    type="text"
                    placeholder={languageText.TypeSomething}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
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
