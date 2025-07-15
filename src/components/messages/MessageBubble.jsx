import {formattedDate} from "../../utils/dateUtils.js";
import {format, isToday, isYesterday} from "date-fns";

const MessageBubble = ({index, conversation, previousMessage, userId }) => {

    const formatChatDate = (dateStr) => {
        const date = new Date(dateStr);
        if (isToday(date)) return 'Today';
        if (isYesterday(date)) return 'Yesterday';
        return format(date, 'MMMM d, yyyy');
    }

    const shouldShowDateSeparator = () => {
        if (!previousMessage) return true;
        const prevDate = new Date(previousMessage.createdAt);
        const currDate = new Date(conversation.createdAt);
        return prevDate.toDateString() !== currDate.toDateString();
    };

    return <div key={index}>
        <p className="hidden text-center text-xs text-gray-300">1 new message</p>
        {shouldShowDateSeparator() && (
            <p className="bg-gray-200 text-center px-5 rounded-lg font-thin text-sm my-4 w-fit mx-auto">
                {formatChatDate(conversation.createdAt)}
            </p>
        )}

        <div className={`w-full flex ${conversation.sender.id === userId ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-lg w-fit flex gap-1 ${conversation.sender.id === userId ? 'flex-row' : 'flex-row-reverse'}`}>
                <span className="text-gray-400 text-nowrap text-[10px] content-center">{formattedDate(conversation.createdAt)}</span>
                <pre
                    className={`p-2 rounded-xl font-normal text-gray-800 text-wrap text-base ${conversation.sender.id === userId ? 'bg-blue-100 rounded-br-none' : 'bg-blue-300 rounded-bl-none'}`}
                    style={{fontFamily: "'Montserrat', sans-serif"}}
                >
                    {conversation.text}
                </pre>
                <div className="content-end">
                    <img src={conversation?.sender?.profilePicture} alt="avatar" className="min-w-6 h-6 rounded-full" />
                </div>
            </div>
        </div>
    </div>
}

export default MessageBubble;
