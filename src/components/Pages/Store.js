import React from "react";
// style
import styles from './Store.module.css'


import ProductList from "../Products/ProductList";
import ProductFilter from "../Layout/ProductFilter";

const Store = () => {
  document.title = "Store | SafeKart";

  return (
    <section className={`section `}>
      <div className="section__wrapper">
        <div className={styles.content}>
          <ProductFilter />
          <ProductList />
        </div>
      </div>
    </section>
  );
};

export default Store;
