// ReviewPopup.js
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faTimes } from '@fortawesome/free-solid-svg-icons';
import './Review.css';

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
                <h3>Write a Review</h3>
                <button onClick={onClose}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
            </div>
            <div className="RatingContainer">
                Rate
                {[1, 2, 3, 4, 5].map((value) => (
                    <FontAwesomeIcon
                        key={value}
                        icon={faStar}
                        className={`Star ${value <= rating ? 'selected' : ''}`}
                        onClick={() => handleRatingClick(value)}
                    />
                ))}
            </div>
            <textarea
                placeholder="Write your review..."
                value={review}
                onChange={handleReviewChange}
            />
            {!isReviewValid && <p className="error-message">Review cannot be empty</p>}
            <button onClick={handleSubmit}>Submit</button>
        </form>
    );

};

export default ReviewPopup;
