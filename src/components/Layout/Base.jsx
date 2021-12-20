import React from "react";
import { Footer, Header } from ".";

const Base = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Base;
