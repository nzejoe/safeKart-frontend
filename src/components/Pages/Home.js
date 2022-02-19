import { useRef } from "react";
import React, { useEffect, useState } from "react";
// eslint-disable-next-line
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

// layout
import { PromoOffer, OurServices } from "../Layout";

// data
import { heroImageData } from "../../data";
// styles
import styles from "./Home.module.css";

const Home = () => {
  document.title = "Home | SafeKart";
  // const [query, setQuery] = useState("");
  const [topCategories, setTopCategories] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  // hero image slider
  const [activeImage, setActiveImage] = useState(0);

  const sliderRef = useRef();

  // const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (activeImage === 0) {
        setActiveImage(1);
      } else {
        setActiveImage(0);
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, [activeImage]);

  // useEffect(() => {
  //   if (query) {
  //     navigate(`search?query=${query}`);
  //   } else {
  //     navigate("/");
  //   }
  // }, [query, navigate]);


  // TOP CATEGORY
  useEffect(() => {
    const getTopProducts = async () => {
      await axios
        .get("/products/categories/")
        .then((res) => {
          setTopCategories(res.data);
        })
        .catch((error) => console.log(error));
    };

    getTopProducts();
  }, []);

  // TOP PRODUCTS
  useEffect(() => {
    const getTopProducts = async () => {
      await axios
        .get("/products/top_products/")
        .then((res) => {
          setTopProducts(res.data);
        })
        .catch((error) => console.log(error));
    };

    getTopProducts();
  }, []);

  // SLIDE CHANGER
  const changeSlide = (index) => {
    setActiveImage(index);
  };

  return (
    <div>
      {/* HERO */}
      <div className={styles.hero}>
        <div className={styles.slide__viewer}>
          <div className={styles.slider} ref={sliderRef}>
            {heroImageData.map((item, index) => {
              return (
                <div
                  className={`${styles.slide} ${
                    activeImage === index && styles.slide__active
                  }`}
                  key={index}
                >
                  <img src={item.url} alt="" />
                  <div
                    className={`${styles.slide__info} ${
                      index === 0 ? styles.slide__info_1 : styles.slide__info_2
                    }`}
                  >
                    <h4 className={styles.slide__info_hash}> {item.hash}</h4>
                    <h3 className={styles.slide__info_header}>{item.header}</h3>
                    <p className={styles.slide__info_text}>{item.text}</p>
                    <div className={styles.link__container}>
                      <Link
                        to="store"
                        className={`${styles.slide__info_link} btn__primary`}
                      >
                        {item.link}
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {/* SLIDE BUTTONS */}
          <div className={styles.slide__btns}>
            {heroImageData.map((img, index) => {
              return (
                <button
                  key={index}
                  onClick={() => changeSlide(index)}
                  className={`${styles.slide__btn} ${
                    activeImage === index && styles.slide__btn_active
                  }`}
                ></button>
              );
            })}
          </div>
        </div>
      </div>
      {/* <div>
            <form onSubmit={(e) => e.preventDefault()}>
              <div>
                <input
                  type="search"
                  id="search"
                  placeholder="Search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit">Search</button>
              </div>
            </form>
          </div>
          <Outlet /> */}

      {/* TOP CATEGORY SECTION */}
      <section className={`section ${styles.top__cat_section}`}>
        <div className="section__wrapper">
          <div className={styles.section__category}>
            <h1>Top categories</h1>
            <div className={styles.top__categories}>
              {topCategories &&
                topCategories.map((category) => {
                  return (
                    <div className={styles.category} key={category.id}>
                      <div className={styles.category__img_container}>
                        <img
                          src={category.image}
                          alt={category.product_name}
                        ></img>
                        <div className={styles.category__info}>
                          <h2>{category.name}</h2>
                          <Link to="store" className="btn__link">
                            shop now
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </section>
      {/* END OF TOP CATEGORY SECTION */}

      {/* TOP PRODUCT SECTION */}
      <section className={`section ${styles.section__top_products}`}>
        <div className="section__wrapper">
          <h1>best sellers</h1>
          <div className={styles.top__products}>
            {topProducts.map((product) => {
              return (
                <div className={styles.product} key={product.id}>
                  <div className={styles.product__img_container}>
                    <img
                      src={product.image}
                      alt={product.product_name}
                    ></img>
                  </div>
                  <div className={styles.product__body}>
                    <h4>{product.product_name}</h4>
                    <div>
                      <span>$</span>
                      <span>{product.price}</span>
                    </div>
                    <div>
                      <Link to={`/store/${product.slug}`} className="btn__link">
                        view
                      </Link>
                    </div>
                  </div>
                </div>
              ); // set it to grid view
            })}
          </div>
          <Link to="store" className="btn__primary">
            View more
          </Link>
        </div>
      </section>
      {/* END OF TOP PRODUCT SECTION */}
      <PromoOffer/>
      <OurServices/>
    </div>
  );
};

export default Home;
