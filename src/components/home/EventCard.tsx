import React from 'react';
import { LazyImage } from '../ui/LazyImage';

export interface EventData {
  id: number;
  image: string;
}

interface EventCardProps {
  event: EventData;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <div className="relative w-full h-full group bg-neutral-900 rounded-xl overflow-hidden">
      <LazyImage 
          src={event.image} 
          alt="Legacy Event"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      {/* Subtle overlay for depth */}
      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
    </div>
  );
};
