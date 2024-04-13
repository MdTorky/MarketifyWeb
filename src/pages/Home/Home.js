import NavbarLayout from "../../layouts/NavbarLayout";
import "./Home.css"
import img1 from '../../images/HomeImg.png'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faComment, faStar } from '@fortawesome/free-solid-svg-icons';
const Home = ({ languageText }) => {
    return (
        <div className="Home">
            <div className="Hero">
                <div className="HeroText">
                    <h3>{languageText.BuySellBenefit}</h3>
                    <h1 className="anim">{languageText.ShopWithUs}</h1>
                    <Link to="/browse" className="HeroButton">{languageText.ShopNow}</Link>
                </div>
                <div className="HeroImg">
                    <img src={img1} alt="" />
                </div>
            </div>
            <h2 className="HomeTitle">{languageText.OurServices}</h2>
            <div className="Services">
                <div className="SCard">
                    <FontAwesomeIcon icon={faComment} className="SIcon" />
                    <div className="SCardText">
                        <div className="STitle">{languageText.Chat}</div>
                        <hr />
                        <div className="SDescription">{languageText.ChatDescription}</div>
                    </div>
                </div>
                <div className="SCard">
                    <FontAwesomeIcon icon={faStar} className="SIcon" />
                    <div className="SCardText">
                        <div className="STitle">{languageText.Review}</div>
                        <hr />
                        <div className="SDescription">{languageText.ReviewDescription}</div>
                    </div>
                </div>
                <div className="SCard">
                    <FontAwesomeIcon icon={faBell} className="SIcon" />
                    <div className="SCardText">
                        <div className="STitle">{languageText.Notification}</div>
                        <hr />
                        <div className="SDescription">{languageText.NotificationDescription}</div>
                    </div>
                </div>
            </div>

            <h2 className="HomeTitle">{languageText.Categories}</h2>

            <div className="Banners">

                <div className="Banner1">
                    <div className="banner-box">
                        <h4>{languageText.ClothingDescription}</h4>
                        <h2>{languageText.Clothing}</h2>
                    </div>

                    <div className="banner-box banner-box2">
                        <h4>{languageText.AppliancesDescription}</h4>
                        <h2>{languageText.Appliances}</h2>
                    </div>
                </div>

                <div className="Banner2">
                    <div className="banner-box">
                        <h4>{languageText.StudyMaterialsDescription}</h4>
                        <h2>{languageText.StudyMaterials}</h2>
                    </div>

                    <div className="banner-box banner-box2">
                        <h4>{languageText.FoodDescription}</h4>
                        <h2>{languageText.Food}</h2>
                    </div>

                    <div className="banner-box banner-box3">
                        <h4>{languageText.VehiclesDescription}</h4>
                        <h2>{languageText.Vehicles}</h2>
                    </div>
                </div>
            </div>

            <div className="EmailUs">

                <div className="newstext">
                    <h4>{languageText.GeneralInquiry}</h4>
                    <p>{languageText.EmailUsAnyInquiries}</p>
                </div>



                <button
                    className="normal"
                    onClick={() => {
                        window.open("mailto:marketify.utm@gmail.com", "_blank");
                    }}>{languageText.EmailUs}</button>


            </div>
        </div>
    );
}

export default Home;