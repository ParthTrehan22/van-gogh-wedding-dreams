
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import frameImg from "@/assets/PictureFrame.png";
import pinkTexture from "@/assets/PinkTexture2.jpeg";

// Importing images manually - avoiding glob for better control/compatibility
import img1 from "@/assets/Couple Pics/WhatsApp Image 2026-01-05 at 8.44.23 PM.jpeg";
import img2 from "@/assets/Couple Pics/WhatsApp Image 2026-01-05 at 8.44.23 PM (1).jpeg";
import img3 from "@/assets/Couple Pics/WhatsApp Image 2026-01-05 at 8.44.24 PM.jpeg";
import img4 from "@/assets/Couple Pics/WhatsApp Image 2026-01-05 at 8.44.24 PM (1).jpeg";
import img5 from "@/assets/Couple Pics/WhatsApp Image 2026-01-05 at 8.44.25 PM.jpeg";
import img6 from "@/assets/Couple Pics/WhatsApp Image 2026-01-05 at 8.44.25 PM (1).jpeg";
import img7 from "@/assets/Couple Pics/WhatsApp Image 2026-01-05 at 8.44.26 PM.jpeg";
import img8 from "@/assets/Couple Pics/WhatsApp Image 2026-01-05 at 8.44.26 PM (1).jpeg";
import img9 from "@/assets/Couple Pics/WhatsApp Image 2026-01-05 at 8.44.27 PM.jpeg";
import img10 from "@/assets/Couple Pics/WhatsApp Image 2026-01-05 at 8.44.27 PM (1).jpeg";
import img11 from "@/assets/Couple Pics/WhatsApp Image 2026-01-05 at 8.44.27 PM (2).jpeg";
import img12 from "@/assets/Couple Pics/WhatsApp Image 2026-01-05 at 8.45.09 PM.jpeg";
import img13 from "@/assets/Couple Pics/WhatsApp Image 2026-01-05 at 8.46.22 PM.jpeg";
import img14 from "@/assets/Couple Pics/WhatsApp Image 2026-01-05 at 8.46.22 PM (1).jpeg";

const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14];

const CoupleSection = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 4000); // Change every 4 seconds
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden px-6 py-20">

            {/* Background Texture */}
            <img
                src={pinkTexture}
                alt="Background Texture"
                className="absolute inset-0 w-full h-full object-cover z-0"
            />

            {/* Titles */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center z-10 mb-10"
            >
                <h3 className="text-xl sm:text-2xl font-elegant text-[#6D4C4C] italic mb-2">
                    Made for each other
                </h3>
                <h2 className="text-4xl sm:text-6xl font-display text-[#6D4C4C] text-shadow-sm uppercase tracking-wider">
                    Meet the Groom & Bride
                </h2>
            </motion.div>

            {/* Frame Container */}
            <div className="relative h-[60vh] max-h-[600px] aspect-[505/684] flex items-center justify-center">

                {/* The Frame Image - Z-20 mainly to cover the edges of the photo */}
                <img
                    src={frameImg}
                    alt="Frame"
                    className="absolute inset-0 w-full h-full object-fill z-20 pointer-events-none drop-shadow-2xl"
                />

                {/* The Couple Photo - Z-10 Behind the frame */}
                {/* We use specific insets to ensure the photo fills the "hole" but doesn't spill too far if the frame is irregular. */}
                {/* Assuming a standard frame rim of ~10-15%. We make the photo slightly larger (inset-10) to ensure no gaps, relying on the frame to cover edges. */}
                <div className="absolute inset-[13%] z-10 overflow-hidden bg-black/20">
                    <AnimatePresence>
                        <motion.img
                            key={index}
                            src={images[index]}
                            alt="Couple"
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.5 }}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </AnimatePresence>
                </div>

            </div>

            {/* Hashtag */}
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="mt-8 text-2xl sm:text-3xl font-elegant text-[#6D4C4C] z-10"
            >
                #SrishtiFoundHerPa(r)th
            </motion.p>

        </section>
    );
};

export default CoupleSection;
