import React from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import { isLastMessage, isSameSender, isSameSenderMargin } from '../../config/ChatLogic'
import { useAuthContext } from '../../hooks/useAuthContext';
import { faPaperPlane, faPlay, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const ChatBody = ({ messages }) => {

    const { user } = useAuthContext()

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
    };

    return (
        <ScrollableFeed>
            {messages && messages.map((m, i) => (
                <div key={m._id} className={`ChatMessage ${m.sender._id != user.userId ? "seller" : 'user'}`}>
                    {(isSameSender(messages, m, i, user.userId) ||
                        isLastMessage(messages, i, user.userId)) && (
                            <div className="ChatMessage">
                                <div className="ChatImg">
                                    <img src={m.sender.userImage} alt="Seller" className="MessageImage" />
                                    {/* <p className="MessageTimestamp">{formatTime(m.createdAt)}</p> */}
                                </div>

                            </div>
                        )}

                    <div className={`MessageContent ${m.sender._id != user.userId ? '' : 'UserContent'}`}>
                        <p className={`${m.sender._id != user.userId ? "MessageTimestamp" : "MessageTimestampUser"}`}>{formatTime(m.createdAt)}</p>

                        <p className="MessageText"
                            style={{
                                marginLeft: isSameSenderMargin(messages, i, user.userId),
                            }}
                        >{m.content}</p>
                        {m.sender._id != user.userId && <p className="MessageTriangle"><FontAwesomeIcon icon={faPlay} /></p>}
                    </div>
                </div>


            ))
            }
        </ScrollableFeed >
    )
}

export default ChatBody
