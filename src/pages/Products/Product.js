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

const Product = ({ api, languageText }) => {
    const { id } = useParams();
    const { products = [], dispatch } = useItemsContext();
    const [productData, setProductData] = useState(null);

    const [isChatOpen, setChatOpen] = useState(false);
    const [isPurchaseFormOpen, setPurchaseFormOpen] = useState(false);

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)

    const openChat = () => {
        setChatOpen(true);
    };

    const closeChat = () => {
        setChatOpen(false);
    };

    const openPurchaseForm = () => {
        setPurchaseFormOpen(true);
    };

    const closePurchaseForm = () => {
        setPurchaseFormOpen(false);
    };



    useEffect(() => {
        // Fetch form data based on type and formId
        const fetchData = async () => {
            try {
                const response = await fetch(`${api}/api/products/${id}`);
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

            } catch (error) {
                console.error('An error occurred while fetching form data:', error);
            } finally {
                // Set loading to false once the data is fetched (success or error)
                setLoading(false);
            }
        };

        fetchData();
    }, [api, dispatch, id]);


    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch(`${api}/api/products`)
                if (!response.ok) {
                    console.error(`Error fetching Items. Status: ${response.status}, ${response.statusText}`);
                    setError('Failed to fetch data');
                    return;
                }
                const json = await response.json();
                console.log("Fetched products:", json); // Log the fetched products
                dispatch({
                    type: 'SET_ITEM',
                    collection: "products",
                    payload: json,
                });
                setLoading(false);
            } catch (error) {
                console.error('An error occurred while fetching data:', error);
                setError('An error occurred while fetching data');
            }
        };

        fetchItems();
    }, []);



    // const recommendations = productData ? products.filter(product => product.pCategories.includes(productData.pCategories[0])) : [];
    // const recommendations = productData ? products.filter(product => productData.pCategory && productData.pCategory.length > 0 && product.pCategory.includes(productData.pCategory[0]) && product._id != productData._id) : [];
    const recommendations = productData ? products.filter(product => productData.pCategory && productData.pCategory.length > 0 && product.pCategory.includes(productData.pCategory[0]) && product._id !== productData._id).slice(0, 6) : [];


    return (
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
                                <div class="SellerRatings">
                                    <FontAwesomeIcon icon={faStar} className="Rating" />
                                    <FontAwesomeIcon icon={faStar} className="Rating" />
                                    <FontAwesomeIcon icon={faStar} className="Rating" />
                                    <FontAwesomeIcon icon={faStar} className="Rating" />
                                    <FontAwesomeIcon icon={faStar} />
                                </div>
                                <p className="ProductDescription">{productData?.pDescription}</p>

                                {/* <div className="ProductInfo"><span className="ProductTitle">Price: </span> 42.21 RM</div> */}
                            </div>
                        </div>
                        <div className="ProductRight">
                            <p className="ProductRecommendationTitle">{languageText.Recommendations}</p>
                            <div className="ProductRecommendation">
                                {recommendations.map(product => (
                                    <ProductCard key={product._id} edit={false} product={product} />
                                ))}
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
                            <button className="PopButton" onClick={openChat}>
                                <span className="ProductToolTip" >{languageText.ChatNow}</span>
                                <span><FontAwesomeIcon icon={faCommentDots} /></span>
                            </button>
                            {/* <button className="ChatPopButton"><FontAwesomeIcon icon={faCommentDots} /></button> */}

                            <Link className="PopButton ProductBuyButton" onClick={openPurchaseForm}>
                                <span className="ProductToolTip ProductTip" >{languageText.BuyNow}</span>
                                <span><FontAwesomeIcon icon={faMoneyBill} /></span>
                            </Link>


                            {/* <Link to="/" className="ProductPopButton"><FontAwesomeIcon icon={faMoneyBill} /></Link> */}
                        </div>
                    </div>
                    {isChatOpen && <Chat onClose={closeChat} languageText={languageText} />}
                    {isPurchaseFormOpen && (

                        <PurchaseForm closePurchaseForm={closePurchaseForm} />
                    )}
                </>
            )}
        </div>
    );
}

export default Product;