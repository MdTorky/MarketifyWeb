import React, { useState } from 'react';
import './Products.css';
import profile from '../../images/Profile.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCommentDots, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import ReviewPopup from '../../components/Review/Review';
import { Link, useLocation } from 'react-router-dom';
import Chat from '../../components/Chat/Chat';

const Purchased = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [activeSoldFilter, setActiveSoldFilter] = useState('all');
    const [showReviewPopup, setShowReviewPopup] = useState(false); // Add this state
    const [paymentType, setPaymentType] = useState("Cash"); // Add this state
    // const [status, setStatus] = useState(''); // Add this state

    const handleFilterClick = (filter) => {
        setActiveFilter(filter);
    };
    const handleSoldFilterClick = (filter) => {
        setActiveSoldFilter(filter);
    };

    const handleReviewButtonClick = () => {
        setShowReviewPopup(true);
    };

    const handleCloseReviewPopup = () => {
        setShowReviewPopup(false);
    };

    const handleReviewSubmit = (reviewData) => {
        // Handle the review submission logic (e.g., send to the server)
        console.log('Review submitted:', reviewData);
        handleCloseReviewPopup();
    };


    const [isChatOpen, setChatOpen] = useState(false);
    const openChat = () => {
        setChatOpen(true);
    };

    const closeChat = () => {
        setChatOpen(false);
    };

    const PurchasedItem = ({ status }) => {


        if (activeFilter === 'all' || (activeFilter === 'paid' && status) || (activeFilter === 'unpaid' && !status)) {
            return (
                <tr className={`PurchasedTitles PurchasedItems`} style={{ marginBottom: !status ? '20px' : '0' }}>
                    <td>#21</td>
                    <td className="ProductInfo">
                        <img src={profile} alt="" />
                        <p>Bike</p>
                    </td>
                    <td>20RM</td>
                    <td>Mohamed</td>
                    <td>+201554206775</td>
                    <button className="ReviewButton" onClick={handleReviewButtonClick}>
                        <FontAwesomeIcon icon={faStar} />
                    </button>

                    <td>21 Jan</td>
                    <td className={`statusButton ${status ? "StatusPaid" : "StatusNotPaid"}`}>{`${status ? "Paid" : "Not Paid"}`}

                        {!status && <Link to="/payment" className='PayButton'>Pay</Link>}</td>

                    <td>Cash</td>
                    <button className="PopButton PurchasedChatButton" onClick={openChat}>
                        <span className="ProductToolTip" >Chat Now</span>
                        <span><FontAwesomeIcon icon={faCommentDots} /></span>
                    </button>
                </tr>
            )
        }
        return null;
    }


    const SoldItem = ({ status, PaymentType }) => {


        if (activeSoldFilter === 'all' || (activeSoldFilter === 'paid' && status) || (activeSoldFilter === 'unpaid' && !status)) {
            return (
                <tr className={`PurchasedTitles PurchasedItems`} style={{ marginBottom: !status ? '20px' : '0' }}>
                    <td>#21</td>
                    <td className="ProductInfo">
                        <img src={profile} alt="" />
                        <p>Bike</p>
                    </td>
                    <td>20RM</td>
                    <td>Mohamed</td>
                    <td>+201554206775</td>
                    {/* <button className="ReviewButton" onClick={handleReviewButtonClick}>
                        <FontAwesomeIcon icon={faStar} />
                    </button> */}

                    <td>21 Jan</td>
                    <td className={`statusButton ${status ? "StatusPaid" : "StatusNotPaid"}`}>{`${status ? "Paid" : "Not Paid"}`}

                        {/* {!status && <Link to="/payment" className='PayButton'>Pay</Link>} */}
                    </td>

                    <td className='statusButton'>{PaymentType}

                        {PaymentType === "Cash" && !status && <Link to="/payment" className='PayButton ConfirmButton'>Confirm</Link>}


                    </td>
                    <button className="PopButton PurchasedChatButton" onClick={openChat}>
                        <span className="ProductToolTip" >Chat Now</span>
                        <span><FontAwesomeIcon icon={faCommentDots} /></span>
                    </button>
                </tr>
            )
        }
        return null;
    }

    return (
        <div className="Browse">
            <div className="PurchasedProducts">
                <h2>Purchased Products</h2>
                <div className="PurchasedFilter">
                    <button
                        className={`FilterButton ${activeFilter === 'all' ? 'active' : ''}`}
                        onClick={() => handleFilterClick('all')}
                    >
                        All Products
                    </button>
                    <button
                        className={`FilterButton ${activeFilter === 'paid' ? 'active' : ''}`}
                        onClick={() => handleFilterClick('paid')}
                    >
                        Paid
                    </button>
                    <button
                        className={`FilterButton ${activeFilter === 'unpaid' ? 'active' : ''}`}
                        onClick={() => handleFilterClick('unpaid')}
                    >
                        Unpaid
                    </button>
                </div>
                <table >
                    <tr className="PurchasedTitles">
                        <th>Id</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Seller Name</th>
                        <th>Seller Phone</th>
                        <th>Review</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Method</th>
                    </tr>
                    {/* <p>Method</p> */}

                    <div className='ProductColumn'>
                        {PurchasedItem({ status: false })}
                        {PurchasedItem({ status: true })}
                    </div>
                </table>
                {showReviewPopup && (
                    <ReviewPopup
                        onClose={handleCloseReviewPopup}
                        onSubmit={handleReviewSubmit}
                        showReviewPopup={showReviewPopup}
                    />
                )}
                {isChatOpen && <Chat onClose={closeChat} />}

            </div>




            <div className="PurchasedProducts SoldProducts">
                <h2>Sold Products</h2>
                <div className="PurchasedFilter">
                    <button
                        className={`FilterButton ${activeSoldFilter === 'all' ? 'active' : ''}`}
                        onClick={() => handleSoldFilterClick('all')}
                    >
                        All Products
                    </button>
                    <button
                        className={`FilterButton ${activeSoldFilter === 'paid' ? 'active' : ''}`}
                        onClick={() => handleSoldFilterClick('paid')}
                    >
                        Paid
                    </button>
                    <button
                        className={`FilterButton ${activeSoldFilter === 'unpaid' ? 'active' : ''}`}
                        onClick={() => handleSoldFilterClick('unpaid')}
                    >
                        Unpaid
                    </button>
                </div>
                <div className="SoldTable">
                    <table >
                        <tr className="PurchasedTitles">
                            <th>Id</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Buyer Name</th>
                            <th>Buyer Phone</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Method</th>
                        </tr>
                        {/* <p>Method</p> */}

                        <div className='ProductColumn'>
                            {SoldItem({ status: false, PaymentType: "Cash" })}
                            {SoldItem({ status: true, PaymentType: "Credit Card" })}
                        </div>
                    </table>
                    <div className="TotalPrice">
                        <p>Total</p>
                        <div className="Total">RM 31</div>
                    </div>
                    {showReviewPopup && (
                        <ReviewPopup
                            onClose={handleCloseReviewPopup}
                            onSubmit={handleReviewSubmit}
                            showReviewPopup={showReviewPopup}
                        />
                    )}
                    {isChatOpen && <Chat onClose={closeChat} />}

                </div>
            </div>
        </div>
    );
};

export default Purchased;
