"use client";

import React, { useState } from "react";

interface Partner {
  id: number;
  name: string;
  full_name: string | null;
  logo_url: string | null;
  website_url: string | null;
}

interface SlidingPartnersCarouselProps {
  partners: Partner[];
}

const SlidingPartnersCarousel: React.FC<SlidingPartnersCarouselProps> = ({ partners }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Double the array for seamless looping
  const partnersExtended = [...partners, ...partners];

  const PartnerCard = ({ partner }: { partner: Partner }) => {
    const content = (
      <div
        className="flex-shrink-0 w-64 h-48 mx-4"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="bg-white/20 border border-white/30 backdrop-blur-sm rounded-lg p-6 hover:bg-white/30 transition-all duration-300 shadow-md hover:shadow-lg w-full h-full flex items-center justify-center">
          <img
            src={partner.logo_url || '/partners/default-logo.png'}
            alt={partner.full_name || partner.name}
            className="h-16 w-auto object-contain mx-auto"
          />
        </div>
      </div>
    );

    if (partner.website_url) {
      return (
        <a href={partner.website_url} target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      );
    }

    return content;
  };

  return (
    <>
      <style>{`
        @keyframes slideLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .carousel-row {
          display: flex;
          overflow: hidden;
          width: 100%;
        }

        .carousel-track {
          display: flex;
          animation: slideLeft 40s linear infinite;
        }

        .carousel-track.paused {
          animation-play-state: paused;
        }
      `}</style>

      <div className="w-full">
        {/* Single Row - Moving Left */}
        <div
          className="carousel-row"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            className={`carousel-track ${isHovered ? "paused" : ""} p-2`}
          >
            {partnersExtended.map((partner, index) => (
              <PartnerCard key={`partner-${index}`} partner={partner} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SlidingPartnersCarousel;
