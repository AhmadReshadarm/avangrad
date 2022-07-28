import styled, { keyframes } from "styled-components";
import { Suspense, useEffect, useState } from "react";
import { motion, useMotionValue, LayoutGroup } from "framer-motion";
import useMeasure from "react-use-measure";
import { Link } from "react-router-dom";
// "axios": "^0.25.0",
// components
import { Shapes } from "./Shapes";

const containerVariant = {
  init: {
    opacity: 0,
  },
  mid: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
  end: {
    opacity: 0,
    transition: { ease: "easeInOut", delay: 0.5 },
  },
};

let easing = [0.6, -0.05, 0.01, 0.99];

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const ModelAnimated = () => {
  const [ref, bounds] = useMeasure({ scroll: false });
  const [isHover, setIsHover] = useState(false);
  const [isPress, setIsPress] = useState(false);
  const [isLoad, setLoad] = useState(true);
  const mouseX = useMotionValue(200);
  const mouseY = useMotionValue(0);

  const resetMousePosition = () => {
    mouseX.set(200);
    mouseY.set(0);
  };

  return (
    <ModelWrapper
      ref={ref}
      initial="hiden"
      animate={isLoad ? "load" : isHover ? "hover" : "rest"}
      exit="end"
      whileTap="press"
      variants={{
        rest: { scale: 0.8 },
        hover: { scale: 1.1, y: 0, opacity: 1 },
        press: { scale: 0.9 },
        hiden: { y: 60, opacity: 0 },
        load: { y: 0, opacity: 1, transition: { delay: 1 } },
        end: { y: 60, opacity: 0 },
      }}
      onHoverStart={() => {
        resetMousePosition();
        setIsHover(true);
        setLoad(false);
      }}
      onHoverEnd={() => {
        resetMousePosition();
        setIsHover(false);
        setLoad(true);
      }}
      onTapStart={() => setIsPress(true)}
      onTap={() => setIsPress(false)}
      onTapCancel={() => setIsPress(false)}
      onPointerMove={(e) => {
        mouseX.set(e.clientX - bounds.x - bounds.width / 2);
        mouseY.set(e.clientY - bounds.y - bounds.height / 2);
      }}
    >
      <Suspense fallback={null}>
        <Shapes
          isHover={isHover}
          isPress={isPress}
          mouseX={mouseX}
          mouseY={mouseY}
        />
      </Suspense>
    </ModelWrapper>
  );
};

const dataMaker = (count, type) => {
  const data = [];
  let delay = 0;

  for (let i = 0; i < count; i++) {
    switch (delay) {
      case 0:
        delay = 0.1;
        break;
      case 0.1:
        delay = 0.2;
        break;
      case 0.2:
        delay = 0.3;
        break;
      case 0.3:
        delay = 0.4;
        break;
      default:
        delay = 0.1;
        break;
    }

    data.push({
      id: `${type}${i}`,
      image: `/images/imagecompressor/darkside_${type}${i}-min.jpg`,
      delay: delay,
    });
  }
  return data;
};

