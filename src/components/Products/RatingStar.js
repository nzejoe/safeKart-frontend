import React from "react";
import { FaStar, FaStarHalf } from "react-icons/fa";

import style from "./RatingStar.module.css";

const RatingStar = ({ onChange, rating }) => {
  return (
    <div className={style.rating__container}>
      <span className={style.rating__stars}>
        <input
          type="radio"
          name="rating"
          id="5"
          value={5}
          onChange={onChange}
          defaultChecked={rating === 5}
        />
        <label htmlFor="5">
          <FaStar
            className="star"
            style={{ position: "absolute", left: "-2rem", top: ".2rem" }}
          />
        </label>
        <input
          type="radio"
          name="rating"
          id="4.5"
          value={4.5}
          onChange={onChange}
          defaultChecked={rating === 4.5}
        />
        <label htmlFor="4.5" className={style.half}>
          <FaStarHalf className="star" />
        </label>
        <input
          type="radio"
          name="rating"
          id="4"
          value={4}
          onChange={onChange}
          defaultChecked={rating === 4}
        />
        <label htmlFor="4">
          <FaStar
            className="star"
            style={{ position: "absolute", left: "-2rem", top: ".2rem" }}
          />
        </label>
        <input
          type="radio"
          name="rating"
          id="3.5"
          value={3.5}
          onChange={onChange}
          defaultChecked={rating === 3.5}
        />
        <label htmlFor="3.5" className={style.half}>
          <FaStarHalf className="star" />
        </label>
        <input
          type="radio"
          name="rating"
          id="3"
          value={3}
          onChange={onChange}
          defaultChecked={rating === 3}
        />
        <label htmlFor="3">
          <FaStar
            className="star"
            style={{ position: "absolute", left: "-2rem", top: ".2rem" }}
          />
        </label>
        <input
          type="radio"
          name="rating"
          id="2.5"
          value={2.5}
          onChange={onChange}
          defaultChecked={rating === 2.5}
        />
        <label htmlFor="2.5" className={style.half}>
          <FaStarHalf className="star" />
        </label>
        <input
          type="radio"
          name="rating"
          id="2"
          value={2}
          onChange={onChange}
          defaultChecked={rating === 2}
        />
        <label htmlFor="2">
          <FaStar
            className="star"
            style={{ position: "absolute", left: "-2rem", top: ".2rem" }}
          />
        </label>
        <input
          type="radio"
          name="rating"
          id="1.5"
          value={1.5}
          onChange={onChange}
          defaultChecked={rating === 1.5}
        />
        <label htmlFor="1.5" className={style.half}>
          <FaStarHalf className="star" />
        </label>
        <input
          type="radio"
          name="rating"
          id="1"
          value={1}
          onChange={onChange}
          defaultChecked={rating === 1}
        />
        <label htmlFor="1">
          <FaStar
            className="star"
            style={{ position: "absolute", left: "-2rem", top: ".2rem" }}
          />
        </label>
        <input
          type="radio"
          name="rating"
          id="0.5"
          value={0.5}
          onChange={onChange}
          defaultChecked={rating === 0.5}
        />
        <label htmlFor="0.5" className={style.half}>
          <FaStarHalf className="star" />
        </label>
      </span>
    </div>
  );
};

export default RatingStar;
