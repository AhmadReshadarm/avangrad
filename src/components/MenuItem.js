import { motion } from "framer-motion";
import styled from "styled-components";
import { Link } from "react-router-dom";

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

export const MenuItem = ({
  link,
  content,
  toggle,
  isOpen,
  setLogo_z,
  setZindex,
}) => {
  return (
    <MenuItems
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => {
        isOpen
          ? setTimeout(() => {
              setZindex();
              setLogo_z();
            }, 800)
          : setZindex() && setLogo_z();

        return toggle();
      }}
    >
      <Link to={`${link}`}>
        <MenuContent>{content}</MenuContent>
      </Link>
    </MenuItems>
  );
};

const MenuItems = styled(motion.li)`
  list-style: none;
  margin-bottom: 20px;
  display: flex;
  flex-diraction: row;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  a {
    display: flex;
    flex-diraction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const MenuContent = styled.span`
  font-size: 4.5rem;
  color: #e4685c;
  }
`;
