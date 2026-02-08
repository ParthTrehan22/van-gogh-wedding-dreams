import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { fadeUpVariants } from "@/lib/animations";
import EventCard from "./EventCard";
import lanternImg from "@/assets/Lantern.png";

const events = [
  {
    name: "Haldi",
    date: "Friday, March 13th 2026",
    time: "1:00 PM Onwards",
    description: "A joyful ritual to bless the couple",
    theme: "yellow"
  },
  {
    name: "Sangeet",
    date: "Friday, March 13th 2026",
    time: "7:00 PM Onwards",
    description: "A night of dance and music with family and friends",
    theme: "black"
  },
  {
    name: "Varmala",
    date: "Saturday, March 14th 2026",
    time: "2:00 PM Onwards",
    description: "The sacred union of two souls",
    theme: "pink"
  },
  {
    name: "Reception",
    date: "Saturday, March 14th 2026",
    time: "8:00 PM",
    description: "A casual dining celebration with family and friends",
    theme: "blue"
  }
] as const;

// Manual floating lanterns configuration for controlled positioning
const lanterns = [
  // Very Top (Compensating for parallax drop with negative top)
  { id: 16, left: "10%", top: "-10%", scale: 0.65, rotation: 3, duration: 16, twinkleDuration: 3.5, delay: 0, moveRange: 15 },
  { id: 17, left: "85%", top: "-5%", scale: 0.7, rotation: -4, duration: 13, twinkleDuration: 2.5, delay: 1, moveRange: -20 },

  // Left Side
  { id: 1, left: "5%", top: "5%", scale: 0.7, rotation: -5, duration: 12, twinkleDuration: 3, delay: 0, moveRange: 20 },
  { id: 2, left: "15%", top: "25%", scale: 0.6, rotation: 8, duration: 15, twinkleDuration: 4, delay: 1, moveRange: -20 },
  { id: 3, left: "3%", top: "45%", scale: 0.8, rotation: -2, duration: 14, twinkleDuration: 2.5, delay: 2, moveRange: 20 },
  { id: 4, left: "3%", top: "65%", scale: 0.7, rotation: 6, duration: 13, twinkleDuration: 3.5, delay: 0.5, moveRange: -15 },
  { id: 5, left: "12%", top: "85%", scale: 0.6, rotation: -4, duration: 16, twinkleDuration: 2.8, delay: 1.5, moveRange: 10 },

  // Right Side
  { id: 6, left: "85%", top: "10%", scale: 0.7, rotation: 5, duration: 12, twinkleDuration: 3.2, delay: 1, moveRange: -20 },
  { id: 7, left: "92%", top: "30%", scale: 0.6, rotation: -6, duration: 14, twinkleDuration: 4.1, delay: 2, moveRange: 15 },
  { id: 8, left: "80%", top: "55%", scale: 0.8, rotation: 3, duration: 15, twinkleDuration: 2.9, delay: 0, moveRange: -20 },
  { id: 9, left: "95%", top: "75%", scale: 0.7, rotation: -5, duration: 13, twinkleDuration: 3.7, delay: 1.5, moveRange: 20 },
  { id: 10, left: "82%", top: "90%", scale: 0.6, rotation: 4, duration: 16, twinkleDuration: 3, delay: 0.5, moveRange: -10 },

  // Overlapping / Inner
  { id: 11, left: "25%", top: "12%", scale: 0.5, rotation: -15, duration: 18, twinkleDuration: 2.2, delay: 2.5, moveRange: 15 }, // Near Haldi
  { id: 12, left: "65%", top: "42%", scale: 0.5, rotation: 12, duration: 17, twinkleDuration: 3.8, delay: 1, moveRange: -15 },   // Near Sangeet
  { id: 13, left: "50%", top: "80%", scale: 0.5, rotation: -10, duration: 19, twinkleDuration: 2.6, delay: 3, moveRange: 10 },    // Near Varmala 

  // Filler / Diagonals
  { id: 14, left: "20%", top: "70%", scale: 0.55, rotation: 15, duration: 15, twinkleDuration: 3.1, delay: 4, moveRange: 20 },
  { id: 15, left: "75%", top: "20%", scale: 0.55, rotation: -12, duration: 14, twinkleDuration: 2.7, delay: 3, moveRange: -15 },
];

const EventsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax layers (Increased parallax speed to be noticeable)
  const yFast = useTransform(scrollYProgress, [0, 1], [0, 500]);
  const yMedium = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const ySlow = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <section ref={containerRef} className="relative z-10 w-full min-h-screen pb-20 bg-white/10 backdrop-blur-md border-t border-white/10 overflow-hidden">

      {/* Lanterns Layer */}
      <div className="absolute inset-0 z-40 pointer-events-none">
        {lanterns.map((lantern, i) => {
          // Assign speed based on index
          const y = i % 3 === 0 ? yFast : i % 3 === 1 ? yMedium : ySlow;

          return (
            <motion.img
              key={lantern.id}
              src={lanternImg}
              alt="Floating Lantern"
              style={{
                y,
                left: lantern.left,
                top: lantern.top,
                rotate: lantern.rotation
              }}
              animate={{
                x: [0, lantern.moveRange, 0],
                opacity: [0.7, 1, 0.7], // Twinkling effect
                scale: [lantern.scale, lantern.scale * 1.1, lantern.scale], // Pulsing effect
              }}
              transition={{
                x: { duration: lantern.duration, repeat: Infinity, ease: "easeInOut", delay: lantern.delay },
                opacity: { duration: lantern.twinkleDuration, repeat: Infinity, ease: "easeInOut" },
                scale: { duration: lantern.twinkleDuration, repeat: Infinity, ease: "easeInOut" }
              }}
              className="absolute w-28 h-auto mix-blend-screen drop-shadow-[0_0_15px_rgba(255,220,100,0.6)]"
            />
          );
        })}
      </div>

      <div className="relative z-30 flex flex-col">
        {events.map((event, index) => (
          <div
            key={event.name}
            className="min-h-screen w-full flex items-center justify-center"
          >
            {/* Sticky container for stacking effect - user usually loves this for "pages" */}
            {/* Actually, user just said "own full page". Sticky stacking is riskier without explicit request. 
                 But standard block flow is safer. 
                 Let's do standard block first.
              */}
            <EventCard
              title={event.name}
              date={event.date}
              time={event.time}
              description={event.description}
              delay={0.2} // fixed delay since they appear one by one
              theme={event.theme}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default EventsSection;
