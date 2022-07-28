import { motion } from "framer-motion";

import Image from "./Image";

// Import images

const container = {
  show: {
    transition: {
      staggerChildren: 0.35,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 200 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      ease: [0.6, 0.01, -0.05, 0.95],
      duration: 1.6,
    },
  },
  exit: {
    opacity: 0,
    y: -200,
    transition: {
      ease: "easeInOut",
      duration: 0.8,
    },
  },
};

const itemMain = {
  hidden: { opacity: 0, y: 200 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      ease: [0.6, 0.01, -0.05, 0.95],
      duration: 1.6,
    },
  },
};

const makeRandomImage = (base) => {
  const randomImage = [];
  for (let i = 0; i <= 4; i++) {
    const random = base.slice(0, 4).concat(Math.floor(Math.random() * 13));
    randomImage.push(random);
  }
  return randomImage;
};

const Loader = ({ setLoading }) => {
  const path = window.location.pathname;
  const pathSliced = path.slice(10, path.length);
  const random = makeRandomImage(pathSliced);

  return (
    <motion.div className="loader">
      <motion.div
        variants={container}
        onAnimationComplete={() => setLoading(false)}
        initial="hidden"
        animate="show"
        exit="exit"
        className="loader-inner"
      >
        <ImageBlock variants={item} id={random[0]} cssClass="image-1" />
        <motion.div variants={itemMain} className="transition-image">
          <motion.img
            layoutId="main-image-1"
            src={`/images/imagecompressor/darkside_${pathSliced}-min.jpg`}
          />
        </motion.div>
        <ImageBlock variants={item} id={random[1]} cssClass="image-3" />
        <ImageBlock variants={item} id={random[2]} cssClass="image-4" />
        <ImageBlock variants={item} id={random[3]} cssClass="image-5" />
      </motion.div>
    </motion.div>
  );
};

export const ImageBlock = ({ posX, posY, variants, id, cssClass }) => {
  return (
    <motion.div
      variants={variants}
      className={`image-block ${cssClass}`}
      style={{
        top: `${posY}vh`,
        left: `${posX}vw `,
      }}
    >
      <Image
        src={`/images/imagecompressor/darkside_${id}-min.jpg`}
        fallback={`/images/imagecompressor/darkside_${id}-min.jpg`}
        alt={id}
      />
    </motion.div>
  );
};

export default Loader;
