import { useEffect, useState } from "react";
import { motion, AnimateSharedLayout } from "framer-motion";

// Components
import Banner from "./components/Banner";
import Loader from "./components/Loader";

const Product = () => {
  const [loading, setLoading] = useState(true);
  const path = window.location.pathname;
  const pathSliced = path.slice(10, path.length);
  useEffect(() => {
    loading
      ? document.querySelector("body").classList.add("loading")
      : document.querySelector("body").classList.remove("loading");
  }, [loading]);

  return (
    <AnimateSharedLayout type="crossfade">
      {loading ? (
        <motion.div key="loader">
          <Loader setLoading={setLoading} />
        </motion.div>
      ) : (
        <>
          <Banner path={pathSliced} />
          {!loading && (
            <div className="transition-image final">
              <motion.img
                transition={{ ease: [0.6, 0.01, -0.05, 0.9], duration: 1.6 }}
                exit={{ opacity: 0, y: 320 }}
                src={`/images/imagecompressor/darkside_${pathSliced}-min.jpg`}
                layoutId="main-image-1"
              />
            </div>
          )}
        </>
      )}
    </AnimateSharedLayout>
  );
};

export default Product;
