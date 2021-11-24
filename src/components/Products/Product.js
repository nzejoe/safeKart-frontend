import React from 'react';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
    return (
        <div style={{marginBottom: "10px"}}>
            <div className="image-comtainer">
                <img src={`http://localhost:8000${product.image}`} alt={product.product_name} width="100px"></img>
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
    )
}

export default Product;
