import React, { useState, useEffect } from 'react';

import './Products.css';
import profile from '../../images/Profile.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCommentDots, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import ReviewPopup from '../../components/Review/Review';
import { Link, useLocation } from 'react-router-dom';
import Chat from '../../components/Chat/Chat';
import { useChatState } from "../../context/ChatContext";
import { useChat } from '../../hooks/useChat';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useItemsContext } from '../../hooks/useItemsContext'
import Loader from '../../components/Loader/Loader'
import Proof from '../../components/Proof/Proof';
import { Icon } from '@iconify/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"

const Purchased = ({ languageText, api }) => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [activeSoldFilter, setActiveSoldFilter] = useState('all');
    const [showReviewPopup, setShowReviewPopup] = useState(false);
    const { products = [], transactions = [], users = [], reviews = [], dispatch } = useItemsContext();
    const { user } = useAuthContext()
    const { accessChat, chatError } = useChat(api, toast);
    const [isChatOpen, setChatOpen] = useState(false);

    const [loading, setLoading] = useState(false)
    const [updating, setUpdating] = useState(false)

    const [productLoading, setProductLoading] = useState(false)
    const [userLoading, setUserLoading] = useState(false)
    const [seller, setSeller] = useState(null)
    const [error, setError] = useState(null)
    const [isProofFormOpen, setProofFormOpen] = useState(false);

    const [proofImg, setProofImg] = useState(null)
    const [transactionUser, setTransaction] = useState(null)

    const openProofForm = (transaction) => {
        setTransaction(transaction);
        setProofFormOpen(true);
    };

    const CloseProofForm = () => {
        setProofFormOpen(false);
    };

    const handleFilterClick = (filter) => {
        setActiveFilter(filter);
    };
    const handleSoldFilterClick = (filter) => {
        setActiveSoldFilter(filter);
    };

    const handleReviewButtonClick = (useSeller) => {
        setShowReviewPopup(true);
        setSeller(useSeller)
    };

    const handleCloseReviewPopup = () => {
        setShowReviewPopup(false);
    };



    const openChat = (userSeller) => {
        setSeller(userSeller)
        setChatOpen(true);
        accessChat(userSeller)
        // fetchChats()
    };

    const closeChat = () => {
        setChatOpen(false);
    };


    useEffect(() => {
        const fetchItems = async () => {
            setLoading(true)

            try {

                const response = await fetch(`${api}/api/transactions`, {
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
                    collection: "transactions",
                    payload: json,
                });


                const userResponse = await fetch(`${api}/api/user`, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                if (!userResponse.ok) {
                    console.error(`Error fetching Items. Status: ${userResponse.status}, ${userResponse.statusText}`);
                    setError('Failed to fetch data');

                    return;
                }
                const userJson = await userResponse.json()

                dispatch({
                    type: 'SET_ITEM',
                    collection: "users",
                    payload: userJson,
                });


                const productResponse = await fetch(`${api}/api/products`, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                if (!productResponse.ok) {
                    console.error(`Error fetching Items. Status: ${productResponse.status}, ${productResponse.statusText}`);
                    setError('Failed to fetch data');

                    return;
                }
                const productJson = await productResponse.json()

                dispatch({
                    type: 'SET_ITEM',
                    collection: "products",
                    payload: productJson,
                });




                const reviewsResponse = await fetch(`${api}/api/reviews`, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                if (!reviewsResponse.ok) {
                    console.error(`Error fetching Items. Status: ${reviewsResponse.status}, ${reviewsResponse.statusText}`);
                    setError('Failed to fetch data');

                    return;
                }
                const reviewJson = await reviewsResponse.json()

                dispatch({
                    type: 'SET_ITEM',
                    collection: "reviews",
                    payload: reviewJson,
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
    }, [api, dispatch])







    const boughtFilter = transactions.filter((transaction) => transaction.buyerID === user.userId)
    const soldFilter = transactions.filter((transaction) => transaction.sellerID === user.userId)



    const calculateTotalPrice = () => {
        let totalPriceValue = 0;
        soldFilter.forEach(transaction => {
            const product = products.find(productOne => transaction.productID === productOne._id);
            if (product && product.pPrice) {
                totalPriceValue += product.pPrice;
            }
        });
        return totalPriceValue;
    };

    const totalPrice = calculateTotalPrice();


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const months = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
        const month = months[date.getMonth()];
        const day = date.getDate();
        let hour = date.getHours();
        const minute = date.getMinutes();
        const period = hour >= 12 ? 'PM' : 'AM';
        hour = hour % 12 || 12;

        // return `${month} ${day}, ${hour}:${minute.toString().padStart(2, '0')}${period}`;
        return `${month} ${day}, ${hour}${period}`;
    };








    const handleStatusUpdate = async ({ e, transaction, buyer }) => {
        e.preventDefault();

        const confirmDelete = window.confirm(languageText.AreYouSure + " " + buyer + " " + languageText.PaidForTheProduct);

        if (!confirmDelete) {
            return;
        }
        try {
            setUpdating(true);

            const response = await fetch(`${api}/api/transactions/${transaction._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({
                    transactionStatus: "Paid"
                }),
            });

            if (!response.ok) {
                console.error(`Error updating form status. Status: ${response.status}, ${response.statusText}`);
                return;
            }

            const updatedData = await response.json();
            dispatch({
                type: 'UPDATE_ITEM',
                collection: 'transactions',
                payload: { id: transaction._id, changes: updatedData },
            });

            {
                toast.success("Status Changed Successfully", {
                    position: "bottom-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
            setUpdating(false);


        } catch (error) {
            console.error('An error occurred while updating form status:', error);
        }
    };

    // const handleCheckout = (product) => {
    //     const payload = {
    //         products: [product],  // Wrap product in an array
    //         userId: user.userId,
    //     };

    //     console.log('Payload:', payload);

    //     axios.post(`${api}/api/stripe/create-checkout-session`, payload)
    //         .then((res) => {
    //             if (res.data.url) {
    //                 window.location.href = res.data.url;
    //             }
    //         })
    //         .catch((err) => {
    //             console.error('Error:', err.response?.data || err.message);
    //         });
    // };

    const handleImgChange = (e) => {
        console.log("HELLO2")
        const file = e.target.files[0];

        if (file) {
            setProofImg(file);
            console.log("Hello")
        }
    };



    const PurchasedItem = ({ transaction, index }) => {
        const productFilter = products.find(productOne => transaction.productID === productOne._id)
        const sellerFilter = users.find(seller => transaction.sellerID === seller._id)
        const reviewFilter = reviews.find(review => (transaction.buyerID === review.reviewerID && transaction.sellerID === review.sellerID))
        let productType
        if (productFilter?.pType === "Sell") {
            productType = true
        }
        else {
            productType = false

        }
        if (activeFilter === 'all' || (activeFilter === 'paid' && transaction.transactionStatus === "Paid") || (activeFilter === 'unpaid' && transaction.transactionStatus === "Not Paid") || (activeFilter === 'pending' && transaction.transactionStatus === "Pending")) {
            return (
                <tr className={`PurchasedTitles PurchasedItems`} style={{ marginBottom: transaction.transactionStatus === "Not Paid" ? '20px' : '0' }} key={transaction._id} index={index}>

                    <td>{index + 1}</td>
                    <td className="ProductInfo">
                        <img src={productFilter?.pImage} alt="" />
                        <p>{productFilter?.pTitle}</p>
                    </td>
                    {productFilter?.pType === "Sell" ? <td>{productFilter?.pPrice} RM</td> : <td>{languageText.Donation}</td>}
                    <td>{sellerFilter?.userFname}</td>
                    <td>{sellerFilter?.userPhoneNo}</td>
                    {!reviewFilter ? (
                        <button className="ReviewButton" onClick={() => handleReviewButtonClick(transaction.sellerID)}>
                            <FontAwesomeIcon icon={faStar} />
                        </button>
                    ) : (
                        <b><td>{languageText.LeftReviewAlready}</td></b>
                    )
                    }

                    <td>{formatDate(transaction.createdAt)}</td>
                    <td>{sellerFilter?.userBankAccount}</td>

                    {/* Status */}
                    {productType ?
                        <td className={`statusButton ${transaction.transactionStatus === "Paid" ? "StatusPaid" : "StatusNotPaid"}`}>{transaction.transactionStatus}
                            {transaction.transactionStatus === "Not Paid" && transaction.paymentMethod === "Qr Code" && <Link onClick={() => { window.open(sellerFilter?.userQrImage, "_blank") }} className='PayButton'>{languageText.Pay}</Link>}
                        </td> :
                        <td className='statusButton'>{languageText.Donations}</td>

                    }
                    {productType && (transaction.paymentMethod == "Qr Code" || transaction.paymentMethod == "Transfer") && transaction.transactionStatus == "Not Paid" ? <td>
                        <button className='TableButton' onClick={() => openProofForm(transaction)}>{languageText.Upload}</button>



                    </td> : <td className='statusButton'>{languageText.NoNeed}</td>}
                    {productType ? <td>{transaction.paymentMethod}</td> : <td className='statusButton'>{languageText.Donations}</td>}
                    <button className="PopButton PurchasedChatButton" onClick={() => openChat(transaction.sellerID)}>
                        <span className="ProductToolTip" >{languageText.ChatNow}</span>
                        <span><FontAwesomeIcon icon={faCommentDots} /></span>
                    </button>
                </tr>
            )
        }

        return null;
    }


    const SoldItem = ({ transaction, index }) => {


        const productFilter = products.find(productOne => transaction.productID === productOne._id)
        const buyer = users.find(seller => transaction.buyerID === seller._id)
        const [totalPrice, setTotalPrice] = useState(0);
        let productType
        if (productFilter?.pType === "Sell") {
            productType = true
        }
        else {
            productType = false

        }

        if (activeSoldFilter === 'all' || (activeSoldFilter === 'paid' && transaction.transactionStatus === "Paid") || (activeSoldFilter === 'unpaid' && transaction.transactionStatus === "Not Paid") || (activeSoldFilter === 'pending' && transaction.transactionStatus === "Pending")) {
            return (
                <tr className={`PurchasedTitles PurchasedItems`} style={{ marginBottom: transaction.transactionStatus === "Not Paid" ? '20px' : '0' }} key={transaction._id} index={index}>
                    <td>{index + 1}</td>
                    <td className="ProductInfo">
                        <img src={productFilter?.pImage} alt="" />
                        <p>{productFilter?.pTitle}</p>
                    </td>
                    {productFilter?.pType === "Sell" ? <td>{productFilter?.pPrice} RM</td> : <td>{languageText.Donation}</td>}
                    <td>{buyer.userFname}</td>
                    <td>{buyer.userPhoneNo}</td>


                    <td>{formatDate(transaction.createdAt)}</td>
                    {productType ?
                        <td>
                            {transaction.transactionStatus === "Pending" ? (
                                <button onClick={() => { window.open(transaction?.proof, "_blank") }} className='TableButton'>
                                    {languageText.View}
                                </button>
                            ) : transaction.transactionStatus === "Paid" ? (
                                "Paid"
                            ) : (
                                languageText.DidntUploadYet
                            )}
                        </td> :
                        <td className='statusButton'>{languageText.Donations}</td>

                    }



                    {productType ? <td className={`statusButton ${transaction.transactionStatus === "Paid" ? "StatusPaid" : "StatusNotPaid"}`}>{transaction.transactionStatus}</td> : <td className='statusButton'>{languageText.Donations}</td>}

                    {productType ? <td className='statusButton'>{transaction.paymentMethod}
                        {(transaction.transactionStatus === "Not Paid" || transaction.transactionStatus === "Pending") && <Link onClick={(e) => handleStatusUpdate({ e, transaction, buyer: buyer.userFname })} className='PayButton ConfirmButton'>{languageText.Confirm}</Link>}</td> :
                        <td className='statusButton'>{languageText.Donations}</td>}
                    <button className="PopButton PurchasedChatButton" onClick={() => openChat(transaction.buyerID)}>
                        <span className="ProductToolTip" >{languageText.ChatNow}</span>
                        <span><FontAwesomeIcon icon={faCommentDots} /></span>
                    </button>
                </tr>
            )


        }
        return null;

    }



    return (

        <div className="Browse">

            {(loading || productLoading || userLoading) ? (
                <div className="Loader">
                    <Loader />
                    <p className="LoaderText">{languageText.Loading}</p>
                </div>
            ) : (<>
                <div className="PurchasedProducts">
                    <h2>{languageText.PurchasedProducts}</h2>
                    <div className="PurchasedFilter">
                        <button
                            className={`FilterButton ${activeFilter === 'all' ? 'active' : ''}`}
                            onClick={() => handleFilterClick('all')}
                        >
                            {languageText.AllProducts}
                        </button>
                        <button
                            className={`FilterButton ${activeFilter === 'paid' ? 'active' : ''}`}
                            onClick={() => handleFilterClick('paid')}
                        >{languageText.Paid}
                        </button>
                        <button
                            className={`FilterButton ${activeFilter === 'unpaid' ? 'active' : ''}`}
                            onClick={() => handleFilterClick('unpaid')}
                        >
                            {languageText.Unpaid}
                        </button>
                        <button
                            className={`FilterButton ${activeFilter === 'pending' ? 'active' : ''}`}
                            onClick={() => handleFilterClick('pending')}
                        >
                            {languageText.Pending}
                        </button>
                    </div>
                    <div className="TableContainer">
                        <table >
                            <tr className="PurchasedTitles">
                                <th>{languageText.Id}</th>
                                <th>{languageText.ProductName}</th>
                                <th>{languageText.Price}</th>
                                <th>{languageText.SellerName}</th>
                                <th>{languageText.SellerPhone}</th>
                                <th>{languageText.Review}</th>
                                <th>{languageText.Date}</th>
                                <th>{languageText.BankAccount}</th>
                                <th>{languageText.Status}</th>
                                <th>{languageText.Proof} (PNG)</th>
                                <th>{languageText.Method}</th>
                            </tr>
                            {/* <p>Method</p> */}

                            <div className='ProductColumn'>
                                {boughtFilter && boughtFilter.map((transaction, index) => (
                                    <PurchasedItem transaction={transaction} index={index} />
                                ))}
                            </div>

                        </table>
                        {
                            isProofFormOpen && (

                                <Proof CloseProofForm={CloseProofForm} transaction={transactionUser} languageText={languageText} api={api} />
                            )
                        }
                    </div>
                    {/* {isChatOpen && <Chat onClose={closeChat} languageText={languageText} />} */}

                </div>




                <div className="PurchasedProducts SoldProducts">
                    <h2>{languageText.SoldProducts}</h2>
                    <div className="PurchasedFilter">
                        <button
                            className={`FilterButton ${activeSoldFilter === 'all' ? 'active' : ''}`}
                            onClick={() => handleSoldFilterClick('all')}
                        >
                            {languageText.AllProducts}
                        </button>
                        <button
                            className={`FilterButton ${activeSoldFilter === 'paid' ? 'active' : ''}`}
                            onClick={() => handleSoldFilterClick('paid')}
                        >
                            {languageText.Paid}
                        </button>
                        <button
                            className={`FilterButton ${activeSoldFilter === 'unpaid' ? 'active' : ''}`}
                            onClick={() => handleSoldFilterClick('unpaid')}
                        >
                            {languageText.Unpaid}
                        </button>
                        <button
                            className={`FilterButton ${activeFilter === 'pending' ? 'active' : ''}`}
                            onClick={() => handleSoldFilterClick('pending')}
                        >
                            {languageText.Pending}
                        </button>
                    </div>
                    <div className="SoldTable">
                        <table >
                            <tr className="PurchasedTitles">
                                <th>{languageText.Id}</th>
                                <th>{languageText.ProductName}</th>
                                <th>{languageText.Price}</th>
                                <th>{languageText.BuyerName}</th>
                                <th>{languageText.BuyerPhone}</th>
                                <th>{languageText.Date}</th>
                                <th>{languageText.Proof}</th>
                                <th>{languageText.Status}</th>
                                <th>{languageText.Method}</th>
                            </tr>
                            {/* <p>Method</p> */}

                            {updating ? (
                                <div className="Loader">
                                    <Loader />
                                    <p className="LoaderText">Updating</p>
                                </div>
                            ) : (
                                <div className='ProductColumn'>
                                    {soldFilter && soldFilter.map((transaction, index) => (
                                        <SoldItem transaction={transaction} index={index} />
                                    ))}

                                </div>
                            )}

                        </table>
                        {soldFilter.length > 0 && <div className="TotalPrice">
                            <p>{languageText.Total}</p>
                            {totalPrice ? <div className="Total">{languageText.RM} {totalPrice}</div> : <div className="Total">{languageText.RM} 0</div>}
                        </div>}

                        {showReviewPopup && (
                            <ReviewPopup
                                onClose={handleCloseReviewPopup}
                                // onSubmit={handleReviewSubmit}
                                showReviewPopup={showReviewPopup}
                                languageText={languageText}
                                userSeller={seller}
                                api={api}
                            />
                        )}


                        {isChatOpen && <Chat onClose={closeChat} languageText={languageText} userSeller={seller} api={api} />}

                        {/* {isChatOpen && <Chat onClose={closeChat} languageText={languageText} />} */}

                    </div>
                </div>
            </>
            )}
        </div>
    );
};

export default Purchased;
