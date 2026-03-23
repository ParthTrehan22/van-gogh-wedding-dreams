import EventCard from "./EventCard";

const events = [
  {
    name: "Haldi",
    date: "Friday, March 13th 2026",
    time: "1:00 PM Onwards",
    description: "A joyful ritual to bless the couple",
    theme: "yellow",
    atmosphere: "haldi" as const,
  },
  {
    name: "Sangeet",
    date: "Friday, March 13th 2026",
    time: "7:00 PM Onwards",
    description: "A night of dance and music with family and friends",
    theme: "black",
    atmosphere: "sangeet" as const,
  },
  {
    name: "Varmala",
    date: "Saturday, March 14th 2026",
    time: "2:00 PM Onwards",
    description: "The sacred union of two souls",
    theme: "pink",
    atmosphere: "varmala" as const,
  },
  {
    name: "Reception",
    date: "Saturday, March 14th 2026",
    time: "8:00 PM",
    description: "A casual dining celebration with family and friends",
    theme: "blue",
    atmosphere: "reception" as const,
  },
] as const;

const EventsSection = () => {
  return (
    <section className="relative z-10 w-full min-h-screen bg-white/10 backdrop-blur-md border-t border-white/10 overflow-hidden">
      {/* Blend frosted footer into SeeTheRoute green so the starfield never shows through */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-28 bg-gradient-to-b from-transparent via-[#40826D]/35 to-[#40826D]"
        aria-hidden
      />
      <div className="relative z-30 flex flex-col">
        {events.map((event, index) => (
          <div key={event.name} className="w-full">
            <EventCard
              title={event.name}
              date={event.date}
              time={event.time}
              description={event.description}
              delay={0.2} // fixed delay since they appear one by one
              theme={event.theme}
              atmosphere={event.atmosphere}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default EventsSection;
