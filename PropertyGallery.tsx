import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PropertyGalleryProps {
  images: string[];
  activeImage: number;
  onImageChange: (index: number) => void;
}

const PropertyGallery: React.FC<PropertyGalleryProps> = ({
  images,
  activeImage,
  onImageChange
}) => {
  const handlePrevious = () => {
    onImageChange(activeImage === 0 ? images.length - 1 : activeImage - 1);
  };

  const handleNext = () => {
    onImageChange(activeImage === images.length - 1 ? 0 : activeImage + 1);
  };

  return (
    <div className="relative w-full h-full">
      <AnimatePresence mode="wait">
        <motion.img
          key={activeImage}
          src={images[activeImage]}
          alt={`Property view ${activeImage + 1}`}
          className="w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        />
      </AnimatePresence>

      {/* Navigation Buttons */}
      <button
        onClick={handlePrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Image Counter */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/50 text-white rounded-full text-sm">
        {activeImage + 1} / {images.length}
      </div>

      {/* Thumbnail Strip */}
      <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
        <div className="flex gap-2 justify-center">
          {images.map((image, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onImageChange(index)}
              className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                index === activeImage
                  ? 'border-blue-500'
                  : 'border-transparent hover:border-white/50'
              }`}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyGallery;