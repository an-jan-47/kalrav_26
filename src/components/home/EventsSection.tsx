import ScrollStack, { ScrollStackItem } from '../ui/ScrollStack';
import { EventCard } from './EventCard';
import type { EventData } from './EventCard';

interface EventsSectionProps {
    events: EventData[];
}

export const EventsSection = ({ events }: EventsSectionProps) => {
    if (!events || events.length === 0) return null;

  return (
    <section className="relative py-24" id="events-section">
        {/* Section Header */}
        <div className="container mx-auto px-6 mb-12 text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-kalrav text-white tracking-widest mb-4">
                PAST LEGACIES
            </h2>
        </div>

        {/* Scroll Stack Animation Area */}
        <div className="w-full relative"> 
             <ScrollStack 
                stackOffset={120}
                cardOffset={50}
             >
                 {events.map((event) => (
                     <ScrollStackItem key={event.id} heightClassName="h-[500px]">
                         <EventCard event={event} />
                     </ScrollStackItem>
                 ))}
             </ScrollStack>
        </div>
    </section>
  );
};
