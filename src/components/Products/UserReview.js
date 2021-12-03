import React from 'react'
// utils
import { getDateTime } from '../../utils';
 // ui
 import ReviewStar from '../UI/ReviewStar'

const UserReview = ({ review }) => {
    return (
      <div className="review">
        <div>
          <h4>{review.user}</h4>
        </div>
        <ReviewStar rating={review.rating} />
        <span>{getDateTime(review.updated)}</span>
        <h5>{review.subject}</h5>
        <p>{review.review}</p>
      </div>
    );
}

export default UserReview
