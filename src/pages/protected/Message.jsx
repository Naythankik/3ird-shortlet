import {useEffect, useState} from "react";
import {useSocket} from "../../context/SocketProvider.jsx";
import {joinChat, sendMessage} from "../../api/socket.js";
import {toast, ToastContainer} from "react-toastify";
import messageService from "../../services/messageService.js";
import authService from "../../services/authService.js";
import ChatSidebar from "../../components/messages/ChatSidebar.jsx";
import ConversationView from "../../components/messages/ConversationView.jsx";

const Message = () => {
    const socket = useSocket();
    const userId = authService.getUserId()
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const [chats, setChats] = useState([])
    const [viewConversation, setViewConversation] = useState(null)

    const fetchChats = async () => {
        try{
            const { chats } = await messageService.getChats();
            setChats(chats)
        }catch (e){
            toast.error(e.message)
        }
    }

    const fetchMessages = async () => {
        if(viewConversation !== null){
            try {
                const { messages } = await messageService.getMessages(viewConversation);
                setMessages(messages);
            } catch (err) {
                console.error('Error loading messages:', err);
            }
        }
    };

    const openConversation = (chatId) => {
        setViewConversation(chatId);
        setMessage('')
    };

    const handleMessage = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;
        sendMessage(viewConversation, message);
        fetchChats()
    };

    const goBackChats = () => {
        setViewConversation(null)
    }

    useEffect(() => {
        fetchChats()
        fetchMessages()
        if (!viewConversation) return;

        joinChat(viewConversation);

        const handleNewMessage = (msg) => {
            if (msg.chat?.id === viewConversation) {
                setMessages((prev) => {
                    return [...prev, msg];
                });
                setMessage('');
            }
        };

        socket.on('message:new', handleNewMessage);

        return () => {
            socket.off('message:new', handleNewMessage);
        };
    }, [viewConversation, socket]);

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-[2fr_5fr] md:gap-3 items-start bg-white">
                <ChatSidebar
                    chats={chats}
                    userId={userId}
                    viewConversation={viewConversation}
                    openConversation={openConversation}
                />

                <ConversationView
                    viewConversation={viewConversation}
                    handleMessage={handleMessage}
                    messages={messages}
                    setMessage={setMessage}
                    message={message}
                    userId={userId}
                    goBackChats={goBackChats}
                />
            </div>
            <ToastContainer />
        </>
    );
}

export default Message;
