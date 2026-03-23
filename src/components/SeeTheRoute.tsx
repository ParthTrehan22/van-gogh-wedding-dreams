import { motion } from "framer-motion";

const SeeTheRoute = () => {
    const mapUrl = "https://www.google.com/maps/search/?api=1&query=Savitri+Resorts+Pushkar";

    return (
        <section className="relative z-10 -mt-px w-full h-[215vh]">
            {/* Background — pull up 1px to avoid hairline; matches venue green */}
            <div className="absolute inset-0 bg-[#40826D]">
                {/* Subtle patterned overlay */}
                <div className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: 'radial-gradient(circle at 50% 50%, #fff 2px, transparent 2.5px)',
                        backgroundSize: '32px 32px'
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent pointer-events-none" />
            </div>

            {/* Sticky Content Container - Stays fixed while background scrolls */}
            <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-md mx-auto text-center font-display text-[#F3E5AB] p-6 relative z-10"
                >
                    {/* Venue Name */}
                    <h3 className="text-xl sm:text-2xl mb-12 tracking-widest uppercase font-elegant text-white/90">
                        Venue: Savitri Resorts, Pushkar
                    </h3>

                    {/* Main Title */}
                    <h2 className="text-5xl sm:text-7xl mb-4 tracking-wider leading-tight text-shadow-glow">
                        SEE THE<br />ROUTE
                    </h2>

                    <div className="w-24 h-[1px] bg-[#F3E5AB]/50 mx-auto my-8" />

                    <p className="font-elegant text-lg sm:text-xl italic mb-12 text-white/80">
                        Click to open the map
                    </p>

                    {/* Circular Button */}
                    <a
                        href={mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative inline-flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-[#F3E5AB] bg-[#F3E5AB]/10 backdrop-blur-sm hover:bg-[#F3E5AB]/20 transition-all duration-500 mx-auto"
                    >
                        {/* Inner Circle / Icon */}
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-[#F3E5AB]/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                            <div className="w-3 h-3 bg-[#F3E5AB] rounded-full" />
                        </div>

                        {/* Pulse Effect */}
                        <div className="absolute inset-0 rounded-full border border-[#F3E5AB]/30 animate-ping opacity-50 block" />
                    </a>

                </motion.div>
            </div>
        </section>
    );
};

export default SeeTheRoute;
