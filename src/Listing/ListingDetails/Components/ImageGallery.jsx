import React from 'react'
import { useState, useEffect } from 'react';

function ImageGallery({ carDetail }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (carDetail?.images?.length) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carDetail.images.length);
      }, 5000); // Change image every 5 seconds

      return () => clearInterval(interval);
    }
  }, [carDetail?.images?.length]);

  if (!carDetail?.images?.length) {
    return <div>No images available</div>;
  }

  return (
    <div>
      <img
        src={carDetail.images[currentImageIndex].imageUrl}
        className='w-full h-[500px] object-cover rounded-xl'
        alt=""
      />
      <div className="relative w-full h-1 bg-gray-200 rounded mt-2">
        <div
          className="absolute top-0 left-0 h-full bg-blue-500 rounded"
          style={{ width: `${(currentImageIndex) * (200 / carDetail.images.length)}%`, transition: 'width 5s linear' }}
        ></div>
      </div>
    </div>
  )
}

export default ImageGallery