import { motion } from "framer-motion";

export default function ContactButton() {
  return (
    <motion.button
      onClick={() => window.open('https://api.whatsapp.com/send?phone=2250565508686', '_blank')}
      className="absolute left-2 top-2 px-2 py-1 bg-custom-gradient text-white font-medium rounded-md text-xs sm:text-sm md:text-base"
      animate={{
        opacity: [1, 0.9, 1],
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      Publicité disponible
    </motion.button>
  );
}