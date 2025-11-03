"use client";

import React, { useState } from "react";

interface Partner {
  src: string;
  alt: string;
  name: string;
}

const SlidingPartnersCarousel: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  const partners: Partner[] = [
    { src: "/partners/grsp.png", alt: "Global Road Safety Partnership", name: "GRSP" },
    { src: "/partners/upfya.jpg", alt: "Uganda Parliamentary Forum for Youth Affairs", name: "UPFYA" },
    { src: "/partners/twaweza.png", alt: "Twaweza East Africa", name: "Twaweza" },
    { src: "/partners/wfd.png", alt: "Westminster Foundation for Democracy", name: "WFD" },
    { src: "/partners/kas.png", alt: "Konrad-Adenauer-Stiftung", name: "KAS" },
    { src: "/partners/gapp.jpeg", alt: "Global Action for Policy and Practice", name: "GAPP" },
    { src: "/partners/diakonia.jpeg", alt: "Diakonia", name: "Diakonia" },
    { src: "/partners/ned.jpeg", alt: "National Endowment for Democracy", name: "NED" },
    { src: "/partners/afidep.jpg", alt: "African Institute for Development Policy", name: "AFIDEP" },
  ];

  // Double the array for seamless looping
  const partnersExtended = [...partners, ...partners];

  const PartnerCard = ({ partner }: { partner: Partner }) => (
    <div
      className="flex-shrink-0 w-64 h-48 mx-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-white/20 border border-white/30 backdrop-blur-sm rounded-lg p-6 hover:bg-white/30 transition-all duration-300 shadow-md hover:shadow-lg w-full h-full flex items-center justify-center">
        <img
          src={partner.src}
          alt={partner.alt}
          className="h-16 w-auto object-contain mx-auto"
        />
      </div>
    </div>
  );

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
