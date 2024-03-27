import "./Sell.css"
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCommentDots, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import { Icon } from '@iconify-icon/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Loader from "../../components/Loader/Loader";
import { useItemsContext } from '../../hooks/useItemsContext'
import { useAuthContext } from '../../hooks/useAuthContext';




const Sell = ({ api, languageText }) => {
    const { products = [], dispatch } = useItemsContext()
    const [pTitle, setProductName] = useState("")
    const [pPrice, setProductPrice] = useState("")
    const [pCondition, setProductCondition] = useState("")
    const [pDescription, setProductDescription] = useState("")
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [expandedCategories, setExpandedCategories] = useState(false);

    const [selectedImageText, setSelectedImageText] = useState(null);
    const [img, setImg] = useState(null);

    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false)
    const navigate = useNavigate();
    const { user } = useAuthContext()






    const showCheckboxes = (type) => {
        if (type === 'categories') {
            setExpandedCategories(!expandedCategories);
        } else if (type === 'locations') {
            setExpandedCategories(false);
        }
    };

    const handleCheckboxChange = (value) => {
        const updatedCategories = [...selectedCategories];
        if (updatedCategories.includes(value)) {
            updatedCategories.splice(updatedCategories.indexOf(value), 1);
        } else {
            updatedCategories.push(value);
        }
        setSelectedCategories(updatedCategories);
    };


    const checkbox = ({ type }) => {
        return (
            <div className="CategoryInput" >
                <input
                    type="checkbox"
                    id={type}
                    value={type}
                    checked={selectedCategories.includes(type)}
                    onChange={() => handleCheckboxChange(type)}
                />

                <label htmlFor={type}>{" " + type}</label>


            </div>
        )
    }


    const generateCheckboxes = categories => {
        return categories.map(category => checkbox(category));
    };


    const handleImgChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setImg(file);
            setSelectedImageText(file.name);
        }
    };

    const handleRemoveImage = (e) => {
        e.preventDefault();
        setImg(null);
        setSelectedImageText(null);
    }



    const uploadFile = async (type, file) => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", type === 'image' ? 'products_preset' : '');

        try {
            let cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
            // console.log('Cloud Name:', process.env.REACT_APP_CLOUDINARY_CLOUD_NAME);
            let resourceType = type === 'image' ? 'image' : 'video';
            let api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

            const res = await axios.post(api, data);
            const { secure_url } = res.data;
            console.log(secure_url);
            return secure_url;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }




    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError(languageText.YouMustBeLoggedIn)
        }
        else {

            setSubmitting(true)

            const imgUrl = await uploadFile('image', img);

            const item = {
                pTitle,
                pDescription,
                pPrice,
                pCondition,
                pCategory: selectedCategories,
                pImage: imgUrl,
                userID: user.userId,
                pType: "Sell",
                pStatus: "Valid",
            }

            const response = await fetch(`${api}/api/products`, {
                method: "POST",
                body: JSON.stringify(item),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`

                }
            })
            const json = await response.json()

            if (!response.ok) {
                setError(json.error);
            } else {
                setError(null);
                dispatch({
                    type: 'CREATE_FORM',
                    collection: "products",
                    payload: json
                });
                toast.success("Added Successfully", {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    style: {
                        // fontFamily: language === 'ar' ?
                        //     'Noto Kufi Arabic, sans-serif' :
                        //     'Poppins, sans-serif',
                    },
                });
                setSubmitting(false);
                navigate("/")


            }
        }

    }




    return (
        <div className="Sell">
            {submitting ? (
                <div className="Loader">
                    <Loader />
                    <p className="LoaderText">{languageText.Submitting}</p>
                </div>
            ) : (
                <div className="SellFormContainer">
                    <div className="SellButtons">
                        <Link to="/sell" className="SellButton active">{languageText.Sell}</Link>
                        <Link to="/donate" className="SellButton">{languageText.Donate}</Link>
                    </div>
                    <h2>{languageText.SellForm}</h2>
                    <form className='Form' onSubmit={handleSubmit}>
                        <div className="InputField ">
                            <div className="InputLabelField">
                                <input
                                    type="text"
                                    className={`input ${(pTitle) ? 'valid' : ''}`}
                                    onChange={(e) => { setProductName(e.target.value) }}
                                    required
                                    id="name"
                                    name="name"
                                />
                                {!pTitle && <label for="name" className={`LabelInput ${(pTitle) ? 'valid' : ''}`}><Icon icon="fluent-mdl2:product" />{languageText.ProductName}</label>}
                            </div>
                        </div>

                        <div className="InputField">
                            <div className="InputLabelField">
                                <input
                                    type="number"
                                    className={`input ${(pPrice) ? 'valid' : ''}`}
                                    onChange={(e) => { setProductPrice(e.target.value) }}

                                    required
                                    id="price"
                                    name="price"
                                />
                                {!pPrice && <label for="price" className={`LabelInput ${(pPrice) ? 'valid' : ''}`}> <Icon icon="solar:tag-price-bold" /> {languageText.ProductPrice}</label>}
                            </div>
                        </div>

                        <div className="InputRow">
                            <div className="InputField">
                                <select
                                    className={`input ${(pCondition) ? 'valid' : ''}`}
                                    name="productCondition"
                                    required
                                    onChange={(e) => { setProductCondition(e.target.value) }}


                                >
                                    <option value="" disabled selected hidden>{languageText.Condition}</option>
                                    <option value="Brand New">{languageText.BrandNew}</option>
                                    <option value="New">{languageText.New}</option>
                                    <option value="Used">{languageText.Used}</option>
                                </select>
                            </div>
                            <div className="InputField">
                                <div class="multiselect">
                                    <div class="selectBox" onClick={() => showCheckboxes('categories')}>
                                        <select>
                                            <option>{languageText.Categories}</option>
                                        </select>
                                        <div class="overSelect"></div>
                                    </div>
                                    <div id="categoriesCheckboxes" style={{ display: expandedCategories ? 'flex' : 'none', flexDirection: 'column', color: "white" }}>
                                        {generateCheckboxes([
                                            { type: "Men's Clothing" },
                                            { type: "Women's Clothing" },
                                            { type: "Men's Shoes" },
                                            { type: "Women's Shoes" },
                                            { type: "Men's Bags" },
                                            { type: "Women's Bags" },

                                            { type: "Food & Beverages" },
                                            { type: "Groceries" },

                                            { type: "Mobile" },
                                            { type: "Computer" },
                                            { type: "Cameras / Drones" },
                                            { type: "Home Appliances" },
                                            { type: "Gaming Consoles" },
                                            { type: "Other Technology" },

                                            { type: "Healthcare" },
                                            { type: "Pharmaceuticals" },

                                            { type: "Furniture" },
                                            { type: "Automotive" },
                                            { type: "Tickets" },

                                            { type: "Books" },
                                            { type: "Games & Hobbies" },
                                            { type: "Sports & Outdoor" },

                                        ])}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="InputField">
                            <div className="InputLabelField">
                                <textarea
                                    rows="3"
                                    className={`input ${(pDescription) ? 'valid' : ''}`}
                                    columns="20"
                                    required
                                    onChange={(e) => { setProductDescription(e.target.value) }}
                                    id="productDescription"
                                    name='productDescription'

                                />
                                {!pDescription && <label for="productDescription" className={`LabelInput ${(pDescription) ? 'valid' : ''}`}><Icon icon="material-symbols:description" /> {languageText.ProductDescription}</label>}
                            </div>
                        </div>
                        <div className="InputField">

                            <label for="img" className={`LabelInputImg ${(img) ? 'valid' : ''}`}>
                                <div style={{ gap: "8px", display: "flex", alignItems: "center" }}><Icon icon="line-md:image" />{selectedImageText || languageText.ProductImage}</div>
                                {(img)
                                    ? <button className="XImgButton" onClick={handleRemoveImage}>
                                        <Icon icon="line-md:close-circle" />
                                    </button>
                                    : <Icon icon="line-md:upload-loop" />}
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                id="img"
                                className={`input ${(img) ? 'valid' : ''}`}
                                style={{ display: 'none' }}
                                onChange={handleImgChange}
                            />
                        </div>
                        <button className='SubmitButton'>{languageText.Submit}</button>

                    </form>
                    {error && <div className="ErrorMessage"><Icon icon="ooui:error" />{error}</div>}

                </div>
            )}
        </div>
    );
}

export default Sell;