import { motion } from "framer-motion";
import { MenuItem } from "./MenuItem";
import styled from "styled-components";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const itemContent = ["Главны", "Контакты", "О нас"];
const itemLinks = ["/", "/contacts", "/about"];
export const Navigation = ({ toggle, isOpen, setLogo_z, setZindex }) => (
  <NavItemWrapper variants={variants}>
    {itemContent.map((content, i) => (
      <MenuItem
        toggle={toggle}
        isOpen={isOpen}
        setLogo_z={setLogo_z}
        setZindex={setZindex}
        content={content}
        link={itemLinks[i]}
        key={i}
      />
    ))}
  </NavItemWrapper>
);

const NavItemWrapper = styled(motion.ul)`
  padding: 25px;
  position: absolute;
  top: 100px;
  left: 120px;
`;
