import React from "react";
// utils
import { getDateTime } from "../../utils";
// ui
import ReviewStar from "../UI/ReviewStar";
// styles
import styles from './Review.module.css'

const UserReview = ({ review, my_review }) => {
  return (
    <div className={`review ${styles.review}`}>
      <div>
        <h4>{!my_review ? review.user : ""}</h4>
      </div>
      <ReviewStar rating={review.rating} />
      <span className={styles.time__stamp}>{getDateTime(review.updated)}</span>
      <h5>{review.subject}</h5>
      <p>{review.review}</p>
    </div>
  );
};

export default UserReview;
