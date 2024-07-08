// src/Rating.js
import { useState } from 'react';
import "../../static/stylesheets/rating.css"

export const Rating = ({ totalStars = 5 }) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
  
    return (
      <div className="rating">
        {[...Array(totalStars)].map((_, index) => {
          const ratingValue = index + 1;
          return (
            <div key={index} className="star-container">
              <label>
                <input
                  type="radio"
                  name="rating"
                  value={ratingValue - 0.5}
                  onClick={() => setRating(ratingValue - 0.5)}
                  style={{ display: 'none' }}
                />
                <svg
                  className="star left"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="25"
                  height="25"
                  style={{
                    color: (ratingValue - 0.5) <= hover ? '#ffc107' : '#e4e5e9',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={() => setHover(ratingValue - 0.5)}
                  onMouseLeave={() => setHover(0)}
                >
                  <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.787 1.615 8.162-7.551-4.008L4.449 23.255 6.064 15.093 0 9.305l8.332-1.15z" />
                </svg>
              </label>
              <label>
                <input
                  type="radio"
                  name="rating"
                  value={ratingValue}
                  onClick={() => setRating(ratingValue)}
                  style={{ display: 'none' }}
                />
                <svg
                  className="star right"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="25"
                  height="25"
                  style={{
                    color: ratingValue <= hover ? '#ffc107' : '#e4e5e9',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(0)}
                >
                  <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.787 1.615 8.162-7.551-4.008L4.449 23.255 6.064 15.093 0 9.305l8.332-1.15z" />
                </svg>
              </label>
            </div>
          );
        })}
      </div>
    );
  };