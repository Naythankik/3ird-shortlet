import AmenitySection from "../../components/landing/AmenitySection.jsx";
import ReviewSection from "../../components/landing/ReviewSection.jsx";
import HeroSection from "../../components/landing/HeroSection.jsx";
import ExperienceSection from "../../components/landing/ExperienceSection.jsx";
import RoomRatesSection from "../../components/landing/RoomRatesSection.jsx";
import FAQSection from "../../components/landing/FAQSection.jsx";

const LandingPage = () => {
    return (
        <main className="bg-gradient-to-r from-blue-50 to-white">
            <HeroSection />
            <ExperienceSection />
            <RoomRatesSection />
            <AmenitySection />
            <ReviewSection />
            <FAQSection />
        </main>
    );
};

export default LandingPage;
