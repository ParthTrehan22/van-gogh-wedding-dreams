import { motion } from "framer-motion";
import lanternImg from "@/assets/Lantern.png";
import { LanternConfig } from "@/data/lanterns";

interface LanternProps {
    config: LanternConfig;
}

export const Lantern = ({ config }: LanternProps) => {
    const flowX = config.moveRange;
    return (
        <motion.img
            src={lanternImg}
            alt="Lantern"
            className={`absolute ${config.size} h-auto mix-blend-screen drop-shadow-[0_0_15px_rgba(255,220,100,0.6)] will-change-transform`}
            style={{
                left: config.left,
                top: config.top,
                rotate: config.rotation
            }}
            animate={{
                x: [0, flowX * 0.85, -flowX * 0.45, flowX * 0.35, 0],
                y: [0, -22, 10, -14, 6, 0],
                rotate: [
                    config.rotation,
                    config.rotation + 4,
                    config.rotation - 3,
                    config.rotation + 2,
                    config.rotation
                ],
                opacity: [0.5, 0.72, 0.55, 0.68, 0.5],
                scale: [config.scale, config.scale * 1.08, config.scale * 0.98, config.scale * 1.06, config.scale],
            }}
            transition={{
                duration: config.duration * 1.15,
                repeat: Infinity,
                ease: "easeInOut",
                delay: config.delay,
                repeatType: "loop",
            }}
        />
    );
};
