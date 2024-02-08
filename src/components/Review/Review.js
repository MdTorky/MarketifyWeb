// ReviewPopup.js
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faArrowLeftLong, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import './Review.css';
import profile from '../../images/Profile.jpg'

const ReviewPopup = ({ onClose, onSubmit, showReviewPopup }) => {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [isReviewValid, setIsReviewValid] = useState(true);

    const handleRatingClick = (value) => {
        setRating(value);
    };

    const handleReviewChange = (e) => {
        const value = e.target.value;
        setReview(value);
        setIsReviewValid(value.trim() !== ''); // Check if review is not empty
    };

    useEffect(() => {
        document.body.classList.add('popup-open');
        return () => {
            document.body.classList.remove('popup-open');
        };
    }, []);

    const handleSubmit = () => {
        if (isReviewValid) {
            onSubmit({ rating, review });
            onClose();
        } else {
            // Show an error message or handle invalid review state
            console.log('Review is empty. Please write a review.');
        }
    };

    return (
        <form className={`ReviewPopup ${showReviewPopup ? 'show' : ''}`}>
            <div className="PopupHeader">
                <button onClick={onClose}>
                    <FontAwesomeIcon icon={faArrowLeftLong} />
                </button>
                <h3>Rate <span className="HeaderName">Ali</span></h3>
                <img src={profile} alt="" />
            </div>
            <div className="RatingContainer">
                <p>Rate</p>
                <>
                    {[1, 2, 3, 4, 5].map((value) => (
                        <FontAwesomeIcon
                            key={value}
                            icon={faStar}
                            className={`Star ${value <= rating ? 'selected' : ''}`}
                            onClick={() => handleRatingClick(value)}
                        />
                    ))}
                </>
            </div>
            <p className="WriteAReview">Write a Review</p>
            <textarea
                // placeholder="Write your review..."
                value={review}
                onChange={handleReviewChange}
            />
            {!isReviewValid && <p className="ReviewError"><FontAwesomeIcon icon={faTriangleExclamation} /> Review cannot be empty</p>}
            <button onClick={handleSubmit} className='ReviewSubmit'>Submit</button>
        </form>
    );

};

export default ReviewPopup;
