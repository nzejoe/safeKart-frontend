import React from 'react';
import { Link } from 'react-router-dom';

const Product = ({ product, grid }) => {
    return (
      <React.Fragment>
        {grid ? (
          // GRID VIEW
          <div style={{ marginBottom: "10px" }}>
            <div className="image-comtainer">
              <img
                src={`http://localhost:8000${product.image}`}
                alt={product.product_name}
                width="100px"
              ></img>
            </div>
            <div className="product-body">
              <h4>{product.product_name}</h4>
              <div>
                <span>{product.price}</span>
              </div>
              <div>
                <Link to={`/store/${product.slug}`}>view</Link>
              </div>
            </div>
          </div>
        ) : (
          // LIST VIEW
          <div style={{ marginBottom: "10px", display: "flex", alignItems: 'center' }}>
            <div className="image-comtainer">
              <img
                src={`http://localhost:8000${product.image}`}
                alt={product.product_name}
                width="100px"
              ></img>
            </div>
            <div className="product-body">
              <h4>{product.product_name}</h4>
              <div>
                <span>{product.price}</span>
              </div>
              <p>
                {product.description.length > 100
                  ? product.description.substring(0, 300) + "..."
                  : product.description}
              </p>
              <div>
                <Link to={`/store/${product.slug}`}>view</Link>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
}

export default Product;
