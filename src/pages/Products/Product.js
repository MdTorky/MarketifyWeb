import './Products.css'
import React, { useState, useEffect } from 'react';
import logo from '../../images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faStar, faCommentDots, faMoneyBill, faEnvelope, faPhone, faAddressBook, faLocation, faLocationPin, faLocationDot, faClose } from '@fortawesome/free-solid-svg-icons';
import ProductCard from '../../components/ProductCard/ProductCard';
import Chat from '../../components/Chat/Chat';
import { Link, useLocation, useParams } from 'react-router-dom';
import PurchaseForm from '../../components/PurhcaseForm/PurchaseForm';
import { useItemsContext } from '../../hooks/useItemsContext'
import Loader from '../../components/Loader/Loader'
import { useAuthContext } from '../../hooks/useAuthContext';
import { useChat } from '../../hooks/useChat';
import { Icon } from '@iconify/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useChatState } from "../../context/ChatContext";
import axios from 'axios';


const Product = ({ api, languageText }) => {
    const { id } = useParams();
    const { products = [], reviews = [], dispatch } = useItemsContext();
    const [productData, setProductData] = useState(null);

    const [isChatOpen, setChatOpen] = useState(false);
    const [isPurchaseFormOpen, setPurchaseFormOpen] = useState(false);

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)
    const [reviewLoading, setReviewLoading] = useState(false)
    // const { user, selectedChat, setSelectedChat, chats, setChats } = useAuthContext()
    const { user } = useAuthContext()
    const [averageRating, setAverageRating] = useState(0);


    const [userTwoError, setUserTwoError] = useState(null);
    const [product, setProduct] = useState(null);
    const { accessChat, chatError } = useChat(api, toast);

    const {
        setSelectedChat,
        notification,
        setNotification,
        chats,
        setChats,
    } = useChatState();

    const openChat = (userSeller) => {
        setUserTwoError(userSeller)
        setChatOpen(true);
        accessChat(userSeller)
        // fetchChats()
    };

    const closeChat = () => {
        setChatOpen(false);
    };

    const openPurchaseForm = (product) => {
        setPurchaseFormOpen(true);
        setProduct(product)

    };

    const closePurchaseForm = () => {
        setPurchaseFormOpen(false);
    };





    useEffect(() => {

        // Fetch form data based on type and formId
        const fetchData = async () => {
            try {
                const response = await fetch(`${api}/api/products/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                if (!response.ok) {
                    console.error(`Error fetching form data. Status: ${response.status}, ${response.statusText}`);
                    return;
                }

                const data = await response.json();
                dispatch({
                    type: 'GET_ITEM',
                    collection: "products",
                    payload: data,
                });
                setProductData(data);

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
                const reviewFilter = reviewJson.filter((review) => review.sellerID === productData.userID);


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
    }, [api, id, dispatch, user, productData]);



    useEffect(() => {
        const fetchItems = async () => {

            try {

                const response = await fetch(`${api}/api/products`, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                if (!response.ok) {
                    console.error(`Error fetching Items. Status: ${response.status}, ${response.statusText}`);
                    setError('Failed to fetch data');

                    return;
                }
                const json = await response.json()

                dispatch({
                    type: 'SET_ITEM',
                    collection: "products",
                    payload: json,
                });
                setLoading(false)


            } catch (error) {
                console.error('An error occurred while fetching data:', error);
                setError('An error occurred while fetching data');

            }
        };

        if (user) {
            fetchItems()
        }

    }, [dispatch, user])


    // const recommendations = productData ? products.filter(product => product.pCategories.includes(productData.pCategories[0])) : [];
    // const recommendations = productData ? products.filter(product => productData.pCategory && productData.pCategory.length > 0 && product.pCategory.includes(productData.pCategory[0]) && product._id != productData._id) : [];
    const recommendations = productData ? products.filter(product => productData.pCategory && productData.pCategory.length > 0 && product.pCategory.includes(productData.pCategory[0]) && product._id !== productData._id).slice(0, 6) : [];



    return (
        user && (
            <div className="Product">
                {loading ? (
                    <div className="Loader">
                        <Loader />
                        <p className="LoaderText">{languageText.Loading}</p>
                    </div>
                ) : (
                    <>
                        <div className="ProductBackground">

                            <div className="ProductTop">
                                <div className="ProductLeft">
                                    <div className="ProductImg">
                                        <img src={productData?.pImage} alt="" />
                                    </div>
                                </div>
                                <div className="ProductDetails">
                                    <Link className="BackButton" to="/browse">
                                        <FontAwesomeIcon icon={faArrowLeft} />
                                        <p>{languageText.BackProducts}</p>
                                    </Link>
                                    <h3 className="ProductCondition">{productData?.pCondition}</h3>
                                    <h2 className="ProductName">{productData?.pTitle}</h2>
                                    <div className="SellerRatings">
                                        {[...Array(5)].map((_, i) => (
                                            <FontAwesomeIcon
                                                key={i}
                                                icon={faStar}
                                                className={i < averageRating ? 'Rating' : ''}
                                            />
                                        ))}
                                    </div>
                                    <p className="ProductDescription">{productData?.pDescription}</p>

                                    {/* <div className="ProductInfo"><span className="ProductTitle">Price: </span> 42.21 RM</div> */}
                                </div>
                            </div>
                            <div className="ProductRight">
                                <p className="ProductRecommendationTitle">{languageText.Recommendations}</p>
                                <div className="ProductRecommendation">
                                    {recommendations.map(product => (
                                        <ProductCard key={product._id} edit={false} product={product} languageText={languageText} api={api} />
                                    ))}
                                    {recommendations.length <= 0 &&
                                        <div className="NoProductsContainer">
                                            <p><Icon icon="ant-design:dislike-twotone" />{languageText.NoRecommendations}</p>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>


                        <div className="ProductPop">
                            <div className="ProductPopLeft">
                                <img src={productData?.pImage} alt="" />
                                <div className="ProductPopText">
                                    <h2 className="ProductName">{productData?.pTitle}</h2>
                                    <p className="ProductDescription">{productData?.pDescription}</p>
                                </div>
                            </div>
                            <div className="ProductPopRight">
                                {productData?.pPrice ? <p className="ProductPrice">{productData?.pPrice}{languageText.RM}</p> : <p className="ProductPrice">Donation</p>}
                                <button className="PopButton" onClick={() => openChat(productData.userID)}>
                                    <span className="ProductToolTip" >{languageText.ChatNow}</span>
                                    <span><FontAwesomeIcon icon={faCommentDots} /></span>
                                </button>
                                {/* <button className="ChatPopButton"><FontAwesomeIcon icon={faCommentDots} /></button> */}

                                <Link className="PopButton ProductBuyButton" onClick={() => openPurchaseForm(productData)}>
                                    <span className="ProductToolTip ProductTip" >{languageText.BuyNow}</span>
                                    <span><FontAwesomeIcon icon={faMoneyBill} /></span>
                                </Link>


                                {/* <Link to="/" className="ProductPopButton"><FontAwesomeIcon icon={faMoneyBill} /></Link> */}
                            </div>
                        </div>
                        {isChatOpen && <Chat onClose={closeChat} languageText={languageText} userSeller={userTwoError} api={api} />}
                        {isPurchaseFormOpen && (

                            <PurchaseForm closePurchaseForm={closePurchaseForm} languageText={languageText} product={product} api={api} />
                        )}
                    </>
                )}
            </div>
        )
    );
}

export default Product;