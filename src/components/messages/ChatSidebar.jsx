import { FaMagnifyingGlass } from "react-icons/fa6";
import ChatItem from "./ChatItem";

const ChatSidebar = ({ chats, userId, openConversation, viewConversation }) => {
    return (
        <div
            style={{ scrollbarWidth: 'none'}}
            className={`${viewConversation !== null ? 'hidden' : 'grid'} md:sticky md:top-4 md:grid rounded-md rounded-r-none overflow-y-scroll content-start h-[96vh] md:border-r border-gray-500`}>
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

            <section className="flex flex-col w-full">
                {chats?.map((c, id) =>
                    c.participants
                        .filter((cha) => cha.id !== userId)
                        .map((chat, index) => (
                            <ChatItem
                                key={`${id}-${index}`}
                                chat={chat}
                                conversation={c}
                                openConversation={openConversation}
                                active={viewConversation === c.id}
                            />
                        ))
                )}
            </section>
        </div>
    );
};

export default ChatSidebar;
