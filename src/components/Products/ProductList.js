import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  getProducts,
  actions as productActions,
} from "../../store/product-slice";
import Product from "./Product";

// utils
import { getPaginatedProducts } from "../../utils";

const ProductList = () => {
  const { filteredProducts, filter } = useSelector((state) => state.products);
 
  const [page, setPage] = useState(0);
  const [grid, setGrid] = useState(true);

 const products = getPaginatedProducts(filteredProducts)

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
    <div>
      <div className="products__view_switch">
        {/* GRID TOGGLE BUTTONS*/}
        <button onClick={() => setGrid(true)}>Grid</button>
        <button onClick={() => setGrid(false)}>List</button>
      </div>
      {products ? (
        products[page].map((product) => {
          return <Product key={product.id} product={product} grid={grid} />;
        })
      ) : (
        <h4>Sorry! No product matches your search patterns...</h4>
      )}
      {products && products.length > 1 && (
        <div className="page__btns">
          {page > 0 ? (
            <button onClick={() => handlePage(page - 1)}>Prev</button>
          ) : (
            <button>Prev</button>
          )}
          {products.map((product, index) => {
            return (
              <button
                key={index}
                className={`${page === index && "active"}`}
                onClick={() => handlePage(index)}
              >
                {index + 1}
              </button>
            );
          })}
          {page < products.length - 1 ? (
            <button onClick={() => handlePage(page + 1)}>Next</button>
          ) : (
            <button>Next</button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductList;
