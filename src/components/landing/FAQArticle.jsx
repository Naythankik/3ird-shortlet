import {useState} from "react";
import {FaCaretDown, FaCaretUp} from "react-icons/fa";

const FAQArticle = ({articles}) => {
    const [seeAnswer, setSeeAnswer] = useState(null);
    const toggleOptions = (id) => {
        setSeeAnswer(prevId => (prevId === id ? null : id));
    }

    return articles.map((article, index) => {
        const isOpen = seeAnswer === index;

        return (
            <button key={index} className="w-full bg-white rounded-lg p-5 shadow" onClick={() => toggleOptions(index)}>
                <p className="flex items-center justify-between">
                    {article.question}
                    {isOpen ? <FaCaretUp /> : <FaCaretDown />}
                </p>
                <span className={`${isOpen ? 'inline-block' : 'hidden'} mt-4 text-left text-balance font-medium text-gray-500`}>
                {article.answer}
            </span>
            </button>
        )
    })
}

export default FAQArticle;
