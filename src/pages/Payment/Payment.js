import './Payment.css'
import Visa from '../../images/visa.png'
import Chip from '../../images/chip.png'
import { useEffect } from 'react'
const Payment = ({ languageText }) => {



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
                                {/* <span > | </span> */}
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
                <input type="submit" value="submit" class="submit-btn" name="submit2" />
            </form>
        </div>

    );
}

export default Payment;