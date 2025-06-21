import FAQArticle from "./FAQArticle.jsx";
import Faqs from "../../data/faqs.jsx";
import FAQ from "../../assets/faq.webp";

const FAQSection = () => {
    return (
        <section id="faq" className="flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-20 py-6 md:py-16 gap-4 md:gap-10">

            <div className="md:w-1/2 text-center space-y-6 md:space-y-8 w-[90%] mx-auto">
                <h1 className="text-xl md:tex-3xl lg:text-5xl font-bold leading-tight text-blue-800 uppercase">
                    Frequently Asked Questions
                </h1>
                <div className="flex flex-col gap-3">
                    <FAQArticle articles={Faqs} />
                </div>
            </div>

            <div className="w-full md:w-1/2 flex justify-center">
                <img
                    src={FAQ}
                    alt="Apartment view"
                    title="FAQ on our shortlets"
                    className="rounded-2xl shadow-md w-full h-auto md:h-[400px] object-contain lg:object-cover"
                />
            </div>
        </section>
    )
}

export default FAQSection;
