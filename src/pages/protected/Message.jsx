import io from 'socket.io-client'
import {useEffect, useState} from "react";
import {FaMagnifyingGlass} from "react-icons/fa6";
import {HiOutlinePaperAirplane} from "react-icons/hi";
import {FaRegCommentDots} from "react-icons/fa";
const socket = io(import.meta.env.VITE_CHAT_SOCKET_URL)

const Message = () => {
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const [viewConversation, setViewConversation] = useState(null)
    const conversations = [
        { sender: 1, receiver: 2, time: '10:00 AM', message: 'Hi! I’m interested in your 2‑bedroom apartment in Lekki for this weekend.' },
        { sender: 2, receiver: 1, time: '10:01 AM', message: 'Hello! It’s available from Friday 2 PM to Sunday noon.' },
        { sender: 1, receiver: 2, time: '10:02 AM', message: 'Great. What’s the total for two nights?' },
        { sender: 2, receiver: 1, time: '10:03 AM', message: 'That would be ₦60,000; cleaning and service fees are included.' },
        { sender: 1, receiver: 2, time: '10:04 AM', message: 'Perfect. Could you send a photo of the kitchen, please?' },
        { sender: 2, receiver: 1, time: '10:05 AM', message: 'Sure—just uploaded three new photos to the listing.' },
        { sender: 1, receiver: 2, time: '10:06 AM', message: 'Looks good! I’ll go ahead and book now.' },
        { sender: 1, receiver: 2, time: '10:06 AM', message: 'Thanks! See you Friday.' },
        { sender: 2, receiver: 1, time: '10:06 AM', message: 'Booking received and confirmed. Looking forward to hosting you!' },

        // 9
        { sender: 2, receiver: 1, time: '10:09 AM', message: 'Quick note: check‑in is self‑service with a smart lock.' },
        { sender: 1, receiver: 2, time: '10:10 AM', message: 'Great—please share the code when ready.' },
        { sender: 2, receiver: 1, time: '10:11 AM', message: 'Will do. Do you have any dietary restrictions? We provide a welcome snack.' },
        { sender: 1, receiver: 2, time: '10:12 AM', message: 'No restrictions. A bottle of water would be perfect, though.' },
        { sender: 2, receiver: 1, time: '10:13 AM', message: 'Noted. Would you like airport pickup? It’s ₦8,000 extra.' },
        { sender: 1, receiver: 2, time: '10:14 AM', message: 'Yes, that would be helpful—arrival is 1 PM Friday.' },
        { sender: 2, receiver: 1, time: '10:15 AM', message: 'All set. Driver’s name is Musa; he’ll text you Thursday.' },
        { sender: 1, receiver: 2, time: '10:16 AM', message: 'Awesome. How do I pay for the pickup?' },
        { sender: 2, receiver: 1, time: '10:17 AM', message: 'You can pay cash to Musa or add it to your card on file—your choice.' },

        // 18
        { sender: 1, receiver: 2, time: '10:18 AM', message: 'I’ll add it to my card now—please send the invoice.' },
        { sender: 2, receiver: 1, time: '10:19 AM', message: 'Invoice sent. Let me know once paid.' },
        { sender: 1, receiver: 2, time: '10:21 AM', message: 'Paid! Transaction ID ends in 8421.' },
        { sender: 2, receiver: 1, time: '10:22 AM', message: 'Payment received—thank you.' },
        { sender: 1, receiver: 2, time: '10:23 AM', message: 'Could you confirm Wi‑Fi speed? I’ll need to work Saturday morning.' },
        { sender: 2, receiver: 1, time: '10:24 AM', message: 'Sure. Last speed test was 120 Mbps down / 35 Mbps up.' },
        { sender: 1, receiver: 2, time: '10:25 AM', message: 'Perfect—that’s plenty.' },
        { sender: 2, receiver: 1, time: '10:26 AM', message: 'House rule reminder: no parties, quiet hours after 10 PM.' },
        { sender: 1, receiver: 2, time: '10:27 AM', message: 'Understood. It’ll just be me and my colleague.' },

        // 27
        { sender: 2, receiver: 1, time: '10:28 AM', message: 'Great. I’ll send the door code Thursday morning.' },
        { sender: 1, receiver: 2, time: '10:29 AM', message: 'Thanks again for the quick responses.' },
        { sender: 2, receiver: 1, time: '10:30 AM', message: 'Happy to help—safe travels and see you soon!' }
    ];


    const openConversation = (index) => {
        setViewConversation(index)
        setMessages(conversations)
    }

    const handleMessage = (e) => {
        e.preventDefault()
        console.log(e)
        return
        socket.emit('send_message', { message })
    }

    useEffect(() => {
        socket.on('receive_message', (msg) => {
            setMessages(prev => [...prev, msg])
        })
        return () => socket.disconnect()
    }, [socket])


    return (
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
                    {[...Array(15)].map((_, index) =>
                        <article
                            onClick={() => {openConversation(index)}}
                            key={index}
                            className={`cursor-pointer hover:bg-gray-200 hover:rounded-md ${viewConversation === index && 'bg-gray-300 rounded-xl'} py-4 px-2 flex flex-row items-center gap-3 border-gray-200 border-b`}
                        >
                            <img src="https://i.pravatar.cc/100?img=1" alt="avatar" className="w-6 h-6 md:w-11 md:h-11 rounded-full" />
                            <div className="w-full">
                                <div className="flex flex-row justify-between items-center">
                                    <h4 className="text-sm">Nathaniel Abolarin</h4>
                                    <span className="text-[9px] text-gray-400">23:35 AM</span>
                                </div>
                                <div className="flex flex-row justify-between items-center">
                                    <span className="text-[11px] text-gray-400 truncate">
                                        {/*<!----------Text maximum length is 27 -----------------!>*/}
                                        Lorem ipsum is a dummy or
                                    </span>
                                    <span className="text-[13px] text-white flex justify-center items-center p-2 bg-blue-400 h-5 w-5 rounded-full">{index}</span>
                                </div>
                            </div>
                        </article>
                    )}
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
                            e.target.style.height = `${Math.min(e.target.scrollHeight, 160)}px`; // ~5 rows
                        }}
                        onChange={(e) => setMessage(e.target.value)}
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
                                    <div className={`w-full flex ${conversation.sender === 1 ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-lg w-fit flex gap-1 
                                ${conversation.sender === 1 ? 'flex-row' : 'flex-row-reverse'}
                                `}>
                                            <span className="text-gray-400 text-nowrap text-[10px] content-center">{conversation.time}</span>
                                            <p
                                                className={`p-2 rounded-xl text-gray-800 text-base 
                                        ${conversation.sender === 1 ? 'bg-blue-100 rounded-br-none' : 'bg-blue-300 rounded-bl-none'}`}>
                                                {conversation.message}
                                            </p>
                                            <div className="content-end">
                                                <img src="https://i.pravatar.cc/100?img=1" alt="avatar" className="min-w-6 h-6 rounded-full" />
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
    );
}

export default Message;
