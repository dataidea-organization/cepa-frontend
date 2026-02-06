'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { fetchPageHeroImage } from '@/lib/citizens-voice-service';

interface CitizensVoiceHeroProps {
  title: string;
  subtitle: string;
  badge?: string;
}

export default function CitizensVoiceHero({ title, subtitle, badge }: CitizensVoiceHeroProps) {
  const [heroImage, setHeroImage] = useState<string>('/images/parliament.jpg');

  useEffect(() => {
    fetchPageHeroImage('citizens-voice').then((data) => {
      if (data?.image) {
        setHeroImage(data.image);
      }
    });
  }, []);

  return (
    <section className="relative h-96 overflow-hidden">
      <Image
        src={heroImage}
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
        priority
        unoptimized={heroImage.startsWith('http')}
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
        aria-hidden
      />
      <div className="absolute bottom-0 left-0 right-0 p-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {badge && (
            <div className="inline-flex items-center gap-2 rounded-lg bg-white/15 px-3 py-1.5 mb-4">
              <span className="text-sm font-medium text-white/90">{badge}</span>
            </div>
          )}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {title}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}
