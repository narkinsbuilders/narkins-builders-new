"use client"

import React, { useState } from "react"
import Carousel from "@/components/features/carousel-op/carousel-op"

interface BlogImageCarouselProps {
  images: Array<{
    src: string
    alt: string
    title: string
    description: string
  }>
  heightClass?: string
  autoPlay?: boolean
}

export default function BlogImageCarousel({
  images,
  heightClass = "h-[400px] sm:h-[520px] md:h-[700px] lg:h-[800px]",
  autoPlay = false,
}: BlogImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const carouselData = images.map((img) => ({
    image: img.src,
    name: `${img.title} - ${img.description}`,
    alt: img.alt,
  }))
  const currentImage = images[currentIndex]

  return (
    <div className="my-8 sm:my-12 px-2 sm:px-4 md:px-0">
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
        heightClass={heightClass}
        onChange={setCurrentIndex}
      />
      <div className="mt-4 px-2 text-center">
        <h3 className="text-gray-900 font-semibold text-base sm:text-lg mb-1">
          {currentImage.title}
        </h3>
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
          {currentImage.description}
        </p>
      </div>
    </div>
  )
}
