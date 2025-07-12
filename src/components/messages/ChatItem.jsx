import {formattedDate} from "../../utils/dateUtils.js";

const ChatItem = ({ chat, conversation, openConversation, active }) => {
    return (
        <article
            onClick={() => openConversation(conversation.id)}
            className={`cursor-pointer hover:bg-gray-200 hover:rounded-md ${active ? 'bg-gray-300 rounded-xl' : ''} py-4 px-2 flex flex-row items-center gap-3 border-gray-200 border-b`}
        >
            <img src={chat.profilePicture} alt={chat.firstName} className="w-6 h-6 md:w-11 md:h-11 rounded-full" />
            <div className="w-full">
                <div className="flex flex-row justify-between items-center">
                    <h4 className="text-sm">{`${chat.firstName} ${chat.lastName}`}</h4>
                    <span className="text-[9px] text-gray-400">{formattedDate(conversation.lastMessage.updatedAt)}</span>
                </div>
                <div className="flex flex-row justify-between items-center">
                    <span className="text-[11px] text-gray-400 truncate">{conversation.lastMessage.text.slice(0, 30)}</span>
                    <span className={`text-[13px] text-white ${chat.unreadMessages ? 'flex' : 'hidden'} justify-center items-center p-2 bg-blue-400 h-5 w-5 rounded-full`}>
                        {chat.unreadMessages}
                    </span>
                </div>
            </div>
        </article>
    );
};

export default ChatItem;
