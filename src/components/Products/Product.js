import React from 'react'

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
            </div>
        </div>
    )
}

export default Product;
