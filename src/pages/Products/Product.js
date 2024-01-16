import './Products.css'
import React, { useState } from 'react';
import logo from '../../images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faStar, faCommentDots, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import productCard from '../../components/ProductCard/ProductCard';
import Chat from '../../components/Chat/Chat';
import { Link, useLocation } from 'react-router-dom';

const Product = () => {

    const [isChatOpen, setChatOpen] = useState(false);
    const openChat = () => {
        setChatOpen(true);
    };

    const closeChat = () => {
        setChatOpen(false);
    };

    return (
        <div className="Product">
            <div className="ProductTop">
                <div className="ProductLeft">
                    <div className="ProductImg">
                        <img src={logo} alt="" />
                    </div>
                </div>
                <div className="ProductDetails">
                    <Link className="BackButton" to="/browse">
                        <FontAwesomeIcon icon={faArrowLeft} />
                        <p>Back to all products</p>
                    </Link>
                    <h3 className="ProductCondition">Condition</h3>
                    <h2 className="ProductName">Title</h2>
                    <div class="SellerRatings">
                        <FontAwesomeIcon icon={faStar} className="Rating" />
                        <FontAwesomeIcon icon={faStar} className="Rating" />
                        <FontAwesomeIcon icon={faStar} className="Rating" />
                        <FontAwesomeIcon icon={faStar} className="Rating" />
                        <FontAwesomeIcon icon={faStar} />
                    </div>
                    <p className="ProductDescription">Description</p>

                    {/* <div className="ProductInfo"><span className="ProductTitle">Price: </span> 42.21 RM</div> */}
                </div>
            </div>
            <div className="ProductRight">
                <p className="ProductRecommendationTitle">Recommendation</p>
                <div className="ProductRecommendation">
                    {productCard()}
                    {productCard()}
                    {productCard()}
                    {productCard()}
                    {productCard()}
                    {productCard()}
                </div>
            </div>

            <div className="ProductPop">
                <div className="ProductPopLeft">
                    <img src={logo} alt="" />
                    <div className="ProductPopText">
                        <h2 className="ProductName">Title</h2>
                        <p className="ProductDescription">Description</p>
                    </div>
                </div>
                <div className="ProductPopRight">
                    <p className="ProductPrice">43RM</p>
                    <button className="PopButton" onClick={openChat}>
                        <span className="ProductToolTip" >Chat Now</span>
                        <span><FontAwesomeIcon icon={faCommentDots} /></span>
                    </button>
                    {/* <button className="ChatPopButton"><FontAwesomeIcon icon={faCommentDots} /></button> */}

                    <Link className="PopButton ProductBuyButton" to="/">
                        <span className="ProductToolTip ProductTip" >Buy Now</span>
                        <span><FontAwesomeIcon icon={faMoneyBill} /></span>
                    </Link>
                    {/* <Link to="/" className="ProductPopButton"><FontAwesomeIcon icon={faMoneyBill} /></Link> */}
                </div>
            </div>
            {isChatOpen && <Chat onClose={closeChat} />}
        </div>
    );
}

export default Product;