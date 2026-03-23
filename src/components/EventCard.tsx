import { motion } from "framer-motion";
import flowerCorner from "@/assets/FlowerCorner.png";
import haldiIcon from "@/assets/Haldi-icon.png";
import sangeetIcon from "@/assets/Sangeet-icon.png";
import varmalaIcon from "@/assets/varmala-icon.png";
import receptionIcon from "@/assets/reception-icon.png";
import EventAtmosphere, { type EventAtmosphereVariant } from "@/components/EventAtmosphere";

type EventTheme = 'yellow' | 'black' | 'pink' | 'blue';

interface EventCardProps {
    title: string;
    date: string;
    time: string;
    description: string;
    delay?: number;
    theme?: EventTheme;
    atmosphere: EventAtmosphereVariant;
}

const themeStyles: Record<EventTheme, { innerBg: string; titleColor: string; textColor: string; buttonColor: string }> = {
    yellow: {
        innerBg: "bg-gradient-to-br from-[#FFFACD] via-[#FFE4B5] to-[#FFD700]", // LemonChiffon -> Moccasin -> Gold
        titleColor: "text-[#8B7355]",
        textColor: "text-[#6B5A45]",
        buttonColor: "text-[#8B7355] border-[#8B7355]"
    },
    black: {
        innerBg: "bg-gradient-to-br from-gray-800 via-black to-gray-900", // Shiny Black Gradient
        titleColor: "text-gold-light",
        textColor: "text-gold-light/80",
        buttonColor: "text-gold-light border-gold-light"
    },
    pink: {
        innerBg: "bg-gradient-to-br from-[#FFF0F5] via-[#FCE6EB] to-[#FFB7B2]", // Soft Pastel Pink Gradient
        titleColor: "text-[#8B5E5E]",
        textColor: "text-[#6D4C4C]",
        buttonColor: "text-[#8B5E5E] border-[#8B5E5E]"
    },
    blue: {
        innerBg: "bg-gradient-to-br from-[#0F2027] via-[#203A43] to-[#2C5364]", // Midnight/Teal Deep Gradient
        titleColor: "text-gold-light",
        textColor: "text-gold-light/90",
        buttonColor: "text-gold-light border-gold-light"
    }
};

const getEventIcon = (title: string) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('haldi')) return haldiIcon;
    if (lowerTitle.includes('sangeet')) return sangeetIcon;
    if (lowerTitle.includes('varmala')) return varmalaIcon;
    if (lowerTitle.includes('reception') || lowerTitle.includes('gala') || lowerTitle.includes('dinner')) return receptionIcon;
    return null;
};

const EventCard = ({ title, date, time, description, delay = 0, theme = 'yellow', atmosphere }: EventCardProps) => {
    const styles = themeStyles[theme];
    const icon = getEventIcon(title);
    const isDarkCard = theme === "black" || theme === "blue";
    const contentLift = isDarkCard
        ? "[text-shadow:0_2px_20px_rgba(0,0,0,0.75)]"
        : "[text-shadow:0_2px_14px_rgba(255,253,245,0.9)]";
    const iconLift = isDarkCard
        ? "[filter:drop-shadow(0_6px_28px_rgba(0,0,0,0.85))]"
        : "[filter:drop-shadow(0_4px_24px_rgba(255,253,245,0.92))]";

    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, delay, ease: "easeOut" }}
            className="relative w-full min-h-screen flex flex-col"
        >
            {/* Main Colored Background - Full Screen */}
            <div className={`relative overflow-hidden ${styles.innerBg} w-full min-h-screen flex flex-col items-center justify-between py-24 sm:py-32 md:py-40 text-center transition-colors duration-500`}>

                <EventAtmosphere variant={atmosphere} />

                {/* Inner Decorative Frame */}
                <div className={`absolute inset-4 sm:inset-12 md:inset-16 border-[3px] ${styles.buttonColor.split(' ')[1]} opacity-40 pointer-events-none rounded-[2rem] z-[5]`} />

                {/* Event Icon Section - Takes available space */}
                {icon && (
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0, y: 20 }}
                        whileInView={{ scale: 1, opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="relative z-30 flex-1 flex items-center justify-center w-full"
                    >
                        <img
                            src={icon}
                            alt={`${title} icon`}
                            className={`w-72 sm:w-72 md:w-96 lg:w-[500px] h-auto object-contain drop-shadow-2xl ${iconLift}`}
                        />
                    </motion.div>
                )}

                {/* Text Content Section - Takes available space and spreads out */}
                <div className={`flex-1 flex flex-col items-center justify-center w-full px-6 relative z-30 gap-2 sm:gap-4 md:gap-8 ${contentLift}`}>

                    {/* Title */}
                    <h3 className={`font-display text-5xl sm:text-7xl md:text-9xl ${styles.titleColor} tracking-widest uppercase`}>
                        {title}
                    </h3>

                    {/* Description */}
                    <p className={`font-elegant text-xl sm:text-2xl md:text-4xl italic ${styles.textColor} max-w-5xl leading-relaxed`}>
                        {description}
                    </p>

                    {/* Divider */}
                    <div className={`w-24 sm:w-48 h-[2px] ${styles.titleColor.replace('text-', 'bg-')} opacity-60 my-2 md:my-4`} />

                    {/* Details */}
                    <div className={`font-elegant ${styles.textColor} flex flex-col gap-1 md:gap-3`}>
                        <p className="uppercase tracking-[0.25em] text-lg sm:text-xl md:text-2xl font-bold opacity-90">{date}</p>
                        <p className="text-2xl sm:text-4xl md:text-5xl italic font-medium">{time}</p>
                    </div>
                </div>

                {/* Flower Decorations - Nicer positioning */}
                <img
                    src={flowerCorner}
                    alt="Flower decoration"
                    className="absolute top-0 right-0 w-32 sm:w-56 md:w-80 lg:w-[450px] z-20 drop-shadow-2xl brightness-110 pointer-events-none opacity-90"
                />
                <img
                    src={flowerCorner}
                    alt="Flower decoration"
                    className="absolute bottom-0 left-0 w-32 sm:w-56 md:w-80 lg:w-[450px] z-20 drop-shadow-2xl brightness-110 rotate-180 pointer-events-none opacity-90"
                />
            </div>
        </motion.div>
    );
};

export default EventCard;
