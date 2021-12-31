import React from "react";
import { Footer, Header } from ".";

// context 
import NavProvider from "../../context/nav-context";

const Base = ({ children }) => {
  return (
    <NavProvider>
      <Header />
      {children}
      <Footer />
    </NavProvider>
  );
};

export default Base;
