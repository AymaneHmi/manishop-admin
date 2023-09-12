'use client';

import { useState } from "react";

interface ImageSliderProps {
    images?: string[];
    src: string | undefined ;
}

const ImageSlider: React.FC<ImageSliderProps> = ({
    images,
    src
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
    const isFirstImg = currentIndex === 0;
    const newIndex = images && isFirstImg ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        const isLastImg = images && currentIndex === images.length - 1;
        const newIndex = isLastImg ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };
    return (
        <>
            test
        </>
    )
}

export default ImageSlider;