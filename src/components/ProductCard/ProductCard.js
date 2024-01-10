// import './Products.css'
import logo from '../../images/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';


const ProductCard = () => {
    return (
        <Link to="/product/2" className="ProductCard">

            <div className="ProductImg">
                <img src={logo} alt="" />
                <svg viewBox="0 0 1921 1081" xmlns="http://www.w3.org/2000/svg" className="svg">
                    <defs>
                        <radialGradient gradientUnits="objectBoundingBox" gradientTransform="translate(0.219) scale(0.563 1)" r="1.204" cy="0.5" cx="0.5" id="radial-gradient">
                            <stop stop-color="#fff" offset="0"></stop>
                            <stop stop-color="#bcbcbc" offset="1"></stop>
                        </radialGradient>
                    </defs>
                    <g transform="translate(-121.5 -92.5)" id="hoodie">
                        <rect fill="url(#radial-gradient)" stroke-width="1" stroke-miterlimit="10" stroke="#fff" transform="translate(122 93)" height="1080" width="1920" data-name="Rectangle 83" id="Rectangle_83"></rect>
                    </g>
                </svg>

                <div className="ProductPrice">$49.9</div>
            </div>
            {/* <label className="favorite">
                <input checked="" type="checkbox" />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000">
                    <path d="M12 20a1 1 0 0 1-.437-.1C11.214 19.73 3 15.671 3 9a5 5 0 0 1 8.535-3.536l.465.465.465-.465A5 5 0 0 1 21 9c0 6.646-8.212 10.728-8.562 10.9A1 1 0 0 1 12 20z"></path>
                </svg>
            </label> */}

            <div className="ProductContent">
                <div className="ProductTitle">ADIDAS</div>
                <div className="ProductDesc">Classic oversized hoodie</div>
                {/* <div class="color-size-container">
                    <div class="colors">
                        Color
                        <ul class="colors-container">
                            <li class="color"><a href="#"></a> <span class="color-name">Collegiate Gold</span></li>
                            <li class="color active"><a href="#"></a><span class="color-name">Team Navy</span></li>
                            <li class="color"><a href="#"></a><span class="color-name">Pulse Blue</span></li>
                            <li class="color"><a href="#"></a><span class="color-name">Pink Fusion</span></li>
                            +2
                        </ul>
                    </div>
                    <div class="sizes">
                        Size
                        <ul class="size-container">
                            <li class="size">
                                <label class="size-radio">
                                    <input name="size" value="xs" type="radio" />
                                    <span class="name">XS</span>
                                </label>
                            </li>
                            <li class="size">
                                <label class="size-radio">
                                    <input checked="" name="size" value="s" type="radio" />
                                    <span class="name">S</span>
                                </label>
                            </li>
                            <li class="size">
                                <label class="size-radio">
                                    <input name="size" value="m" type="radio" />
                                    <span class="name">M</span>
                                </label>
                            </li>
                            <li class="size">
                                <label class="size-radio">
                                    <input name="size" value="l" type="radio" />
                                    <span class="name">L</span>
                                </label>
                            </li>
                            <li class="size">
                                <label class="size-radio">
                                    <input name="size" value="xl" type="radio" />
                                    <span class="name">XL</span>
                                </label>
                            </li>

                        </ul>
                    </div>
                </div> */}
                <div class="SellerRatings">
                    <FontAwesomeIcon icon={faStar} className="Rating" />
                    <FontAwesomeIcon icon={faStar} className="Rating" />
                    <FontAwesomeIcon icon={faStar} className="Rating" />
                    <FontAwesomeIcon icon={faStar} className="Rating" />
                    <FontAwesomeIcon icon={faStar} />
                </div>
            </div>

            <div class="ProductButton">
                <button class="BuyButton button">Buy Now</button>
            </div>

        </Link>
    )

}

export default ProductCard;