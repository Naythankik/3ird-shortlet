import {formattedDate} from "../../utils/dateUtils.js";

const MessageBubble = ({index, conversation, userId }) => {
    return <div key={index}>
        <p className="hidden text-center text-xs text-gray-300">1 new message</p>
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
