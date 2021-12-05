import React from "react";


import ProductList from "../Products/ProductList";
import ProductFilter from "../UI/ProductFilter";

const Store = () => {
  document.title = "Store | SafeKart";

  return (
    <section className={`section `}>
      <div className="section__wrapper">
        <div style={{ display: "flex" }}>
          <ProductFilter/>
          <ProductList />
        </div>
      </div>
    </section>
  );
};

export default Store;
