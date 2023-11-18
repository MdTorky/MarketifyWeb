import NavbarLayout from "../../layouts/NavbarLayout";
import "./Home.css"
import img1 from '../../images/HomeImg.png'
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="Home">
            <div className="Hero">
                <div className="HeroText">
                    <h3>BUY-SELL-BENEFIT</h3>
                    <h1>Shop With Us</h1>
                    <Link to="/SignUp" className="HeroButton">Shop Now</Link>
                </div>
                <div className="HeroImg">
                    <img src={img1} alt="" />
                </div>
            </div>
        </div>
    );
}

export default Home;