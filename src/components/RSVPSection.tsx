import { motion } from "framer-motion";
import { staggerContainer, fadeUpVariants } from "@/lib/animations";

const RSVPSection = () => {
  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="px-6 py-16 text-center"
    >
      <motion.div variants={fadeUpVariants} className="ornate-divider mx-auto max-w-xs mb-10" />

      <motion.h3
        variants={fadeUpVariants}
        className="font-display text-2xl text-gradient-gold text-shadow-glow mb-4"
      >
        Join Our Celebration
      </motion.h3>

      <motion.p
        variants={fadeUpVariants}
        className="font-elegant text-foreground/70 text-lg mb-8 max-w-xs mx-auto"
      >
        Your presence would make our special day even more memorable
      </motion.p>

      <motion.div variants={fadeUpVariants}>
        <button
          className="inline-flex items-center justify-center h-12 px-8 rounded-md font-display tracking-widest text-base bg-gradient-to-r from-gold-dark via-gold to-gold-light text-background border border-gold-light/30 hover:shadow-[0_0_30px_hsl(43_90%_55%/0.5)] hover:scale-105 active:scale-100 transition-all duration-300"
        >
          RSVP Now
        </button>
      </motion.div>

      <motion.div variants={fadeUpVariants} className="mt-16">
        <p className="font-elegant text-gold/60 text-sm tracking-widest uppercase mb-4">
          With Love
        </p>
        <p className="font-display text-xl text-gradient-gold">
          Parth & Srishti
        </p>
      </motion.div>

      <motion.div variants={fadeUpVariants} className="ornate-divider mx-auto max-w-xs mt-10" />

      {/* Footer spacing */}
      <motion.p
        variants={fadeUpVariants}
        className="font-elegant text-muted-foreground/50 text-xs mt-16"
      >
        Made with love for our special day
      </motion.p>
    </motion.section>
  );
};

export default RSVPSection;
