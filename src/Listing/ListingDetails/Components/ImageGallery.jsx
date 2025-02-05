import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

function ImageGallery({ carDetail }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = carDetail?.images || [];

  useEffect(() => {
    if (images.length) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 10000); // Change image every 5 seconds

      return () => clearInterval(interval);
    }
  }, [images.length]);

  if (!images.length) {
    return <div className="text-gray-500 text-center p-5">No images available</div>;
  }

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Image Display with Animation */}
      <div className="relative w-full h-[500px] overflow-hidden rounded-xl">
        <AnimatePresence>
          <motion.img
            key={currentImageIndex}
            src={images[currentImageIndex]?.imageUrl}
            alt="Car"
            className="w-full h-full object-cover rounded-xl shadow-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.6 }}
          />
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevImage}
        className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-black/50 p-3 rounded-full text-white hover:bg-black/70 transition"
      >
        <IoChevronBack size={25} />
      </button>
      <button
        onClick={nextImage}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-black/50 p-3 rounded-full text-white hover:bg-black/70 transition"
      >
        <IoChevronForward size={25} />
      </button>

      {/* Progress Bar */}
      <div className="relative w-full h-1 bg-gray-200 rounded mt-3">
        <motion.div
          className="absolute top-0 left-0 h-full bg-blue-500 rounded"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 5, ease: "linear" }}
          key={currentImageIndex}
        />
      </div>

      {/* Indicator Dots */}
      <div className="flex justify-center mt-3 gap-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`h-3 w-3 rounded-full transition-all ${currentImageIndex === index ? "bg-blue-500 scale-125" : "bg-gray-400"}`}
          />
        ))}
      </div>

      {/* Thumbnail Navigation */}
      <div className="flex mt-5 gap-2 justify-center overflow-x-auto">
        {images.map((image, index) => (
          <motion.img
            key={index}
            src={image.imageUrl}
            alt={`Thumbnail ${index}`}
            className={`w-16 h-16 object-cover rounded-lg cursor-pointer ${currentImageIndex === index ? "border-4 border-blue-500" : "border-2 border-gray-300"}`}
            whileHover={{ scale: 1.1 }}
            onClick={() => setCurrentImageIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default ImageGallery;

