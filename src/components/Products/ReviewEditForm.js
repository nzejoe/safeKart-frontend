import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";

import RatingStar from "./RatingStar";
// style
import styles from './Review.module.css'

const ReviewEditForm = ({ userReview, handlePageRefresh, handleEdit }) => {
  const { token } = useSelector((state) => state.users);
  const [rating, setRating] = useState(userReview.rating);
  const [subject, setSubject] = useState(userReview.subject);
  const [review, setReview] = useState(userReview.review);
  const [formHasError, setFormHasError] = useState(false);

  const handleRateChange = (e) => {
    setRating(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating && token) {
      const data = {
        product: userReview.product,
        rating,
        subject,
        review,
      };

      try {
        const response = await axios({
          url: `products/update_review/${userReview.id}/`,
          method: "PUT",
          headers: {
            "X-CSRFToken": Cookies.get("csrftoken"),
            Authorization: `token ${token}`,
          },
          data: data,
        });

        if (response.status === 200) {
            handlePageRefresh();
            handleEdit(false);
        }
      } catch (error) {
        console.log({ ...error });
      }
    } else {
      setFormHasError(true);
    }
  };

  return (
    <div className={styles.review__form}>
      <h3>Edit your review</h3>
      <form onSubmit={handleSubmit}>
        {formHasError && <p>Please rate this product.</p>}
        <RatingStar onChange={handleRateChange} rating={rating} />
        <input
          type="text"
          placeholder="Enter subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          placeholder="Write a short note about this product."
          value={review}
          onChange={(e) => setReview(e.target.value)}
        ></textarea>
        <div className={styles.btn__container}>
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
};

export default ReviewEditForm;
