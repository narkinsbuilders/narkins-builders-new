'use client';

import React, { useState } from 'react';
import Carousel from '@/components/features/carousel-op/carousel-op';

interface ImageCarouselProps {
  images: Array<{src: string, alt: string, title: string, description: string}>;
  height?: string;
  autoPlay?: boolean;
}

export function ImageCarousel({ images, height = "500px", autoPlay = false }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const carouselData = images.map(img => ({
    image: img.src,
    name: `${img.title} - ${img.description}`,
    alt: img.alt
  }));

  const currentImage = images[currentIndex];

  return (
    <div className="my-8 sm:my-12">
      <Carousel
        id="blog-carousel"
        swipe
        autoPlay={autoPlay}
        autoPlayInterval={5000}
        slideShow={false}
        loop
        hideIndicators={false}
        hideCaption={true}
        className="w-full rounded-xl overflow-hidden shadow-lg"
        displayMode="default"
        dataSource={carouselData}
        height={height}
        onChange={(index) => setCurrentIndex(index)}
      />

      {/* External Caption */}
      <div className="mt-4 px-2 text-center">
        <h3 className="text-gray-900 font-semibold text-base sm:text-lg mb-1">
          {currentImage.title}
        </h3>
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
          {currentImage.description}
        </p>
      </div>
    </div>
  );
}

export default ImageCarousel;
