import { Variants, Easing } from "framer-motion";

export const EASE_OUT: Easing = [0.4, 0, 0.2, 1];

export const staggerContainerWithDelay = (delay: number = 0, stagger: number = 0.2): Variants => ({
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: stagger,
            delayChildren: delay,
        },
    },
});

export const staggerContainer: Variants = staggerContainerWithDelay(0, 0.15);

export const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: EASE_OUT },
    },
};
