import { motion } from "framer-motion";
import { useState, useEffect } from "react";
function PageSwitchAni() {
  const [style, setStyle] = useState({ display: "flex" });

  const blackBox = {
    initial: {
      height: "100vh",
      bottom: 0,
    },
    animate: {
      height: 0,
      transition: {
        duration: 0.5,
        ease: [0.87, 0, 0.13, 1],
      },
    },
  };

  useEffect(() => {
    setTimeout(() => {
      setStyle({ display: "none" });
    }, 500);
  }, []);

  return (
    <div className="absolute inset-0 items-end" style={style}>
      <motion.div
        className="relative z-50 w-full bg-black"
        initial="initial"
        animate="animate"
        variants={blackBox}
      />
    </div>
  );
}

export default PageSwitchAni;
