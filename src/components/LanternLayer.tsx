import { motion, MotionValue, useTransform } from "framer-motion";
import { lanterns } from "@/data/lanterns";
import { Lantern } from "./Lantern";

interface LanternLayerProps {
    scrollYProgress: MotionValue<number>;
}

export const LanternLayer = ({ scrollYProgress }: LanternLayerProps) => {
    // Parallax effect: Lanterns move down as we scroll down, but slower than content
    const yParallax = useTransform(scrollYProgress, [0, 1], [0, 1600]);

    return (
        <motion.div
            className="absolute inset-0 z-0 pointer-events-none h-[150vh]"
            initial={{ y: 700, opacity: 1 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 3, ease: "easeOut" }}
            style={{ y: yParallax }} // Apply parallax to the whole container
        >
            {lanterns.map((lantern) => (
                <Lantern key={lantern.id} config={lantern} />
            ))}
        </motion.div>
    );
};
