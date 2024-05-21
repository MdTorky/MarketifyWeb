// import './Products.css'
import logo from '../../images/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faStar, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import './ProductCard.css'
import PurchaseForm from '../PurhcaseForm/PurchaseForm';
import { useState, useEffect } from "react"
import { useAuthContext } from '../../hooks/useAuthContext';
import { useItemsContext } from '../../hooks/useItemsContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductCard = ({ edit, product, languageText, api }) => {
    const { user } = useAuthContext()
    const [isPurchaseFormOpen, setPurchaseFormOpen] = useState(false);
    const [updating, setUpdating] = useState(false)
    const { users = [], products = [], reviews = [], dispatch } = useItemsContext()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null);
    const [averageRating, setAverageRating] = useState(0);

    const handleTrashButtonClick = (event) => {
        event.preventDefault();
        event.stopPropagation();
        window.location.href = '/';
    };

    const openPurchaseForm = (event) => {
        event.preventDefault();
        setPurchaseFormOpen(true);
    };

    const closePurchaseForm = () => {
        setPurchaseFormOpen(false);
    };



    useEffect(() => {
        const fetchData = async () => {
            try {
                const reviewsResponse = await fetch(`${api}/api/reviews`, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                if (!reviewsResponse.ok) {
                    console.error(`Error fetching Items. Status: ${reviewsResponse.status}, ${reviewsResponse.statusText}`);
                    setError('Failed to fetch data');
                    return;
                }
                const reviewJson = await reviewsResponse.json();
                const reviewFilter = reviewJson.filter((review) => review.sellerID === product.userID);


                dispatch({
                    type: 'SET_ITEM',
                    collection: "reviews",
                    payload: reviewFilter,
                });

                const totalRating = reviewFilter.reduce((acc, review) => acc + review.reviewRating, 0);
                const avgRating = reviewFilter.length ? (totalRating / reviewFilter.length) : 0;
                setAverageRating(avgRating);

            } catch (error) {
                console.error('An error occurred while fetching form data:', error);
            } finally {
                // Set loading to false once the data is fetched (success or error)
                setLoading(false);
            }
        };

        if (user) {
            fetchData();
        }
    }, [api, dispatch, user, product.userID]);

    const handleDelete = async (e) => {
        setUpdating(true);
        e.stopPropagation();
        e.preventDefault();

        const confirmDelete = window.confirm(languageText.AreYouSureProduct);

        if (!confirmDelete) {
            return; // Cancel deletion if user clicks Cancel
        }

        try {
            const response = await fetch(`${api}/api/products/${product._id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                },
            });

            if (!response.ok) {
                console.error(`Error deleting suggestion. Status: ${response.status}, ${response.statusText}`);
                return;
            }
            if (response.ok) {
                const json = await response.json();
                dispatch({
                    type: 'DELETE_ITEM',
                    collection: "products",
                    payload: json
                });
                {
                    toast.success(`${languageText.DeletedSuccessfully}`, {
                        position: "bottom-center",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark"
                    });
                }
                setUpdating(false);


            }

        } catch (error) {
            console.error('An error occurred while deleting data:', error);
        }
    };


    return (
        //    <Link to={`/product/${product._id}`} className="ProductCard"> 
        <Link to={user.userId !== product.userID ? `/product/${product._id}` : ''} className="ProductCard">

            <div className="ProductImg">
                {/* <img src={logo} alt="" /> */}
                <img src={product.pImage} alt="" />

                <svg viewBox="0 0 1921 1081" xmlns="http://www.w3.org/2000/svg" className="svg">
                    <defs>
                        <radialGradient gradientUnits="objectBoundingBox" gradientTransform="translate(0.219) scale(0.563 1)" r="1.204" cy="0.5" cx="0.5" id="radial-gradient">
                            <stop stop-color="#fff" offset="0"></stop>
                            <stop stop-color="#bcbcbc" offset="1"></stop>
                        </radialGradient>
                    </defs>
                    <g transform="translate(-121.5 -92.5)" id="hoodie">
                        <rect fill="url(#radial-gradient)" stroke-width="1" stroke-miterlimit="10" stroke="#fff" transform="translate(122 93)" height="1080" width="1920" data-name="Rectangle 83" id="Rectangle_83"></rect>
                    </g>
                </svg>

                {product.pPrice != 0 && product.pType === "Sell" && (<div className="ProductPrice">{product.pPrice} RM</div>)}
                {product.pType === "Donations" && (<div className="ProductPrice">{languageText.Donation}</div>)}
            </div>
            {/* <label className="favorite">
                <input checked="" type="checkbox" />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000">
                    <path d="M12 20a1 1 0 0 1-.437-.1C11.214 19.73 3 15.671 3 9a5 5 0 0 1 8.535-3.536l.465.465.465-.465A5 5 0 0 1 21 9c0 6.646-8.212 10.728-8.562 10.9A1 1 0 0 1 12 20z"></path>
                </svg>
            </label> */}

            <div className="ProductContent">
                <div className="ProductTitle">{product.pTitle}</div>
                <div className="ProductDesc">{product.pDescription}</div>
                {/* <div class="color-size-container">
                    <div class="colors">
                        Color
                        <ul class="colors-container">
                            <li class="color"><a href="#"></a> <span class="color-name">Collegiate Gold</span></li>
                            <li class="color active"><a href="#"></a><span class="color-name">Team Navy</span></li>
                            <li class="color"><a href="#"></a><span class="color-name">Pulse Blue</span></li>
                            <li class="color"><a href="#"></a><span class="color-name">Pink Fusion</span></li>
                            +2
                        </ul>
                    </div>
                    <div class="sizes">
                        Size
                        <ul class="size-container">
                            <li class="size">
                                <label class="size-radio">
                                    <input name="size" value="xs" type="radio" />
                                    <span class="name">XS</span>
                                </label>
                            </li>
                            <li class="size">
                                <label class="size-radio">
                                    <input checked="" name="size" value="s" type="radio" />
                                    <span class="name">S</span>
                                </label>
                            </li>
                            <li class="size">
                                <label class="size-radio">
                                    <input name="size" value="m" type="radio" />
                                    <span class="name">M</span>
                                </label>
                            </li>
                            <li class="size">
                                <label class="size-radio">
                                    <input name="size" value="l" type="radio" />
                                    <span class="name">L</span>
                                </label>
                            </li>
                            <li class="size">
                                <label class="size-radio">
                                    <input name="size" value="xl" type="radio" />
                                    <span class="name">XL</span>
                                </label>
                            </li>

                        </ul>
                    </div>
                </div> */}
                {/* <div class="SellerRatings">
                    <FontAwesomeIcon icon={faStar} className="Rating" />
                    <FontAwesomeIcon icon={faStar} className="Rating" />
                    <FontAwesomeIcon icon={faStar} className="Rating" />
                    <FontAwesomeIcon icon={faStar} className="Rating" />
                    <FontAwesomeIcon icon={faStar} />
                </div> */}

                <div className="SellerRatings">
                    {[...Array(5)].map((_, i) => (
                        <FontAwesomeIcon
                            key={i}
                            icon={faStar}
                            className={i < averageRating ? 'Rating' : ''}
                        />
                    ))}


                </div>
            </div>

            {edit ? (

                <div className="ProductButton">
                    <button className="BuyButton button" onClick={handleDelete}>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                    <Link className="BuyButton button EditButton" to={`/editProduct/${product._id}`}><FontAwesomeIcon icon={faPenToSquare} /></Link>
                </div>
            ) : (
                // <div className="ProductButton">
                //     <button className="BuyButton button" onClick={openPurchaseForm}>Buy Now</button>
                // </div>

                <></>
            )
            }
            {/* {
                isPurchaseFormOpen && (
                    <PurchaseForm closePurchaseForm={closePurchaseForm} />
                )
            } */}
        </Link >

    )


}

export default ProductCard;