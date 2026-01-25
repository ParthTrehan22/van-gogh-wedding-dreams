import { motion } from "framer-motion";
import { staggerContainerWithDelay, fadeUpVariants } from "@/lib/animations";

interface WeddingDetailsProps {
  delay?: number;
}

const WeddingDetails = ({ delay = 0 }: WeddingDetailsProps) => {
  return (
    <motion.div
      variants={staggerContainerWithDelay(delay, 0.2)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="px-6 py-16 text-center"
    >
      {/* Ornate top border */}
      <motion.div variants={fadeUpVariants} className="ornate-divider mx-auto max-w-xs mb-12" />

      <motion.p
        variants={fadeUpVariants}
        className="text-gold-light/80 font-elegant text-lg tracking-[0.3em] uppercase mb-4"
      >
        Together with their families
      </motion.p>

      <motion.h2
        variants={fadeUpVariants}
        className="font-display text-4xl md:text-5xl text-gradient-gold text-shadow-glow mb-2"
      >
        Shreya
      </motion.h2>

      <motion.p
        variants={fadeUpVariants}
        className="font-elegant text-gold/60 text-2xl italic my-4"
      >
        &
      </motion.p>

      <motion.h2
        variants={fadeUpVariants}
        className="font-display text-4xl md:text-5xl text-gradient-gold text-shadow-glow mb-8"
      >
        Parth
      </motion.h2>

      <motion.div variants={fadeUpVariants} className="ornate-divider mx-auto max-w-xs mb-12" />

      <motion.p
        variants={fadeUpVariants}
        className="font-elegant text-foreground/80 text-xl mb-8"
      >
        Request the pleasure of your company<br />
        at the celebration of their marriage
      </motion.p>

      {/* Date */}
      <motion.div
        variants={fadeUpVariants}
        className="mb-10"
      >
        <p className="font-display text-gold-light text-sm tracking-[0.4em] uppercase mb-2">
          Save the Date
        </p>
        <p className="font-display text-3xl md:text-4xl text-gradient-gold text-shadow-glow">
          March 14, 2025
        </p>
        <p className="font-elegant text-foreground/70 text-lg mt-2">
          Friday • 11:00 AM Onwards
        </p>
      </motion.div>

      {/* Venue */}
      <motion.div
        variants={fadeUpVariants}
        className="bg-card/50 backdrop-blur-sm border border-gold/20 rounded-lg p-6 max-w-sm mx-auto"
      >
        <p className="font-display text-gold-light text-sm tracking-[0.3em] uppercase mb-3">
          Venue
        </p>
        <p className="font-elegant text-foreground text-xl mb-1">
          Savitri Resorts
        </p>
        <p className="font-elegant text-muted-foreground">
          Pushka, Rajasthan
        </p>
      </motion.div>

      <motion.div variants={fadeUpVariants} className="ornate-divider mx-auto max-w-xs mt-12" />
    </motion.div>
  );
};

export default WeddingDetails;
