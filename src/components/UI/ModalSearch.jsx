import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// store
import { getProducts } from "../../store/product-slice";
// style
import styles from "./ModalSearch.module.css";

const ModalSearch = ({ query, setIsSearching, setQuery, closeSearch }) => {
  const { allProducts } = useSelector((state) => state.products);
  const [matchedProducts, setMatchProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    if (query) {
      setMatchProducts(
        allProducts.filter((product) => {
          return (
            product.product_name.toLowerCase().indexOf(query.toLowerCase()) !==
              -1 ||
            product.category.toLowerCase().indexOf(query.toLowerCase()) !== -1
          );
        })
      );
    } else {
      setMatchProducts([]);
    }
  }, [query, allProducts]);

  const closeSearchHandler = () => {
    setIsSearching(false); // close search modal
    setQuery(""); // reset query
  };

  return (
    <div className={`${styles.search__results} ${closeSearch ? styles.closeSearch : ''}`}>
      {matchedProducts.length !== 0 ? (
        matchedProducts.map((product) => {
          return (
            <div key={product.id}>
              <Link
                to={`/store/${product.slug}`}
                onClick={closeSearchHandler}
                className={styles.search__product}
              >
                <div>
                  <img src={product.image} alt={product.product_name} />
                </div>
                <span>{product.product_name}</span>
              </Link>
            </div>
          );
        })
      ) : query ? (
        <h4>No product matching your search query!</h4>
      ) : (
        <h4>Try searching for a key word</h4>
      )}
    </div>
  );
};

export default ModalSearch;
