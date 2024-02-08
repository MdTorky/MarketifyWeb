import './Profile.css'
import profile from '../../images/Profile.jpg'
import { Link, useLocation } from 'react-router-dom';
import { Icon } from '@iconify-icon/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCommentDots, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
const Profile = () => {

    const ReviewCard = () => {
        return (
            <div className="ReviewCard">
                <div className="ReviewCardLeft">
                    {/* <div className="ReviewCardImg"> */}
                    <img src={profile} alt="" />

                    {/* </div> */}
                    <p>Mohamed</p>
                </div>
                <div className="ReviewCardRight">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti saepe fuga hic, reprehenderit pariatur optio eos ducimus molestiae exercitationem est.</p>
                    <div class="SellerRatings">
                        <FontAwesomeIcon icon={faStar} className="Rating" />
                        <FontAwesomeIcon icon={faStar} className="Rating" />
                        <FontAwesomeIcon icon={faStar} className="Rating" />
                        <FontAwesomeIcon icon={faStar} className="Rating" />
                        <FontAwesomeIcon icon={faStar} />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="Profile">
            <div className="ProfileBack">
                <div className="ProfileLeft">
                    <div className="ProfileImgContainer">
                        <img src={profile} alt="" />
                        <div className="ProfileImgText">
                            <h2>Name</h2>
                            <Link to="/" className='EditButton'><Icon icon="mingcute:user-edit-fill" /> </Link>
                        </div>
                    </div>
                    <div className="ProfileInfo">
                        <div className="ProfileInfoField">
                            <p><Icon icon="line-md:email" /> Email: </p>
                            <p>hhhh@gmail.com</p>
                        </div>
                        <div className="ProfileInfoField">
                            <p><Icon icon="line-md:phone" /> Phone: </p>
                            <p>+210312489212</p>
                        </div>
                        <div className="ProfileInfoField">
                            <p><Icon icon="mdi:passport" /> Passsport: </p>
                            <p>A20323443</p>
                        </div>
                        <div className="ProfileInfoField">
                            <p><Icon icon="line-md:my-location" /> Address: </p>
                            <p className="ProfileInfoAddress">Address Location</p>
                        </div>
                    </div>
                </div>
                <div className="ProfileRight">
                    <h1>Reviews</h1>

                    {ReviewCard()}
                    {ReviewCard()}

                </div>
            </div>
        </div>
    );
}

export default Profile;