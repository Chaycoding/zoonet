import { motion } from "framer-motion";
import { useAnimate } from "framer-motion";
import { useEffect } from "react";
function EntranceAni() {
  const [scope, animate] = useAnimate();

  async function myAnimation() {
    await animate(
      scope.current,
      { scale: 40 },
      { duration: 1, ease: "easeInOut" }
    );
    animate(
      scope.current,
      {
        y: 100,
        opacity: 0,
      },
      {
        delay: 1,
        ease: "easeInOut",
        duration: 1,
      }
    );
  }
  useEffect(() => {
    myAnimation();
  }, []);

  const blackBox = {
    initial: {
      height: "100vh",
      bottom: 0,
    },
    animate: {
      height: 0,
      transition: {
        when: "afterChildren",
        duration: 1.5,
        ease: [0.87, 0, 0.13, 1],
      },
    },
  };

  const textContainer = {
    initial: {
      opacity: 1,
    },
    animate: {
      opacity: 0,
      transition: {
        duration: 0.25,
        when: "afterChildren",
      },
    },
  };
  const text = {
    initial: {
      y: 40,
    },
    animate: {
      y: 100,
      transition: {
        duration: 1.5,
        ease: [0.87, 0, 0.13, 1],
      },
    },
  };

  return (
    <div className="absolute inset-0 flex items-end ">
      <motion.div
        className="absolute z-50 flex flex-col gap-y-16 items-center justify-center w-full bg-openanimation bg-cover bg-center"
        initial="initial"
        animate="animate"
        variants={blackBox}
        onAnimationStart={() => document.body.classList.add("overflow-hidden")}
        onAnimationComplete={() =>
          document.body.classList.remove("overflow-hidden")
        }
      >
        <motion.div className="w-full h-full  flex pictureBox flex-col gap-y-16 items-center justify-center">
          <motion.div
            ref={scope}
            className="h-1 w-1 bg-zoonet mt-40  rounded-full bg-cover "
          ></motion.div>
          <motion.svg
            variants={textContainer}
            className="justify-center items-center z-50 flex"
          >
            <pattern
              id="pattern"
              patternUnits="userSpaceOnUse"
              width={750}
              height={800}
              className="text-white"
            >
              <rect className="w-full h-full fill-current" />
              <motion.rect
                variants={text}
                className="w-full h-full text-gray-600 fill-current"
              />
            </pattern>
            <text
              className="text-5xl font-bold text-center "
              textAnchor="middle"
              x="50%"
              y="50%"
              style={{ fill: "url(#pattern)" }}
            >
              ZooNet
            </text>
          </motion.svg>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default EntranceAni;
