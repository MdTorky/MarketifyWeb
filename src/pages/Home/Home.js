import NavbarLayout from "../../layouts/NavbarLayout";
import "./Home.css"
import img1 from '../../images/HomeImg.png'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faComment, faStar } from '@fortawesome/free-solid-svg-icons';
const Home = () => {
    return (
        <div className="Home">
            <div className="Hero">
                <div className="HeroText">
                    <h3>BUY - SELL - BENEFIT</h3>
                    <h1 className="anim">Shop With US</h1>
                    <Link to="/SignUp" className="HeroButton">Shop Now</Link>
                </div>
                <div className="HeroImg">
                    <img src={img1} alt="" />
                </div>
            </div>
            <h2 className="HomeTitle">Our Services</h2>
            <div className="Services">
                <div className="SCard">
                    <FontAwesomeIcon icon={faComment} className="SIcon" />
                    <div className="SCardText">
                        <div className="STitle">CHAT</div>
                        <hr />
                        <div className="SDescription">Chat with the seller about any product</div>
                    </div>
                </div>
                <div className="SCard">
                    <FontAwesomeIcon icon={faStar} className="SIcon" />
                    <div className="SCardText">
                        <div className="STitle">Review</div>
                        <hr />
                        <div className="SDescription">Leave a review for the seller</div>
                    </div>
                </div>
                <div className="SCard">
                    <FontAwesomeIcon icon={faBell} className="SIcon" />
                    <div className="SCardText">
                        <div className="STitle">Notification</div>
                        <hr />
                        <div className="SDescription">View all the notifications received</div>
                    </div>
                </div>
            </div>

            <h2 className="HomeTitle">Categories</h2>

            <div className="Banners">

                <div className="Banner1">
                    <div class="banner-box">
                        <h4>Wear clothes that tell a real story.</h4>
                        <h2>CLOTHING</h2>
                    </div>

                    <div class="banner-box banner-box2">
                        <h4>A satisfied customer is the best business strategy.</h4>
                        <h2>APPLIANCES</h2>
                    </div>
                </div>

                <div className="Banner2">
                    <div class="banner-box">
                        <h4>Success is the sum of small efforts, repeated day in and day out.</h4>
                        <h2>STUDY MATERIALS</h2>
                    </div>

                    <div class="banner-box banner-box2">
                        <h4>Good food is the foundation of happiness.</h4>
                        <h2>FOOD</h2>
                    </div>

                    <div class="banner-box banner-box3">
                        <h4>Ambition is the path to success. Persistence is the vehicle you arrive in.</h4>
                        <h2>VEHICLES</h2>
                    </div>
                </div>
            </div>

            <div className="EmailUs">

                <div className="newstext">
                    <h4>General Inquiries</h4>
                    <p>Email Us for any inquiries</p>
                </div>



                <button
                    className="normal"
                    onClick={() => {
                        window.open("mailto:marketify.utm@gmail.com", "_blank");
                    }}
                >Email Us</button>


            </div>
        </div>
    );
}

export default Home;