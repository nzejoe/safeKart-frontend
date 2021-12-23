import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
// icons
import { FiPlus, FiMinus } from 'react-icons/fi'
// style
import styles from "./ProductDetail.module.css";

// state
import { addToCart } from "../../store/cart-slice";

import UserReview from "../Products/UserReview";
// ui
import { NotFound } from ".";
import ReviewStar from "../UI/ReviewStar";
import ReviewForm from "../Products/ReviewForm";
import MyReview from "../Products/MyReview";
import Loading from "../UI/Loading";

const ProductDetailPage = () => {
  const { token, authUser } = useSelector((state) => state.users);
  const [product, setProduct] = useState(null);
  const [defaultImage, setDefaultImage] = useState(null);
  const [isPurchased, setIsPurchased] = useState(false);
  const [reviews, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [colors, setColors] = useState(null);
  const [sizes, setSizes] = useState(null);
  const [brand, setBrand] = useState(null);

  // ADD TO CART
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const [formHasError, setFormHasError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // page refresh on review submitted
  const [refresh, refreshPage] = useState(0);
  // user review
  const [alreadyReviewed, setAlreadyReviewed] = useState(false);
  const [myReview, setMyReview] = useState(null);

  const { slug } = useParams();
  const dispatch = useDispatch();

  // page title
   document.title = `${product && product.product_name} | SafeKart`

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios({
          url: `products/${slug}`,
          method: "GET",
          headers: {
            authorization: token && `token ${token}`,
          },
        });

        if (response.status === 200) {
          const data = response.data;
          setProduct(data.product);
          setIsPurchased(data.is_purchased);
          setAlreadyReviewed(data.already_reviewed);
          setLoading(false);
        }
      } catch (error) {
        console.log({ ...error });
        setLoading(false);
      }
    };

    getProduct();
  }, [slug, token, refresh]);

  // set variations
  useEffect(() => {
    if (product) {
      const colors = product.variations.colors && product.variations.colors;
      const sizes = product.variations.sizes && product.variations.sizes;
      const brand = product.variations.brand && product.variations.brand[0];
      setColors(colors);
      setSizes(sizes);
      setBrand(brand);
      setReview(product.reviews);
      setDefaultImage(product.image);
    }
  }, [product]);

  // variation check
  useEffect(() => {
    if (colors && colors.length > 0 && !selectedColor) {
      setFormHasError(true);
      setErrorMsg("Please choose color.");
    } else if (sizes && sizes.length > 0 && !selectedSize) {
      setFormHasError(true);
      setErrorMsg("Please choose size.");
    } else {
      setFormHasError(false);
      setErrorMsg("");
    }
  }, [colors, selectedColor, sizes, selectedSize]);

  // set user review
  useEffect(() => {
    if (alreadyReviewed) {
      const username = authUser && authUser.username;
      const review = reviews.find((review) => review.user === username);
      setMyReview(review);
    }
  }, [alreadyReviewed, authUser, reviews]);

  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
  };

  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
  };

  // page refresh handler
  const handlePageRefresh = useCallback(() => {
    refreshPage(refresh + 1);
  }, [refresh]);

  // quantity value change handler
  const handleQuantityChange = (quantity) => {
    const maxValue = product && product.stock;
    let value =  parseInt(quantity);

    if (value > maxValue) {
      setQuantity(maxValue);
    } else if (value < 1) {
      setQuantity(1);
    } else {
      setQuantity(value);
    }
  };

  // always check if user try to clear input value
  // because if they do if will result in error 
  useEffect(()=>{
     if (Number.isNaN(quantity)) {
       setQuantity(1); // set quantity to 1 if value cleared
     }
  },[quantity])

  // form submit
  const addItemHandler = (e) => {
    e.preventDefault();
    if (!formHasError) {
      const data = {
        product_id: product.id,
        color: selectedColor,
        size: selectedSize,
        brand: brand || null,
        quantity,
      };
      
      dispatch(addToCart({ data, token }));
    }
  };

  return (
    <section className={`section`}>
      <div className="section__wrapper">
        {loading && <Loading/>}
        {product && !loading && (
          <div>
            <div className={styles.product__detail}>
              <div className={styles.image__container}>
                <div className="gallery__thumbs">
                  {product.gallery.map((img, index) => {
                    return (
                      <div
                        className="thumb"
                        key={index}
                        onClick={(e) => setDefaultImage(img.image)}
                      >
                        <img
                          src={`http://localhost:8000${img.thumb}`}
                          alt={product.product_name}
                          width="50"
                        />
                      </div>
                    );
                  })}
                </div>
                <div className={styles.default__img}>
                  <img
                    src={`http://localhost:8000${defaultImage}`}
                    alt={product.product_name}
                  ></img>
                </div>
              </div>
              <div>
                <div className={styles.product__info}>
                  <h5>{product.product_name}</h5>
                  {brand && <p>{brand}</p>}
                  <p className={styles.product__price}>
                    $<span>{product.price}</span>
                  </p>
                  <div className="review">
                    <ReviewStar rating={product.rating} /> (
                    <span>{product.reviews.length} customer reviews</span>)
                  </div>
                </div>

                {/* ADD TO CART FORM */}
                <div className={styles.product__form}>
                  <form>
                    {formHasError && <h5>{errorMsg}</h5>}
                    {colors.length > 0 && (
                      <div>
                        <h5 className={styles.variation__title}>colors</h5>
                        {colors.map((color) => {
                          return (
                            <div
                              className={styles.form__group}
                              key={product.id + color}
                            >
                              <label
                                htmlFor={color}
                                className={`${
                                  selectedColor === color ? styles.selected : ""
                                }`}
                              >
                                {color}
                              </label>
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
                        <h5 className={styles.variation__title}>sizes</h5>
                        {sizes.map((size) => {
                          return (
                            <div
                              className={styles.form__group}
                              key={product.id + size}
                            >
                              <label
                                htmlFor={size}
                                className={`${
                                  selectedSize === size ? styles.selected : ""
                                }`}
                              >
                                {size}
                              </label>
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

                    {/* quantity */}
                    <div className={styles.quantity}>
                      <h4>Quantity</h4>
                      <div>
                        <span
                          className={styles.minus}
                          onClick={() => handleQuantityChange(quantity - 1)}
                        >
                          {" "}
                          <FiMinus/>{" "}
                        </span>
                        <input
                          type="text"
                          value={Number.isNaN(quantity) ? 1 : quantity} // if user clear quatity return 1 instead
                          onChange={(e) => handleQuantityChange(e.target.value)}
                        />
                        <span
                          className={styles.plus}
                          onClick={() => handleQuantityChange(quantity + 1)}
                        >
                          {" "}
                          <FiPlus/>{" "}
                        </span>
                      </div>
                    </div>

                    <div>
                      <button
                        className="light__btn_big"
                        type="submit"
                        onClick={addItemHandler}
                      >
                        add to cart
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* REVIEW */}
            <div>
              {/* review form  */}
              {!alreadyReviewed && isPurchased && (
                <ReviewForm
                  productId={product.id}
                  handlePageRefresh={handlePageRefresh}
                />
              )}
              {/* end of review form */}

              {/* user review */}
              {myReview && alreadyReviewed && (
                <MyReview review={myReview} handleRefresh={handlePageRefresh} />
              )}

              {/* review list */}
              {reviews && reviews.length !== 0 ? (
                <React.Fragment>
                  <h3>Reviews</h3>
                  {reviews.map((review) => {
                    return <UserReview key={review.id} review={review} />;
                  })}
                </React.Fragment>
              ) : (
                <h4>No review for this product yet.</h4>
              )}
              {/* end of review list */}
            </div>
            {/* end of review */}
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
