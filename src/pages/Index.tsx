import { motion, useScroll } from "framer-motion";
import { useRef } from "react";
import StarryBackground from "@/components/StarryBackground";
import PalaceSection from "@/components/PalaceSection";
import EventsSection from "@/components/EventsSection";
import SeeTheRoute from "@/components/SeeTheRoute";
import CoupleSection from "@/components/CoupleSection";
import { LanternLayer } from "@/components/LanternLayer";

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  return (
    <div ref={containerRef} className="min-h-screen bg-transparent selection:bg-gold/30 selection:text-gold-light relative overflow-hidden">
      {/* GLOBAL STAR BACKGROUND - Fixed */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-background">
        <StarryBackground />
      </div>

      <div className="relative z-10 w-full isolate">
        {/* LANTERNS — behind all page content (same pattern as EventAtmosphere z-0) */}
        <LanternLayer scrollYProgress={scrollYProgress} />

        {/* HERO SECTION */}
        {/* We use min-h-[70vh] so the text is centered in the upper portion, 
            leaving room for the Palace to peek up from the bottom of the fold. */}
        <section className="relative z-20 min-h-[50vh] flex flex-col items-center justify-center">
          <div className="text-center relative z-10">
            <motion.div
              initial={{ y: "75svh", opacity: 1 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 3, ease: "easeOut" }}
              className="flex flex-col items-center justify-center text-center"
            >
              <h1 className="font-display text-5xl text-[#FFFDD0] tracking-widest leading-none drop-shadow-lg [text-shadow:0_2px_18px_rgba(0,24,48,0.55),0_0_28px_rgba(255,253,220,0.35)]">
                SRISHTI
              </h1>

              <p className="font-elegant text-2xl text-[#FFFDD0]/90 tracking-[0.3em] my-6 sm:my-8 uppercase [text-shadow:0_2px_14px_rgba(0,24,48,0.5)]">
                WEDS
              </p>

              <h1 className="font-display text-5xl text-[#FFFDD0] tracking-widest leading-none drop-shadow-lg [text-shadow:0_2px_18px_rgba(0,24,48,0.55),0_0_28px_rgba(255,253,220,0.35)]">
                PARTH
              </h1>
            </motion.div>

            {/* Scroll Indicator */}
            {/* <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, y: [0, 10, 0] }}
              transition={{
                opacity: { delay: 2, duration: 1 },
                y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
              className="flex flex-col items-center gap-2"
            >
              <span className="font-elegant text-gold-light/80 text-xs tracking-[0.2em] uppercase">Scroll</span>
              <div className="w-[1px] h-12 bg-gradient-to-b from-gold-light/80 to-transparent" />
            </motion.div> */}
          </div>
        </section>

        {/* PALACE SECTION */}
        <motion.div
          initial={{ y: "75svh", opacity: 1 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 3, ease: "easeOut" }}
          className="relative z-10 w-full pointer-events-none"
        >
          <PalaceSection />
        </motion.div>

        {/* REST OF CONTENT - Background gradient to blend */}
        <div className="relative z-10 -mt-[52vh] sm:-mt-[58vh]">
          <EventsSection />
          <SeeTheRoute />
          {/* Couple Section - Overlaps the sticky map section */}
          <div className="relative z-20 -mt-[100vh]">
            <CoupleSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