const Home = () => {
  const [data, setData] = useState(null);
  const [puffType, setPuffType] = useState("1500");
  const [isOpen, setOpen] = useState(false);
  const menuItem = ["3500", "1500", "1200"];

  useEffect(() => {
    // axios
    //   .get("https://fakestoreapi.com/products")
    //   .then((res) => res.data)
    //   .then((json) => setData(json));

    if (puffType === "1200") {
      setData(null);
      setTimeout(() => setData(dataMaker(22, puffType)), 200);
    }
    if (puffType === "1500") {
      setData(null);
      setTimeout(() => setData(dataMaker(14, puffType)), 200);
    }
    if (puffType === "3500") {
      setData(null);
      setTimeout(() => setData(dataMaker(26, puffType)), 200);
    }
  }, [puffType]);

  return (
    <Container
      variants={containerVariant}
      initial="init"
      animate="mid"
      exit="end"
    >
      <Wrapper>
        {/* <Header /> */}
        <LandingWrapper>
          <LandingMsg
            initial="hiden"
            animate="visible"
            exit="end"
            variants={{
              hiden: { y: 60, opacity: 0 },
              visible: { y: 0, opacity: 1, transition: { delay: 1.3 } },
              end: { y: 60, opacity: 0 },
            }}
          >
            Одноразовые электронные испарители Avangard
          </LandingMsg>
          {/* <ModelAnimated /> */}
        </LandingWrapper>
        <ProductNavWrapper>
          {/* <PuffTypeBtn
            whileTap={{ scale: 0.95, boxShadow: "0 0 2px 1px #e4685d" }}
            whileHover={{ scale: 1.05, boxShadow: "0 0 3px 2px #e4685d" }}
            onClick={() => {
              isOpen ? setOpen(false) : setOpen(true);
            }}
          >
            <span>{`${puffType} Затяжек`}</span>
            <motion.img
              animate={isOpen ? "hover" : "rest"}
              variants={{
                rest: { rotate: "180deg" },
                hover: { rotate: 0 },
              }}
              src="./arrow.svg"
              alt="Button arrow"
            />
          </PuffTypeBtn> */}
          <FilterWrapper
            animate={isOpen ? "visable" : "hiden"}
            variants={{
              hiden: { height: 0, opacity: 0, delay: 0.2 },
              visable: { height: "170px", opacity: 1 },
            }}
          >
            {menuItem.map((item, i) => (
              <FilterItem
                key={i}
                animate={isOpen ? "show" : "hide"}
                variants={{
                  show: { opcity: 1, display: "list-item", delay: 0.2 },
                  hide: { opacity: 0, display: "none" },
                }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 1 }}
                onClick={() => {
                  setPuffType(item);
                  setOpen(false);
                }}
              >{`${item} Затяжек`}</FilterItem>
            ))}
          </FilterWrapper>
        </ProductNavWrapper>
        {data === null ? (
          <LoaderContainer>
            <Loader>
              <SquareOne />
              <SquareTwo />
            </Loader>
          </LoaderContainer>
        ) : (
          <LayoutGroup>
            <ProductWrapper variants={stagger} animate="animate" layout>
              {data.map((item, i) => {
                return (
                  <Item
                    layout
                    key={i}
                    to={`/products/${item.id}`}
                    initial="hidden"
                    whileInView="visible"
                    exit="end"
                    viewport={{ once: true }}
                    variants={{
                      hidden: {
                        y: 60,
                        opacity: 0,
                        transition: { duration: 0.6, ease: easing },
                      },
                      visible: {
                        y: 0,
                        opacity: 1,
                        transition: {
                          duration: 0.6,
                          ease: easing,
                          delay: item.delay,
                        },
                      },
                      end: {
                        opacity: 0,
                        y: 60,
                        transition: {
                          duration: 0.6,
                          ease: easing,
                          delay: item.delay,
                        },
                      },
                    }}
                    whileHover={{ scale: 1.05, zIndex: 10 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ProductCard layout>
                      <ProductImage src={item.image} layout />
                    </ProductCard>
                  </Item>
                );
              })}
            </ProductWrapper>
          </LayoutGroup>
        )}
      </Wrapper>
    </Container>
  );
};

const Container = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  place-items: center;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  place-items: center;
`;

const LandingWrapper = styled.div`
  transition: 300ms;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  place-items: center;
  padding: 25px 0;
  @media (max-width: 768px) {
    flex-direction: column-reverse;
    justify-content: center;
    place-item: flex-start;
  }
`;

const ModelWrapper = styled(motion.div)`
  width: 100%;
  height: 500px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  place-items: center;
  color: #fff;
  cursor: pointer;
  user-select: none;
  @media (max-width: 768px) {
    height: 400px;
  }
`;

const LandingMsg = styled(motion.h1)`
  color: #e4685d;
  font-size: 5rem;
  width: 100%;
  text-align: left;
  user-select: none;
  @media (max-width: 768px) {
    text-align: center;
    font-size: 3rem;
  }
`;

const LoaderContainer = styled.div`
  height: 100vh;
  width: 100%
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Loader = styled.div`
  height: 7rem;
  width: 7rem;
  position: relative;
`;

const animate_one = keyframes`
  0%,
  100% {
    top: 0;
    left: 0;
    width: 50%;
    height: 50%;
  }
  12.5% {
    left: 0;
    width: 100%;
  }
  25% {
    top: 0;
    left: 50%;
    width: 50%;
    height: 50%;
  }
  37.5% {
    top: 0;
    height: 100%;
  }
  50% {
    top: 50%;
    left: 50%;
    width: 50%;
    height: 50%;
  }
  62.5% {
    left: 0;
    width: 100%;
  }
  75% {
    top: 50%;
    width: 50%;
    height: 50%;
  }
  87.5% {
    top: 0;
    left: 0;
    height: 100%;
  }
`;

const animate_two = keyframes`
  0%,
  100% {
    top: 50%;
    left: 50%;
    width: 50%;
    height: 50%;
  }
  12.5% {
    left: 0;
    width: 100%;
  }
  25% {
    top: 50%;
    width: 50%;
    height: 50%;
  }
  37.5% {
    top: 0;
    height: 100%;
  }
  50% {
    left: 0;
    width: 50%;
    height: 50%;
  }
  62.5% {
    top: 0;
    left: 0;
    width: 100%;
  }
  75% {
    left: 50%;
    width: 50%;
    height: 50%;
  }
  87.5% {
    top: 0;
    height: 100%;
  }
`;

const SquareOne = styled.div`
  height: 50%;
  width: 50%;
  position: absolute;
  background: #e4685d;
  top: 0;
  left: 0;
  animation: ${animate_one} 5s infinite ease;
`;

const SquareTwo = styled.div`
  height: 50%;
  width: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  animation: ${animate_two} 5s infinite ease;
  background: #fff;
`;

const ProductWrapper = styled(motion.div)`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 25px;
  padding: 25px 0;
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ProductNavWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  place-item: center;
  padding: 50px 0;
  position: relative;
`;

const PuffTypeBtn = styled(motion.div)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  place-items: center;
  gap: 10px;
  padding: 10px;
  border: 1px solid #e4685d;
  border-radius: 10px;
  user-select: none;
  cursor: pointer;
  span {
    color: #e4685d;
    font-size: 1.2rem;
    padding-bottom: 5px;
  }
  img {
    width: 15px;
}
  }
`;

const FilterWrapper = styled(motion.ul)`
  width: 175px;
  height: 170px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  place-item: center;
  text-align: center;
  gap: 10px;
  background: #fff;
  border-radius: 10px;
  list-style-type: none;
  position: absolute;
  top: 115px;
  left: 0;
  z-index: 99;
`;

const FilterItem = styled(motion.li)`
  width: 100%;
  padding: 10px 0;
  color: #e4685d;
  font-size: 1.1rem;
  cursor: pointer;
  user-select: none;
`;

const Item = styled(motion(Link))`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  place-items: center;
`;

const ProductCard = styled(motion.div)`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  place-items: flex-start;
`;

const ProductImage = styled(motion.img)`
  width: 100%;
  height: 270px;
  object-fit: cover;
`;

export default Home;
