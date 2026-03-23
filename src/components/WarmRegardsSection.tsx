import { motion } from "framer-motion";
import flowerCorner from "@/assets/FlowerCorner.png";
import { getSideContent } from "@/config/sideContent";

const { warmRegards: familyGroups } = getSideContent();

const WarmRegardsSection = () => {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a0a2e] via-[#16213e] to-[#0f3460]" />
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 50%, #F3E5AB 1px, transparent 1.5px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Decorative border */}
      <div className="absolute inset-4 sm:inset-10 md:inset-16 border-[2px] border-[#F3E5AB]/20 rounded-[2rem] pointer-events-none" />

      {/* Flower decorations */}
      <img
        src={flowerCorner}
        alt=""
        className="absolute top-0 right-0 w-28 sm:w-44 md:w-64 z-10 drop-shadow-2xl brightness-110 pointer-events-none opacity-80"
      />
      <img
        src={flowerCorner}
        alt=""
        className="absolute bottom-0 left-0 w-28 sm:w-44 md:w-64 z-10 drop-shadow-2xl brightness-110 rotate-180 pointer-events-none opacity-80"
      />

      {/* Content */}
      <div className="relative z-20 text-center px-8 py-20 sm:py-28 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-elegant text-[#F3E5AB]/70 text-sm sm:text-base tracking-[0.4em] uppercase mb-4">
            From Our Family
          </p>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl text-[#F3E5AB] tracking-widest mb-4 [text-shadow:0_2px_20px_rgba(243,229,171,0.3)]">
            WITH LOVE
          </h2>
          <div className="w-20 sm:w-32 h-[1px] bg-[#F3E5AB]/40 mx-auto my-8" />
        </motion.div>

        {familyGroups.map((group, gi) => (
          <motion.div
            key={group.label}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 + gi * 0.2 }}
            className="mb-10 last:mb-0"
          >
            <p className="font-elegant text-white/50 text-xs sm:text-sm tracking-[0.35em] uppercase mb-4">
              {group.label}
            </p>
            {group.names.map((name, ni) => (
              <p
                key={ni}
                className="font-elegant text-[#F3E5AB]/90 text-lg sm:text-xl md:text-2xl leading-relaxed"
              >
                {name}
              </p>
            ))}
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="w-20 sm:w-32 h-[1px] bg-[#F3E5AB]/40 mx-auto my-10" />
          <p className="font-elegant text-white/40 text-sm sm:text-base italic tracking-wider">
            Your presence is the greatest gift
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default WarmRegardsSection;
