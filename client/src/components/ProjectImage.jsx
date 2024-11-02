import React, { useState } from "react";

const ProjectImage = (image) => {
  const items = Array.from({ length: 5 }).map((_, index) => ({
    id: index,
    content: index + 1,
  }));
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="w-full max-w-xs mx-auto flex flex-col items-center">
      <div className="relative w-full overflow-hidden">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {/* {items.map((item) => ( */}
            <div
              className="w-full flex-shrink-0 p-1"
            >
              <div className="bg-white shadow-lg rounded-lg">
                <div className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{image}</span>
                </div>
              </div>
            </div>
          {/* ))} */}
        </div>
      </div>

      <div className="flex mt-4 space-x-2">
        <button
          onClick={handlePrevious}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default  ProjectImage;
