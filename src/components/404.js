import { Link } from "react-router-dom";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const NoteFound = () => {
  return (
    <AnimatePresence>
      <Wrapper
        initial={{ opacity: 0, y: 120 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 1 } }}
        exit={{ opacity: 0, y: 120 }}
      >
        <Warrning>
          Похоже, что страница, которую вы ищете, не существует
        </Warrning>
        <NotFound src="./404.svg" />
        <BackTo to="/">Вернуться на главную страницу...</BackTo>
      </Wrapper>
    </AnimatePresence>
  );
};

const Wrapper = styled(motion.div)`
  width: 100%;
  max-width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  place-items: center;
  color: #e4685d;
  text-align: center;
  gap: 10px;
  padding: 50px 0;
`;

const Warrning = styled.h4`
  width: 100%;
  font-size: 2rem;
`;
const BackTo = styled(Link)`
  width: 100%;
  font-size: 1.4rem;
  color: #e4685d;
`;

const NotFound = styled.img`
  width: "100%";
  height: 300px;
`;
export default NoteFound;
