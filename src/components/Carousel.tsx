import React, { useState, useRef } from 'react';
import './Carousel.scss';

interface CarouselProps {
  images: string[];
  itemWidth?: number; // px, default 130
  frameSize?: number; // default 3
  step?: number; // default 3
  animationDuration?: number; // ms, default 1000
  infinite?: boolean; // default false
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [offset, setOffset] = useState(0); // index offset from 0
  const maxOffset = images.length - frameSize;

  const listRef = useRef<HTMLUListElement>(null);

  const goNext = () => {
    let newOffset = offset + step;

    if (infinite) {
      newOffset %= images.length;
    } else {
      newOffset = Math.min(newOffset, maxOffset);
    }

    setOffset(newOffset);
  };

  const goPrev = () => {
    let newOffset = offset - step;

    if (infinite) {
      newOffset = (images.length + newOffset) % images.length;
    } else {
      newOffset = Math.max(newOffset, 0);
    }

    setOffset(newOffset);
  };

  const translateX = -(offset * itemWidth);

  const listStyle: React.CSSProperties = {
    width: `${images.length * itemWidth}px`,
    transform: `translateX(${translateX}px)`,
    transition: `transform ${animationDuration}ms ease`,
  };

  return (
    <div
      className="Carousel"
      style={{
        width: frameSize * itemWidth,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <ul className="Carousel__list" ref={listRef} style={listStyle}>
        {images.map((src, index) => (
          <li
            key={src + index}
            className="Carousel__item"
            style={{ width: itemWidth }}
          >
            <img src={src} alt={`Slide ${index + 1}`} width={itemWidth} />
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="Carousel__button Carousel__button--prev"
        onClick={goPrev}
        data-cy="prev"
      >
        Prev
      </button>
      <button
        type="button"
        className="Carousel__button Carousel__button--next"
        onClick={goNext}
        data-cy="next"
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
