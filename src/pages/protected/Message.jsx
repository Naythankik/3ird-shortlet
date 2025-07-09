import {useEffect, useState} from "react";
import {FaMagnifyingGlass} from "react-icons/fa6";
import {HiOutlinePaperAirplane} from "react-icons/hi";
import {FaRegCommentDots} from "react-icons/fa";
import {useSocket} from "../../context/SocketProvider.jsx";
import {joinChat, sendMessage} from "../../api/socket.js";
import {toast, ToastContainer} from "react-toastify";
import messageService from "../../services/messageService.js";
import authService from "../../services/authService.js";

const Message = () => {
    const socket = useSocket();
    const userId = authService.getUserId()
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const [chats, setChats] = useState([])
    const [viewConversation, setViewConversation] = useState(null)

    const formattedDate = (value) => {
        const d = new Date(value);

        const hours = d.getHours();
        const minutes = d.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';

        const formattedHour = hours % 12 || 12;

        return `${formattedHour}:${minutes} ${ampm}`;
    };

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
                console.log(messages)
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

        /* CASE A: No chat yet – create one via REST, then join its room */
        // if (!viewConversation) {
        //     try {
        //         // assuming chats contain participants and you have selected "receiverId"
        //         const receiverId = selectedReceiverId; // <-- you'll need to set this
        //         const { chat, msg } = await messageService.createChat({
        //             receiverId,
        //             text: message,
        //         });
        //
        //         // append new chat to sidebar and open it
        //         setChats((prev) => [chat, ...prev]);
        //         setViewConversation(chat._id);
        //         setMessages([msg]);      // show first message
        //
        //         joinChat(chat._id);      // join the newly created room
        //         setMessage('');
        //     } catch (err) {
        //         toast.error(err.response?.data?.error || 'Could not create chat');
        //     }
        //     return;
        // }

        /* CASE B: Chat already exists – send via Socket.IO */
        sendMessage(viewConversation, message, (ack) => {
            if (ack?.status === 'ok') {
                setMessages((prev) => [
                    ...prev,
                    {
                        _id: ack.msgId,
                        chatId: viewConversation,
                        sender: userId,
                        text: message,
                        createdAt: new Date().toISOString(),
                    },
                ]);
                setMessage('');
            } else {
                toast.error(ack?.msg || 'Message failed');
            }
        });
    };

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
            <div
                className={`${viewConversation !== null ? 'hidden' : 'grid'} md:sticky md:top-4 md:grid rounded-md rounded-r-none overflow-y-scroll content-start h-[96vh] md:border-r border-gray-500`}
                style={{ scrollbarWidth: 'none'}}
            >
                <form className="pb-0 md:pb-3 border-b border-gray-300">
                    <div className="relative bg-white rounded-3xl p-3 flex md:justify-end text-base">
                        <input
                            type="text"
                            className="border-0 outline-0 text-gray-400 placeholder:text-gray-300 pl-6 md:pl-14"
                            id="search"
                            placeholder="Search Here ..."
                        />
                        <button className="text-gray-300 text-lg absolute top-1/2 left-3 transform -translate-y-1/2">
                            <FaMagnifyingGlass />
                        </button>
                    </div>
                </form>
                {/*<!-------- chat messages ----------------!>*/}

                <section className="flex flex-col w-full">
                    {chats?.map((c, id) =>
                        c.participants.filter(cha => cha.id !== userId).map((chat, index) =>
                            <article
                                onClick={() => {openConversation(c.id)}}
                                key={id}
                                className={`cursor-pointer hover:bg-gray-200 hover:rounded-md ${viewConversation === c.id && 'bg-gray-300 rounded-xl'} py-4 px-2 flex flex-row items-center gap-3 border-gray-200 border-b`}
                            >
                                <img src={chat.profilePicture} alt={`avatar-${chat.firstName}`} className="w-6 h-6 md:w-11 md:h-11 rounded-full" />
                                <div className="w-full">
                                    <div className="flex flex-row justify-between items-center">
                                        <h4 className="text-sm">{`${chat.firstName} ${chat.lastName}`}</h4>
                                        <span className="text-[9px] text-gray-400">{formattedDate(c.lastMessage.updatedAt)}</span>
                                    </div>
                                    <div className="flex flex-row justify-between items-center">
                                        <span className="text-[11px] text-gray-400 truncate">
                                            { c.lastMessage.text.slice(0,30) }
                                        </span>
                                        <span className="text-[13px] text-white flex justify-center items-center p-2 bg-blue-400 h-5 w-5 rounded-full">{index}</span>
                                    </div>
                                </div>
                            </article>
                        ))}
                </section>
            </div>

            <div
                style={{ scrollbarWidth: 'none'}}
                className={`bg-white rounded-md p-3 pb-0 ${viewConversation === null ? 'hidden md:flex' : 'flex'} flex-col-reverse gap-4 h-[96vh] overflow-y-scroll`}>
                {viewConversation !== null ?
                    <>
                        <form
                            onSubmit={handleMessage}
                            className="flex gap-3 sticky bottom-0 bg-white py-3"
                        >
                            <textarea
                                rows="1"
                                onInput={(e) => {
                                    e.target.style.height = 'auto';
                                    e.target.style.height = `${Math.min(e.target.scrollHeight, 160)}px`;
                                }}
                                onChange={(e) => setMessage(e.target.value)}
                                value={message}
                                className="overflow-hidden text-gray-600 resize-none border w-full border-gray-300 rounded-xl p-2 focus:outline-none focus:border-blue-300 focus:border-2"
                                placeholder="Say something"
                            />

                            <button
                                disabled={!message.length}
                                type="submit" className="bg-blue-400 hover:opacity-100 opacity-80 rounded-full w-10 h-10 flex justify-center items-center">
                                <HiOutlinePaperAirplane
                                    className="text-white text-xl rotate-90" />
                            </button>
                        </form>
                        {/*<!------------- Message display ------------- !>*/}
                        <div className="flex flex-col gap-4">
                            {messages.map((conversation, index) =>(
                                <div key={index}>
                                    <p className="hidden text-center text-xs text-gray-300">1 new message</p>
                                    <div className={`w-full flex ${conversation.sender.id === userId ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-lg w-fit flex gap-1 
                                        ${conversation.sender.id === userId ? 'flex-row' : 'flex-row-reverse'}
                                        `}>
                                            <span className="text-gray-400 text-nowrap text-[10px] content-center">{formattedDate(conversation.createdAt)}</span>
                                            <p
                                                className={`p-2 rounded-xl text-gray-800 text-base 
                                                ${conversation.sender.id === userId ? 'bg-blue-100 rounded-br-none' : 'bg-blue-300 rounded-bl-none'}`}>
                                                {conversation.text}
                                            </p>
                                            <div className="content-end">
                                                <img src={conversation?.sender?.profilePicture} alt="avatar" className="min-w-6 h-6 rounded-full" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </> :
                    <div className="h-full flex flex-col items-center justify-center text-center gap-4 px-6">
                            {/* Icon */}
                            <FaRegCommentDots className="text-5xl text-blue-300/60 drop-shadow-sm" />

                            {/* Heading */}
                            <h2 className="text-xl font-semibold text-gray-500">
                                No conversation selected
                            </h2>

                            {/* Helper text */}
                            <p className="text-gray-400 max-w-xs">
                                Pick a chat from the sidebar to see messages here.
                            </p>
                        </div>
                }
            </div>

        </div>
            <ToastContainer />
        </>
    );
}

export default Message;
