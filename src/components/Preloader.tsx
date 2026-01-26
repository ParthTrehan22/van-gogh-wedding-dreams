import { motion } from "framer-motion";

const Preloader = () => {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0f] text-gold-light">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                className="flex flex-col items-center"
            >
                <div className="font-elegant text-4xl md:text-6xl tracking-widest mb-4">
                    S & P
                </div>
                <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-gold to-transparent" />
                <p className="mt-4 font-elegant text-sm tracking-[0.2em] uppercase text-gold/70">
                    Loading Dreams...
                </p>
            </motion.div>
        </div>
    );
};

export default Preloader;
