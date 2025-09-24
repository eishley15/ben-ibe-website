import React from "react";
import TiltedCard from "./TiltedCard";

const Service = ({ title, description, image, alt }) => {
  return (
    <div className="service-item border-t border-gray-300 pt-8">
      <div className="flex flex-col lg:flex-row h-100 items-center justify-between py-8">
        {/* Text Content - Left side */}
        <div className="flex-1 lg:max-w-md my-100">
          <h3 className="text-[#9C322B] text-2xl md:text-3xl font-bold mb-6 leading-tight my-10">
            {title}
          </h3>
          <p className="text-gray-700 text-base md:text-lg leading-relaxed">
            {description}
          </p>
        </div>

        {/* Image - Right side */}
        <div className="flex-1 lg:max-w-md flex justify-end w-full">
          <div className="relative overflow-hidden rounded-lg m-10 right-0">
            <TiltedCard
              imageSrc={image}
              altText={alt}
              captionText={title} // Use the service title as the caption text
              containerHeight="320px" // Adjusted for the existing layout
              containerWidth="400px" // Adjusted for the existing layout
              imageHeight="320px"
              imageWidth="400px"
              rotateAmplitude={14}
              scaleOnHover={1.1}
              showMobileWarning={false} // Disable warning for a cleaner look
              showTooltip={true}
              displayOverlayContent={false} // Set to false unless you have content
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
