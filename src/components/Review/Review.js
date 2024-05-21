// ReviewPopup.js
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faArrowLeftLong, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import './Review.css';
import profile from '../../images/Profile.jpg'
import { useAuthContext } from '../../hooks/useAuthContext';
import { useItemsContext } from '../../hooks/useItemsContext'
import Loader from '../../components/Loader/Loader'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ReviewPopup = ({ onClose, showReviewPopup, userSeller, languageText, api }) => {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [isReviewValid, setIsReviewValid] = useState(true);
    const [loading, setLoading] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const { user } = useAuthContext()
    const { users = [], reviews = [], dispatch } = useItemsContext();
    const [userData, setUserData] = useState(null)
    const [error, setError] = useState(null)


    // const [reviewComment,setReviewComment] = useState("")

    useEffect(() => {
        const fetchItems = async () => {
            setLoading(true)

            try {


                const response = await fetch(`${api}/api/user/${userSeller}`, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                if (!response.ok) {
                    console.error(`Error fetching Items. Status: ${response.status}, ${response.statusText}`);
                    setError('Failed to fetch data');

                    return;
                }
                const userJson = await response.json()

                dispatch({
                    type: 'GET_ITEM',
                    collection: "users",
                    payload: userJson,
                });

                setUserData(userJson)
                setLoading(false)


            } catch (error) {
                console.error('An error occurred while fetching data:', error);
                setError('An error occurred while fetching data');

            }
        };

        if (user) {
            fetchItems()
        }
    }, [api, dispatch, user])



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

    // const handleSubmit = async () => {
    //     if (isReviewValid) {
    //         // await onSubmit({ rating, review });
    //         onClose();
    //     } else {
    //         // Show an error message or handle invalid review state
    //         console.log('Review is empty. Please write a review.');
    //     }
    // };



    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError(languageText.YouMustBeLoggedIn)
        }
        else {

            setSubmitting(true)


            const item = {
                reviewerID: user.userId,
                sellerID: userData?._id,
                reviewComment: review,
                reviewRating: rating

            }

            const response = await fetch(`${api}/api/reviews`, {
                method: "POST",
                body: JSON.stringify(item),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`

                }
            })
            const json = await response.json()

            if (!response.ok) {
                setError(json.error);
            } else {
                setError(null);
                dispatch({
                    type: 'CREATE_FORM',
                    collection: "reviews",
                    payload: json
                });
                toast.success(languageText.ReviewAddedSuccessfully, {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    style: {
                        // fontFamily: language === 'ar' ?
                        //     'Noto Kufi Arabic, sans-serif' :
                        //     'Poppins, sans-serif',
                    },
                });
                setSubmitting(false);
                onClose();



            }
        }

    }


    return (
        <form className={`ReviewPopup ${showReviewPopup ? 'show' : ''}`} onSubmit={handleSubmit}>
            {loading ? (
                <div className="Loader">
                    <Loader />
                    <p className="LoaderText">{languageText.Loading}</p>
                </div>
            ) : (<>
                <div className="PopupHeader">
                    <button onClick={onClose}>
                        <FontAwesomeIcon icon={faArrowLeftLong} />
                    </button>
                    <h3>{languageText.Rate} <span className="HeaderName">{userData?.userFname}</span></h3>
                    <img src={userData?.userImage} alt="" />
                </div>
                <div className="RatingContainer">
                    <p>{languageText.Rate}</p>
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
                <p className="WriteAReview">{languageText.WriteAReview}</p>
                <textarea
                    // placeholder="Write your review..."
                    value={review}
                    onChange={handleReviewChange}
                    required
                />
                {!isReviewValid && <p className="ReviewError"><FontAwesomeIcon icon={faTriangleExclamation} /> {languageText.ReviewEmpty}</p>}
                {review && rating && <button className='ReviewSubmit'>{languageText.Submit}</button>}
            </>
            )}
        </form>
    );

};

export default ReviewPopup;
