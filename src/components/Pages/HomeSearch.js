import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import qs from "query-string";

// store
import { getProducts } from "../../store/product-slice";

const HomeSearch = () => {
  document.title = "Search results | SafeKart";
  const { allProducts } = useSelector((state) => state.products);
  const { search } = useLocation();
  const { query } = qs.parse(search);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const matchedProducts = allProducts.filter((product) => {
    return (
      product.product_name.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
      product.category.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  });

  return (
    <div>
      {matchedProducts.length !== 0 ? (
        matchedProducts.map((product) => {
          return (
            <div key={product.id}>
              <Link to={`/store/${product.slug}`}>
                <div>
                  <img
                    src={`http://localhost:8000${product.image}`}
                    alt={product.product_name}
                    width="50rem"
                  />
                  <span>{product.product_name}</span>
                </div>
              </Link>
            </div>
          );
        })
      ) : (
        <h4>No product matching your search query!</h4>
      )}
    </div>
  );
};

export default HomeSearch;
