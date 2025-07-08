import io from 'socket.io-client'
import {useEffect, useState} from "react";
import {FaMagnifyingGlass} from "react-icons/fa6";
import {HiOutlinePaperAirplane} from "react-icons/hi";
const socket = io(import.meta.env.VITE_CHAT_SOCKET_URL)

const Message = () => {
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])

    const conversations = [
        { sender: 1, receiver: 2, time: '10:00 AM', message: 'Hi! I’m interested in your 2‑bedroom apartment in Lekki for this weekend.' },
        { sender: 2, receiver: 1, time: '10:01 AM', message: 'Hello! It’s available from Friday 2 PM to Sunday noon.' },
        { sender: 1, receiver: 2, time: '10:02 AM', message: 'Great. What’s the total for two nights?' },
        { sender: 2, receiver: 1, time: '10:03 AM', message: 'That would be ₦60,000; cleaning and service fees are included.' },
        { sender: 1, receiver: 2, time: '10:04 AM', message: 'Perfect. Could you send a photo of the kitchen, please?' },
        { sender: 2, receiver: 1, time: '10:05 AM', message: 'Sure—just uploaded three new photos to the listing.' },
        { sender: 1, receiver: 2, time: '10:06 AM', message: 'Looks good! I’ll go ahead and book now.' },
        { sender: 2, receiver: 1, time: '10:07 AM', message: 'Booking received and confirmed. Looking forward to hosting you!' },
        { sender: 1, receiver: 2, time: '10:08 AM', message: 'Thanks! See you Friday.' },

        // 9
        { sender: 2, receiver: 1, time: '10:09 AM', message: 'Quick note: check‑in is self‑service with a smart lock.' },
        { sender: 1, receiver: 2, time: '10:10 AM', message: 'Great—please share the code when ready.' },
        { sender: 2, receiver: 1, time: '10:11 AM', message: 'Will do. Do you have any dietary restrictions? We provide a welcome snack.' },
        { sender: 1, receiver: 2, time: '10:12 AM', message: 'No restrictions. A bottle of water would be perfect, though.' },
        { sender: 2, receiver: 1, time: '10:13 AM', message: 'Noted. Would you like airport pickup? It’s ₦8,000 extra.' },
        { sender: 1, receiver: 2, time: '10:14 AM', message: 'Yes, that would be helpful—arrival is 1 PM Friday.' },
        { sender: 2, receiver: 1, time: '10:15 AM', message: 'All set. Driver’s name is Musa; he’ll text you Thursday.' },
        { sender: 1, receiver: 2, time: '10:16 AM', message: 'Awesome. How do I pay for the pickup?' },
        { sender: 2, receiver: 1, time: '10:17 AM', message: 'You can pay cash to Musa or add it to your card on file—your choice.' },

        // 18
        { sender: 1, receiver: 2, time: '10:18 AM', message: 'I’ll add it to my card now—please send the invoice.' },
        { sender: 2, receiver: 1, time: '10:19 AM', message: 'Invoice sent. Let me know once paid.' },
        { sender: 1, receiver: 2, time: '10:21 AM', message: 'Paid! Transaction ID ends in 8421.' },
        { sender: 2, receiver: 1, time: '10:22 AM', message: 'Payment received—thank you.' },
        { sender: 1, receiver: 2, time: '10:23 AM', message: 'Could you confirm Wi‑Fi speed? I’ll need to work Saturday morning.' },
        { sender: 2, receiver: 1, time: '10:24 AM', message: 'Sure. Last speed test was 120 Mbps down / 35 Mbps up.' },
        { sender: 1, receiver: 2, time: '10:25 AM', message: 'Perfect—that’s plenty.' },
        { sender: 2, receiver: 1, time: '10:26 AM', message: 'House rule reminder: no parties, quiet hours after 10 PM.' },
        { sender: 1, receiver: 2, time: '10:27 AM', message: 'Understood. It’ll just be me and my colleague.' },

        // 27
        { sender: 2, receiver: 1, time: '10:28 AM', message: 'Great. I’ll send the door code Thursday morning.' },
        { sender: 1, receiver: 2, time: '10:29 AM', message: 'Thanks again for the quick responses.' },
        { sender: 2, receiver: 1, time: '10:30 AM', message: 'Happy to help—safe travels and see you soon!' }
    ];

    const handleMessage = (e) => {
        e.preventDefault()
        socket.emit('send_message', { message })
    }

    useEffect(() => {
        socket.on('receive_message', (msg) => {
            setMessages(prev => [...prev, msg])
        })
        return () => socket.disconnect()
    }, [socket])


    return (
        <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-3 items-start">
            <div className="sticky top-4 grid bg-white rounded-md">
                <form className="pb-3 border-b border-gray-300">
                    <div className="relative bg-white rounded-3xl p-3 flex justify-end w-[93%] text-base">
                        <input
                            type="text"
                            className="border-0 outline-0 bg-transparent text-gray-400 placeholder:text-gray-300 pl-14"
                            id="search"
                            placeholder="Search Here ..."
                        />
                        <button className="text-gray-300 text-lg absolute top-1/2 left-3 transform -translate-y-1/2">
                            <FaMagnifyingGlass />
                        </button>
                    </div>
                </form>
                {/*<!-------- chat messages ----------------!>*/}
                <section className="flex flex-col gap-4 w-full">
                    {[...Array(5)].map((_, index) =>
                        <article key={index} className="hover:bg-gray-200 hover:rounded-md p-2 flex flex-row items-center gap-3">
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
                                    <span className="text-[9px] text-gray-400 flex justify-center items-center bg-blue-500 h-4 w-4 rounded-full">2</span>
                                </div>
                            </div>
                        </article>
                    )}
                </section>
            </div>
            <div
                className="bg-white rounded-md p-3 pb-0 flex flex-col-reverse gap-4 h-[96vh] overflow-y-scroll">
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
                        className="overflow-hidden text-gray-600 resize-none border w-full border-gray-300 rounded-xl p-2 focus:outline-none focus:border-blue-300 focus:border-2"
                        placeholder="Say something"
                    />

                    <button className="bg-blue-400 hover:opacity-100 opacity-80 rounded-full w-10 h-10 flex justify-center items-center">
                        <HiOutlinePaperAirplane
                            className="text-white text-xl rotate-90" />
                    </button>
                </form>
                {/*<!------------- Message display ------------- !>*/}
                <div className="flex flex-col gap-4">
                    {conversations.map((conversation, index) =>(
                        <div key={index}>
                            <p className="hidden text-center text-xs text-gray-300">1 new message</p>
                            <div className={`w-full flex ${conversation.sender === 1 ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-lg w-fit flex gap-1
                        ${conversation.sender === 1 ? 'flex-row' : 'flex-row-reverse'}
                        `}>
                                    <span className="text-gray-400 text-nowrap text-[10px] content-center">{conversation.time}</span>
                                    <p
                                        className={`p-2 rounded-md text-gray-800 text-base
                                 ${conversation.sender === 1 ? 'bg-blue-100 rounded-br-none' : 'bg-blue-300 rounded-bl-none'}`}>
                                        {conversation.message}
                                    </p>
                                    <div className="content-end">
                                        <img src="https://i.pravatar.cc/100?img=1" alt="avatar" className="w-6 h-6 rounded-full" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Message;
