import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { format, isSameDay } from "date-fns";


const Chat = () => {
    const { targetUserId } = useParams();

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    const user = useSelector((store) => store.user);
    const userId = user?._id;

    // Scroll to bottom in chat window
    const chatContainerRef = useRef(null);

    useEffect(() => {
        // Scroll to the bottom when the chat component loads or updates
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
      }, [messages]); // This effect runs every time messages change

    const fetchChatMessages = async () => {
        const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
            withCredentials: true,
        });


        const chatMessages = chat?.data?.messages.map((msg) => {
            const { senderId, text, timestamp } = msg;
            return {
                firstName: senderId?.firstName,
                lastName: senderId?.lastName,
                text,
                timestamp
            };
        });

        setMessages(chatMessages);
    };

      useEffect(() => {
        fetchChatMessages();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

    useEffect(() => {

        if (!userId) { return; }

        const socket = createSocketConnection();

        // As soon as the page loaded, the socket connection is made and joinChat event is emitted
        // This is similar to API call to send data to backend
        socket.emit("joinChat", {
            firstName: user.firstName,
            userId,
            targetUserId,
        });

        socket.on("messageReceived", ({ firstName, lastName, text, timestamp }) => {
            setMessages((messages) => [...messages, { firstName, lastName, text, timestamp }]);
        });

        return () => {
            socket.disconnect();
        };
          
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, targetUserId]);

    const sendMessage = () => {
        const socket = createSocketConnection();

        socket.emit("sendMessage", {
            firstName: user.firstName,
            lastName: user.lastName,
            userId,
            targetUserId,
            text: newMessage,
            timestamp: Date.now()
        });

        setNewMessage("");

    };

    const formatTimestamp = (timestamp) => {
       
        if (!timestamp) return;

        const now = new Date();
        const date = new Date(timestamp);
      
        if (isSameDay(now, date)) {
          return format(date, "hh:mm a");
        } else {
          return format(date, "dd/MM/yyyy hh:mm a");
        }
      };
      formatTimestamp()

      // Function to handle Enter key press and send the message
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && newMessage.trim() !== '') {
      sendMessage();
    }
  };

    return (
        <div className="w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
            <h1 className="p-5 border-b border-gray-600">Chat</h1>
            <div className="flex-1 overflow-scroll overflow-x-hidden p-5" ref={chatContainerRef}>
                {messages.map((msg, index) => {
                    return (
                        <div
                            key={index}
                            className={
                                "chat " +
                                (user.firstName === msg.firstName ? "chat-end" : "chat-start")
                            }
                        >
                            <div className="chat-header">
                                {`${msg.firstName}  ${msg.lastName}`}
                                <time className="text-xs opacity-50"> {formatTimestamp(msg.timestamp)}</time>
                            </div>
                            <div className="chat-bubble">{msg.text}</div>
                            {/* <div className="chat-footer opacity-50">Seen</div> */}
                        </div>
                    );
                })}
            </div>

            <div className="p-5 border-t border-gray-600 flex items-center gap-2">
                <input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1 border border-gray-500 text-white rounded p-2"
                    onKeyDown={handleKeyDown} // Listen for Enter key press
                    placeholder="Please type your message here..."
                ></input>

                <button onClick={sendMessage} className="btn btn-secondary">
                    Send
                </button>
            </div>

        </div>
    );
}

export default Chat