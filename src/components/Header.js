import { motion, useCycle } from "framer-motion";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";

// component
import { Navigation } from "./Navigation";

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(25px at 400px 50px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

const Path = (props) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="hsl(0, 0%, 18%)"
    strokeLinecap="round"
    {...props}
  />
);

const HeaderStyle = styled(motion.header)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  place-items: center;
`;

const LogoContainer = styled.div`
  height: 100px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  place-item: center;
  cursor: pointer;
  a {
    display: flex;
    flex-diraction: row;
    justify-content: center;
    place-item: center;
  }
`;

const Logo = styled.span`
  font-family: Nunito;
  font-size: 3rem;
  color: #fff;
  display: flex;
  flex-direction: row;
  justify-content: center;
  place-items: center;
`;

const MenuButton = styled.button`
  outline: none;
  border: none;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: absolute;
  top: 26px;
  right: 75px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: transparent;
  @media (max-width: 450px) {
    top: 26px;
    right: 30px;
  }
`;

const MenuNav = styled(motion.nav)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 500px;
`;

const MenuBg = styled(motion.div)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 500px;
  background: #fff;
  @media (max-width: 450px) {
    right: 5px;
    width: 450px;
  }
`;

const Header = () => {
  const dimensions = useRef({ width: 0, height: 0 });
  const containerRef = useRef(null);
  const [height, setHeight] = useState(null);
  const [z_index, setZindex] = useCycle(0, 9);
  const [logo_z, setLogo_z] = useCycle(9, 0);
  const [isOpen, toggleOpen] = useCycle(false, true);

  useEffect(() => {
    dimensions.current.width = containerRef.current.offsetWidth;
    dimensions.current.height = containerRef.current.offsetHeight;
    const { height } = dimensions.current;
    setHeight(height);
  }, []);

  return (
    <>
      <HeaderStyle
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <LogoContainer style={{ zIndex: logo_z }}>
          <Link to="/">
            <Logo>Avangard</Logo>
          </Link>
        </LogoContainer>
        <MenuNav
          initial={false}
          animate={isOpen ? "open" : "closed"}
          custom={height}
          ref={containerRef}
          style={{ zIndex: z_index }}
        >
          <MenuBg variants={sidebar} />
          <Navigation
            toggle={toggleOpen}
            isOpen={isOpen}
            setZindex={setZindex}
            setLogo_z={setLogo_z}
          />
          <MenuButton
            onClick={() => {
              isOpen
                ? setTimeout(() => {
                    setZindex();
                    setLogo_z();
                  }, 800)
                : setZindex() && setLogo_z();

              return toggleOpen();
            }}
          >
            <svg width="23" height="23" viewBox="0 0 23 23">
              <Path
                variants={{
                  closed: { d: "M 2 2.5 L 20 2.5" },
                  open: { d: "M 3 16.5 L 17 2.5" },
                }}
              />
              <Path
                d="M 2 9.423 L 20 9.423"
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 },
                }}
                transition={{ duration: 0.1 }}
              />
              <Path
                variants={{
                  closed: { d: "M 2 16.346 L 20 16.346" },
                  open: { d: "M 3 2.5 L 17 16.346" },
                }}
              />
            </svg>
          </MenuButton>
        </MenuNav>
      </HeaderStyle>
    </>
  );
};

export default Header;
