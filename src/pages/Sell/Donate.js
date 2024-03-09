import "./Sell.css"
import { Link, useLocation } from 'react-router-dom';
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCommentDots, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import { Icon } from '@iconify-icon/react';

const Donate = ({ languageText }) => {



    const [productName, setProductName] = useState("")
    const [productCondition, setProductCondition] = useState("")
    const [productDescription, setProductDescription] = useState("")
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [expandedCategories, setExpandedCategories] = useState(false);

    const [productImg, setProductImg] = useState(null)

    const [selectedImageText, setSelectedImageText] = useState(null);
    const [img, setImg] = useState(null);









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
            <label htmlFor={type}>
                <input
                    type="checkbox"
                    id={type}
                    value={type}
                    checked={selectedCategories.includes(type)}
                    onChange={() => handleCheckboxChange(type)}
                />
                {" " + type}
            </label>
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

    const handleRemoveImage = () => {
        setImg(null);
        setSelectedImageText(null);
    }





    return (
        <div className="Sell">
            <div className="SellFormContainer">
                <div className="SellButtons">
                    <Link to="/sell" className="SellButton ">{languageText.Sell}</Link>
                    <Link to="/donate" className="SellButton active">{languageText.Donate}</Link>
                </div>
                <h2>{languageText.DonateForm}</h2>
                <form className='Form'>
                    <div className="InputField ">
                        <div className="InputLabelField">
                            <input
                                type="text"
                                className={`input ${(productName) ? 'valid' : ''}`}
                                onChange={(e) => { setProductName(e.target.value) }}
                                required
                                id="name"
                                name="name"
                            />
                            {!productName && <label for="name" className={`LabelInput ${(productName) ? 'valid' : ''}`}><Icon icon="fluent-mdl2:product" />{languageText.ProductName}</label>}
                        </div>
                    </div>

                    <div className="InputRow">
                        <div className="InputField">
                            <select
                                className={`input ${(productCondition) ? 'valid' : ''}`}
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
                                        { type: "Technology" },
                                        { type: "Technology" },
                                        { type: "Technology" },
                                        { type: "Technology" },
                                        { type: "Technology" },
                                        { type: "Technology" },
                                        { type: "Technology" },
                                        { type: "Technology" },
                                        { type: "Technology" },
                                        { type: "Technology" },
                                        { type: "Technology" },
                                        { type: "Technology" },
                                        { type: "Technology" },
                                        { type: "Technology" },
                                        { type: "Technology" },

                                    ])}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="InputField">
                        <div className="InputLabelField">
                            <textarea
                                rows="3"
                                className={`input ${(productDescription) ? 'valid' : ''}`}
                                columns="20"
                                required
                                onChange={(e) => { setProductDescription(e.target.value) }}
                                id="productDescription"
                                name='productDescription'

                            />
                            {!productDescription && <label for="productDescription" className={`LabelInput ${(productDescription) ? 'valid' : ''}`}><Icon icon="material-symbols:description" /> {languageText.ProductDescription}</label>}
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
            </div>
        </div>
    );
}

export default Donate;