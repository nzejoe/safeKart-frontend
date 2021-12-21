import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
// icons
import { BsFillGridFill, BsList } from "react-icons/bs";

import {
  getProducts,
  actions as productActions,
} from "../../store/product-slice";
import Product from "./Product";

// utils
import { getPaginatedProducts } from "../../utils";
// style
import styles from "./ProductList.module.css";

const ProductList = () => {
  const { filteredProducts, filter } = useSelector((state) => state.products);

  const [page, setPage] = useState(0);
  const [grid, setGrid] = useState(true);

  const products = getPaginatedProducts(filteredProducts);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(productActions.getFilterProducts());
    setPage(0); // reset page number when filtering
  }, [dispatch, filter]);

  const handlePage = (index) => {
    setPage(index);
  };

  return (
    <main>
      <div className={styles.product__view_switch}>
        {/* GRID TOGGLE BUTTONS*/}
        <BsFillGridFill
          className={`${styles.switch__view_btn} ${
            grid ? styles.btn__active : ""
          }`}
          onClick={() => setGrid(true)}
          title="Grid view"
        />
        <BsList
          className={`${styles.switch__view_btn} ${
            !grid ? styles.btn__active : ""
          }`}
          onClick={() => setGrid(false)}
          title="List view"
        />
      </div>
      <div
        className={`${styles.product__container} ${
          grid ? styles.product__grid : styles.product__list
        }`}
      >
        {products ? (
          products[page].map((product) => {
            return (
              <Product
                key={product.id}
                product={product}
                grid={grid}
                styles={styles}
              />
            );
          })
        ) : (
          <h4>Sorry! No product matches your search patterns...</h4>
        )}
      </div>

      {/* PAGINATION BUTTONS */}
      {products && products.length > 1 && (
        <div className={styles.page__btns}>
          {page > 0 ? (
            <button
              onClick={() => handlePage(page - 1)}
              className={styles.prev}
            >
              Prev
            </button>
          ) : (
            <button className={`${styles.prev} ${styles.disabled}`}>
              Prev
            </button>
          )}
          {products.map((product, index) => {
            return (
              <button
                key={index}
                className={`${page === index && styles.active__page}`}
                onClick={() => handlePage(index)}
              >
                {index + 1}
              </button>
            );
          })}
          {page < products.length - 1 ? (
            <button
              onClick={() => handlePage(page + 1)}
              className={styles.next}
            >
              Next
            </button>
          ) : (
            <button className={`${styles.next} ${styles.disabled}`}>
              Next
            </button>
          )}
        </div>
      )}
    </main>
  );
};

export default ProductList;
