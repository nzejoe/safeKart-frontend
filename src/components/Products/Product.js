import React from "react";
import { Link } from "react-router-dom";

const Product = ({ product, grid, styles }) => {
  return (
    <>
      {grid ? (
        // GRID VIEW
        <div className={styles.grid__product}>
          <div className={styles.image__container}>
            <img
              src={product.image}
              alt={product.product_name}
            ></img>
          </div>
          <div className={styles.grid__product_body}>
            <h4>{product.product_name}</h4>
            <div>
              <p className={styles.price}>
                $<span>{product.price}</span>
              </p>
              <Link
                to={`/store/${product.slug}`}
                className={`btn__link ${styles.link}`}
              >
                View details
              </Link>
            </div>
          </div>
        </div>
      ) : (
        // LIST VIEW
        <div className={styles.list__product}>
          <div className={styles.image__container}>
            <img
              src={product.image}
              alt={product.product_name}
            ></img>
          </div>
          <div className={styles.list__product_body}>
            <div>
              <h4>{product.product_name}</h4>
              <p className={styles.price}>
                $<span>{product.price}</span>
              </p>
            </div>
            <p className={styles.product__desc}>
              {product.description.length > 300
                ? product.description.substring(0, 300) + "..."
                : product.description}
            </p>
            <div>
              <Link
                to={`/store/${product.slug}`}
                className={`btn__link ${styles.link}`}
              >
                view
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Product;
