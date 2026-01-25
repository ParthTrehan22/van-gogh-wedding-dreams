import { motion } from "framer-motion";
import StarryBackground from "@/components/StarryBackground";
import PalaceSection from "@/components/PalaceSection";
import WeddingDetails from "@/components/WeddingDetails";
import EventsSection from "@/components/EventsSection";
import RSVPSection from "@/components/RSVPSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-transparent overflow-x-hidden selection:bg-gold/30 selection:text-gold-light">
      {/* GLOBAL STAR BACKGROUND - Fixed */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-background">
        <StarryBackground />
      </div>

      <div className="relative z-10 w-full">
        {/* HERO SECTION */}
        {/* We use min-h-[70vh] so the text is centered in the upper portion, 
            leaving room for the Palace to peek up from the bottom of the fold. */}
        <section className="relative min-h-[75vh] flex flex-col items-center justify-center px-6 pt-20 pb-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <motion.p
              initial={{ opacity: 0, letterSpacing: "0.2em" }}
              animate={{ opacity: 1, letterSpacing: "0.4em" }}
              transition={{ delay: 0.5, duration: 1 }}
              className="font-elegant text-gold-light/90 text-xs sm:text-sm uppercase mb-4 sm:mb-6"
            >
              You are cordially invited to
            </motion.p>

            <motion.h1
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
              className="font-display text-5xl sm:text-6xl md:text-8xl text-gradient-gold text-shadow-glow mb-6 leading-tight"
            >
              A Royal<br />Wedding
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="h-[2px] w-24 sm:w-32 mx-auto bg-gradient-to-r from-transparent via-gold to-transparent mb-6"
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="font-elegant text-foreground text-xl sm:text-2xl italic tracking-wide"
            >
              Srishti & Parth
            </motion.p>
          </motion.div>
        </section>

        {/* PALACE SECTION */}
        {/* "Comes from bottom" effect: Initial transform y and opacity */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1.2, ease: "easeOut" }}
          className="relative w-full -mt-10 sm:-mt-20 pointer-events-none"
        >
          <PalaceSection />
        </motion.div>

        {/* REST OF CONTENT - Background gradient to blend */}
        <div className="relative bg-gradient-to-b from-background/80 to-background backdrop-blur-sm -mt-1 pt-10">
          <section className="pb-20">
            <WeddingDetails delay={0} />
          </section>

          <section className="pb-20">
            <EventsSection />
          </section>

          <section className="pb-20">
            <RSVPSection />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Index;
