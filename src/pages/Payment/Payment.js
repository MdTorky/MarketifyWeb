import './Payment.css'
import Visa from '../../images/visa.png'
import Chip from '../../images/chip.png'
import { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom';
import { useChatState } from "../../context/ChatContext";
import { useAuthContext } from '../../hooks/useAuthContext';
import { useItemsContext } from '../../hooks/useItemsContext'
import Loader from '../../components/Loader/Loader'
import { Icon } from '@iconify/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"

import { loadStripe } from "@stripe/stripe-js"
const Payment = ({ languageText, api }) => {
    const { id } = useParams();
    const [transactionData, setTransactionData] = useState();
    const { products = [], transactions = [], users = [], dispatch } = useItemsContext();
    const { user } = useAuthContext()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        const fetchItems = async () => {
            setLoading(true)

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

                setTransactionData(data)
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


    // const makePayment = async () => {
    //     const stripe = await loadStripe(process.env.REACT_STRIPE_KEY)
    //     const body = {
    //         products: transactionData
    //     }
    //     const headers = {
    //         "Content-Type": "application/json"
    //     }

    //     const response = await fetch(`${api}/api/create-checkout-session`, {
    //         method: "POST",
    //         headers: headers,
    //         body: JSON.stringify(body)
    //     })

    //     const session = await response.json()
    //     const result = stripe.redirectToCheckout({
    //         sessionId: session._id
    //     })

    //     if (result.error) {
    //         console.log(result.error)
    //     }
    // }

    const handleCheckout = () => {
        // alert(JSON.stringify(transactionData))

        axios.post(`${api}/api/stripe/create-checkout-session`, {
            products: transactionData,
            userId: user.userId,
        }).then((res) => {
            if (res.data.url) {
                window.location.href = res.data.url
            }

        }).catch((err) => { console.log(err.message) })
    }

    useEffect(() => {
        document.querySelector('.card-number-input').oninput = () => {
            document.querySelector('.VisaCardBoxNo').innerText = document.querySelector('.card-number-input').value;
        }
        document.querySelector('.VisaCardBoxNo')

        document.querySelector('.card-holder-input').oninput = () => {
            document.querySelector('.CardName').innerText = document.querySelector('.card-holder-input').value;
        }
        document.querySelector('.month-input').oninput = () => {
            document.querySelector('.CardMonth').innerText = document.querySelector('.month-input').value;
        }

        document.querySelector('.year-input').oninput = () => {
            document.querySelector('.CardYear').innerText = document.querySelector('.year-input').value;
        }
        document.querySelector('.cvv-input').onmouseenter = () => {
            document.querySelector('.VisaCardFront').style.transform = 'perspective(1000px) rotateY(-180deg)';
            document.querySelector('.VisaCardBack').style.transform = 'perspective(1000px) rotateY(0deg)';
        }
        document.querySelector('.cvv-input').onmouseleave = () => {
            document.querySelector('.VisaCardFront').style.transform = 'perspective(1000px) rotateY(0deg)';
            document.querySelector('.VisaCardBack').style.transform = 'perspective(1000px) rotateY(180deg)';
        }
        document.querySelector('.cvv-input').oninput = () => {
            document.querySelector('.CardCVV').innerText = document.querySelector('.cvv-input').value;
        }
    }, []);


    return (
        <div className="Payment">
            <div class="PaymentCardContainer">
                <div class="VisaCardFront">
                    <div class="VisaCardImage">
                        <img src={Visa} alt="" />
                        <img src={Chip} alt="" class="visa" />
                    </div>
                    <div class="VisaCardBoxNo">################</div>
                    <div class="VisaCardDetails">
                        <div class="VisaCardBox">
                            <span>{languageText.CardHolder}</span>
                            <div class="CardName">{languageText.FullName}</div>
                        </div>
                        <div class="VisaCardBox">
                            <span>Expires</span>
                            <div class="VisaCardExpiration">
                                <span class="CardMonth">mm</span>
                                <span > | </span>
                                <span class="CardYear">yy</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="VisaCardBack">
                    <div class="VisaCardStripe"></div>
                    <div class="VisaCardBox">
                        <span>cvv</span>
                        <div class="CardCVV"></div>
                        {/* <img src="image/visa.png" alt="" /> */}
                    </div>
                </div>
            </div>

            <form action="" method="post">
                <div class="PaymentInput">

                    <span>{languageText.CardNumber}</span>

                    <input type="number" maxlength="16" class="card-number-input" required />
                </div>
                {/* <h1>{transactionData.pTitle}</h1> */}

                <div class="PaymentInput">
                    <span>{languageText.CardHolderName}</span>
                    <input type="text" class="card-holder-input" required />
                </div>
                <div class="PaymentInput">
                    <span>{languageText.CardHolderEmail}</span>
                    <input type="text" class="card-holder-input" required />
                </div>
                <div class="flexbox">
                    <div class="PaymentInput">
                        <span>{languageText.Expiration} mm</span>
                        <select name="" id="" class="month-input">
                            <option value="month" selected disabled>{languageText.Month}</option>
                            <option value="01">01</option>
                            <option value="02">02</option>
                            <option value="03">03</option>
                            <option value="04">04</option>
                            <option value="05">05</option>
                            <option value="06">06</option>
                            <option value="07">07</option>
                            <option value="08">08</option>
                            <option value="09">09</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                        </select>
                    </div>
                    <div class="PaymentInput">
                        <span>{languageText.Expiration} yy</span>
                        <select name="" id="" class="year-input">
                            <option value="year" selected disabled>{languageText.Year}</option>
                            <option value="2025">2025</option>
                            <option value="2026">2026</option>
                            <option value="2027">2027</option>
                            <option value="2028">2028</option>
                            <option value="2029">2029</option>
                            <option value="2030">2030</option>
                        </select>
                        <input type="hidden" name="productID" />
                    </div>
                    <div class="PaymentInput">
                        <span>{languageText.CVV}</span>
                        <input type="text" maxlength="3" class="cvv-input" />
                    </div>
                </div>
                <input type="submit" value="submit" class="submit-btn" name="submit2" onClick={() => handleCheckout()} />
            </form>
        </div>

    );
}

export default Payment;