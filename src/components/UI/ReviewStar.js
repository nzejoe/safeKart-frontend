import React from 'react'
// icons
import { FaStar, FaStarHalf } from 'react-icons/fa'

const ReviewStar = ( { rating }) => {
    return (
      <span className="rating__stars">
        <span className="rating__stars_group">
          <FaStar className={`star ${rating >= 1 && "rate"}`} />
          <FaStarHalf className={`star ${rating >= 0.5 && "rate"}`} />
        </span>
        <span className="rating__stars_group">
          <FaStar className={`star ${rating >= 2 && "rate"}`} />
          <FaStarHalf className={`star ${rating >= 1.5 && "rate"}`} />
        </span>
        <span className="rating__stars_group">
          <FaStar className={`star ${rating >= 3 && "rate"}`} />
          <FaStarHalf className={`star ${rating >= 2.5 && "rate"}`} />
        </span>
        <span className="rating__stars_group">
          <FaStar className={`star ${rating >= 4 && "rate"}`} />
          <FaStarHalf className={`star ${rating >= 3.5 && "rate"}`} />
        </span>
        <span className="rating__stars_group">
          <FaStar className={`star ${rating >= 5 && "rate"}`} />
          <FaStarHalf className={`star ${rating >= 4.5 && "rate"}`} />
        </span>
      </span>
    );
}

export default ReviewStar
