"use client";

import { motion } from "framer-motion";

export default function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 opacity-30"
      animate={{ y: [0, -10, 0] }}
      transition={{
        duration: 2.5,
        ease: "easeInOut",
        repeat: Infinity,
      }}
    >
      <span className="text-[9px] uppercase tracking-[0.6em] text-white ">
        Descubrir más
      </span>
    </motion.div>
  );
}
