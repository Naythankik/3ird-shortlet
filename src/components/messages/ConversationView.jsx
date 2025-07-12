import { FaRegCommentDots } from "react-icons/fa";
import { HiOutlinePaperAirplane } from "react-icons/hi";
import MessageBubble from "./MessageBubble";

const ConversationView = ({ messages, viewConversation, handleMessage, setMessage, message, userId }) => {
    if (!viewConversation) {
        return (
            <div className="h-full flex flex-col items-center justify-center text-center gap-4 px-6">
                <FaRegCommentDots className="text-5xl text-blue-300/60 drop-shadow-sm" />
                <h2 className="text-xl font-semibold text-gray-500">No conversation selected</h2>
                <p className="text-gray-400 max-w-xs">Pick a chat from the sidebar to see messages here.</p>
            </div>
        );
    }

    return (
        <div
            style={{ scrollbarWidth: 'none'}}
            className="bg-white rounded-md p-3 pb-0 flex flex-col-reverse gap-4 h-[96vh] overflow-y-scroll">
            <form onSubmit={handleMessage} className="flex gap-3 sticky bottom-0 bg-white py-3">
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
                <button disabled={!message.length} type="submit" className="bg-blue-400 hover:opacity-100 opacity-80 rounded-full w-10 h-10 flex justify-center items-center">
                    <HiOutlinePaperAirplane className="text-white text-xl rotate-90" />
                </button>
            </form>

            <div className="flex flex-col gap-4">
                {messages.map((conversation, index) => (
                    <MessageBubble
                        key={index}
                        conversation={conversation}
                        userId={userId}
                    />
                ))}
            </div>
        </div>
    );
};

export default ConversationView;
