import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
// state
import { actions as cartActions } from "../../store/cart-slice";
// ui
import { NotFound } from ".";

const ProductDetailPage = () => {
    const { token } = useSelector(state => state.users)
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [colors, setColors] = useState(null);
  const [sizes, setSizes] = useState(null);
  const [brand, setBrand] = useState(null);

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  const [formHasError, setFormHasError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const { slug } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    axios({
      url: `products/${slug}`,
      method: "GET",
    })
      .then((res) => {
        if (res.status === 200) {
          setProduct(res.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log({ ...error });
        setLoading(false);
      });
  }, [slug]);

  useEffect(() => {
    if (product) {
      const colors = product.variations.colors && product.variations.colors;
      const sizes = product.variations.sizes && product.variations.sizes;
      const brand = product.variations.brand && product.variations.brand[0];
      setColors(colors);
      setSizes(sizes);
      setBrand(brand);
    }
  }, [product]);

  // variation check
  useEffect(() => {
    if (colors && colors.length > 0 && !selectedColor) {
      setFormHasError(true);
      setErrorMsg("Please choose color.")
    } else if (sizes && sizes.length > 0 && !selectedSize) {
      setFormHasError(true);
      setErrorMsg("Please choose size.");
    }else{
        setFormHasError(false)
    }
  }, [colors, selectedColor, sizes, selectedSize]);
  
  // form submit
  const addItemHandler = (e) => {
    e.preventDefault();
    if (!formHasError) {
      const data = {
        product_id: product.id,
        color: selectedColor,
        size: selectedSize,
        brand: brand || null,
      };
      dispatch(cartActions.addToCart({data, token}));
    }
  };

  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
  };

  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
  };

  return (
    <section className={`section`}>
      <div className="section__wrapper">
        {loading && <p>please wait...</p>}
        {product && !loading && (
          <div>
            <div className="product__img_container">
              <img
                src={`http://localhost:8000${product.image}`}
                alt={product.product_name}
              ></img>
            </div>
            <div>
              {brand && <p>{brand}</p>}
              <h5>{product.product_name}</h5>
              <p>$ {product.price}</p>
            </div>
            <div>
              <form>
                {errorMsg && <h5>{errorMsg}</h5>}
                {colors.length > 0 && (
                  <div>
                    <h5>colors</h5>
                    {colors.map((color) => {
                      return (
                        <div
                          style={{
                            display: "inline-block",
                            margin: "1rem",
                            border: "ipx solid black",
                          }}
                          key={product.id + color}
                        >
                          <label htmlFor={color}>{color}</label>
                          <input
                            type="radio"
                            name="color"
                            id={color}
                            value={color}
                            required={colors && true}
                            checked={color === selectedColor}
                            onChange={handleColorChange}
                          />
                        </div>
                      );
                    })}
                  </div>
                )}

                {sizes.length > 0 && (
                  <div>
                    <h5>sizes</h5>
                    {sizes.map((size) => {
                      return (
                        <div
                          style={{
                            display: "inline-block",
                            margin: "1rem",
                          }}
                          key={product.id + size}
                        >
                          <label htmlFor={size}>{size}</label>
                          <input
                            type="radio"
                            name="size"
                            id={size}
                            value={size}
                            required={sizes && true}
                            checked={size === selectedSize}
                            onChange={handleSizeChange}
                          />
                        </div>
                      );
                    })}
                  </div>
                )}

                <div>
                  <button type="submit" onClick={addItemHandler}>
                    add to cart
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {
          // if no longer loading and no product was found
          !loading && !product && <NotFound />
        }
      </div>
    </section>
  );
};

export default ProductDetailPage;
