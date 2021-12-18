import { useRef } from "react";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";
import axios from "axios";

import Product from "../Products/Product";
// data
import { heroImageData } from "../../data";
// styles
import styles from "./Home.module.css";
import { useTransition, animated } from "react-spring";

const Home = () => {
  document.title = "Home | SafeKart";
  const [query, setQuery] = useState("");
  const [topProducts, setTopProducts] = useState([]);
  // hero image slider
  const [activeImage, setActiveImage] = useState(0);

  const sliderRef = useRef();

  const navigate = useNavigate();

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

  // ANIMATION
  // SLIDE IMAGE
  const transition = useTransition(heroImageData, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    delay: 0,
    config: { duration: 200 },
  });

  useEffect(() => {
    if (query) {
      navigate(`search?query=${query}`);
    } else {
      navigate("/");
    }
  }, [query, navigate]);

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
    <section className={` `}>
      <div className="">
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
                    >
                      <img src={item.url} alt="" />
                      <div
                        className={`${styles.slide__info} ${
                          index === 0
                            ? styles.slide__info_1
                            : styles.slide__info_2
                        }`}
                      >
                        <h4 className={styles.slide__info_hash}>
                          {" "}
                          {item.hash}
                        </h4>
                        <h3 className={styles.slide__info_header}>
                          {item.header}
                        </h3>
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
          <div>
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
          <Outlet />
          <div>
            <h4> home Page</h4>
          </div>
          <div className="top__products">
            <h3>Top selling products</h3>
            {topProducts.map((product) => {
              return <Product product={product} key={product.id} grid={true} />; // set it to grid view
            })}
            <Link to="store">View all</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
