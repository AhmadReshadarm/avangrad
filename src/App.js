import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import styled from "styled-components";

import "./sass/main.scss";

import Home from "./Home";
import Product from "./Product";
import Header from "./components/Header";
import NotFound from "./components/404";

function App() {
  const location = useLocation();
  return (
    <BodyWrapper>
      <AnimatePresence>
        <Wrapper>
          <Header />
        </Wrapper>
        <Routes location={location} key={location.key}>
          <Route exact path="/" element={<Home />} />
          <Route path="/products/:id" element={<Product />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </BodyWrapper>
  );
}

const BodyWrapper = styled.div`
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

export default App;
