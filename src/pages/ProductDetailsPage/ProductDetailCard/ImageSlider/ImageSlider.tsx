import { useState } from 'react';
import ArrowRightIcon from 'components/icons/ArrowRightIcon';
import styles from './imageSlider.module.scss';

interface ImageSliderProps {
    images: { url: string }[];
}

const ImageSlider = ({ images }: ImageSliderProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        setCurrentIndex(prev => Math.max(prev - 1, 0));
    };

    const goToNext = () => {
        setCurrentIndex(prev => Math.min(prev + 1, images.length - 1));
    };

    const canGoPrevious = currentIndex > 0;
    const canGoNext = currentIndex < images.length - 1;

    return (
        <div className={styles.imageSlider}>
            <button
                className={styles.sliderRight}
                onClick={goToPrevious}
                disabled={!canGoPrevious}
                aria-label="Previous image"
            >
                <ArrowRightIcon width={35} height={35} viewBox='0 0 35 35' style={{ rotate: '180deg' }} />
            </button>

            <img
                src={images[currentIndex].url}
                alt={`Product view ${currentIndex + 1}`}
                className={styles.image}
            />

            <button
                className={styles.sliderLeft}
                onClick={goToNext}
                disabled={!canGoNext}
                aria-label="Next image"
            >
                <ArrowRightIcon width={35} height={35} viewBox='0 0 35 35' />
            </button>
        </div>
    );
};

export default ImageSlider;