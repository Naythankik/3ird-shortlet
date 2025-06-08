import React, {useEffect, useState} from 'react';

const ImageCarousel = ({ images, name, interval = 4000 }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const totalImages = images.length;

    const goToNext = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % totalImages);
    };

    const goToPrev = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + totalImages) % totalImages);
    };

    useEffect(() => {
        const autoSlide = setInterval(goToNext, interval);
        return () => clearInterval(autoSlide);
    }, [totalImages, interval]);

    return (
        <div className="relative w-full h-72 md:h-40 overflow-hidden rounded-lg mb-3">
            {/* Image */}
            <img
                src={images[currentImageIndex]}
                alt={`${name} image`}
                className="w-full h-72 md:h-40 object-cover transition-opacity duration-300"
                loading="lazy"
            />

            {/* Carousel navigation arrows */}
            {totalImages > 1 && (
                <>
                    <button
                        onClick={goToPrev}
                        className="absolute top-1/2 left-2 transform -translate-y-1/2 hover:bg-opacity-100 text-3xl text-blue-600 rounded-full p-1 shadow"
                        aria-label="Previous image"
                    >
                        ‹
                    </button>
                    <button
                        onClick={goToNext}
                        className="absolute top-1/2 right-2 transform -translate-y-1/2 hover:bg-opacity-100 text-3xl text-blue-600 rounded-full p-1 shadow"
                        aria-label="Next image"
                    >
                        ›
                    </button>
                </>
            )}

            {/* Indicators */}
            <div className="absolute bottom-2 w-full flex justify-center items-center gap-2">
                {images.map((_, index) => (
                    <span
                        key={index}
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                            index === currentImageIndex ? 'bg-blue-600' : 'bg-blue-300'
                        }`}
                    ></span>
                ))}
            </div>
        </div>
    );
};

export default ImageCarousel;
