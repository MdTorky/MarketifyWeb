import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Icon } from '@iconify-icon/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCommentDots, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import { useLogout } from '../../hooks/useLogout';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useItemsContext } from '../../hooks/useItemsContext'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../components/Loader/Loader'
const EditProduct = ({ languageText, api }) => {
    const { id } = useParams()
    const { users = [], dispatch } = useItemsContext()
    const { user } = useAuthContext()

    const [productData, setProductData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [updating, setUpdating] = useState(false)
    const [productImg, setProductImg] = useState(null);
    const [selectedImageText, setSelectedImageText] = useState(null);
    useEffect(() => {
        // Fetch form data based on type and formId
        const fetchData = async () => {
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
                setCategories(data.pCategory)
                setProductData(data);

            } catch (error) {
                console.error('An error occurred while fetching form data:', error);
            } finally {
                // Set loading to false once the data is fetched (success or error)
                setLoading(false);
            }
        };

        if (user) {
            fetchData();
        }
    }, [api, dispatch, updating]);




    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const handleImgChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setProductData((prevForm) => ({
                ...prevForm,
                pImage: file,
            }));
            setSelectedImageText(file.name);
            setProductImg(file)
        }
    };

    const handleRemoveImage = () => {
        setProductData((prevForm) => ({
            ...prevForm,
            pImage: null,
        }));
        setSelectedImageText(null);
    }

    const [categories, setCategories] = useState([]);

    const [expandedCategories, setExpandedCategories] = useState(false);

    const showCheckboxes = (type) => {
        if (type === 'categories') {
            setExpandedCategories(!expandedCategories);
        }
    };

    const generateCheckboxes = categories => {
        return categories.map(category => checkbox(category));
    };

    const checkbox = ({ type }) => {
        return (
            <div className="CategoryInput" >

                <input
                    type="checkbox"
                    id={type}
                    value={type}
                    checked={categories.includes(type)}
                    onChange={() => handleCheckboxChange(type)}
                />
                <label htmlFor={type}>{" " + type}</label>

            </div>
        )
    }

    const handleCheckboxChange = (value) => {
        const updatedCategories = [...categories];
        if (updatedCategories.includes(value)) {
            updatedCategories.splice(updatedCategories.indexOf(value), 1);
        } else {
            updatedCategories.push(value);
        }
        setCategories(updatedCategories);
    };




    const handleStatusUpdate = async ({ e }) => {
        e.preventDefault();
        setUpdating(true);


        try {
            let productType = null;
            if (productData.pType === "Sell") {
                productType = "Donations"
            } else {
                productType = "Sell"
            }

            const response = await fetch(`${api}/api/products/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`

                },
                body: JSON.stringify({
                    pType: productType,
                    pPrice: 0
                }),
            });

            if (!response.ok) {
                console.error(`Error updating form status. Status: ${response.status}, ${response.statusText}`);
                return;
            }

            const updatedData = await response.json();
            dispatch({
                type: 'UPDATE_ITEM',
                collection: 'products',
                payload: { id, changes: updatedData },
            });

            {
                toast.success(`${languageText.ProductChangedSuccessfullyTo} ${productData.pType === "Sell" ? languageText.Donation : languageText.Sell}`, {
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




    const handleUpdate = async (e) => {
        e.preventDefault();
        setUpdating(true);

        // let userImgUrl = await uploadFile('image', userImg)
        let userImgUrl = productData.pImage
        if (productImg) {
            userImgUrl = await uploadFile('image', productData.pImage)
        }

        try {

            const response = await fetch(`${api}/api/products/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`

                },
                body: JSON.stringify({
                    pTitle: productData.pTitle,
                    pDescription: productData.pDescription,
                    pPrice: productData.pPrice,
                    pCondition: productData.pCondition,
                    pCategory: categories,
                    pImage: userImgUrl,


                }),
            });

            // console.log('API Response:', response);

            if (!response.ok) {
                console.error(`Error updating form status. Status: ${response.status}, ${response.statusText}`);
                return;
            }

            // Assuming the API response contains the updated form data
            const updatedData = await response.json();
            // console.log('Updated Form Data:', updatedMemberData);
            dispatch({
                type: 'UPDATE_ITEM',
                collection: 'products',
                payload: { id, changes: updatedData },
            });

            {
                toast.success(`${languageText.ProductUpdateSuccessfully}`, {
                    position: "bottom-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    // style: {
                    //     fontFamily: language === 'ar' ?
                    //         'Noto Kufi Arabic, sans-serif' :
                    //         'Poppins, sans-serif',
                    // },
                });
            }
            setUpdating(false);


        } catch (error) {
            console.error('An error occurred while updating form status:', error);
        }
    };

    return (
        <div className="Sell">
            {updating ? (
                <div className="Loader">
                    <Loader />
                    <p className="LoaderText">{languageText.Updating}</p>
                </div>
            ) : (
                loading ? (
                    <div className="Loader">
                        <Loader />
                        <p className="LoaderText">{languageText.Loading}</p>
                    </div>
                ) : (
                    <div className="SellFormContainer">
                        <h2>{languageText.EditProduct}</h2>
                        <form className='Form' onSubmit={handleUpdate}>

                            <img src={productData.pImage} className='EditUserImage' alt="" />

                            <div className="InputField">
                                <div className="InputLabelField">
                                    <input
                                        type="text"
                                        className={`input ${(productData.pTitle) ? 'valid' : ''}`}
                                        required
                                        value={productData.pTitle}
                                        id="pTitle"
                                        name="pTitle"
                                        onChange={handleInputChange}
                                    // style={{
                                    //     direction: "ltr"
                                    // }}

                                    />
                                    {!productData.pTitle && <label htmlFor="pTitle" className={`LabelInput ${(productData.pTitle) ? 'valid' : ''}`}><Icon icon="fluent-mdl2:product" />  {languageText.ProductName}</label>}
                                </div>
                            </div>

                            {productData.pType === "Sell" && (
                                <div className="InputField">
                                    <div className="InputLabelField">
                                        <input
                                            type="number"
                                            className={`input ${(productData.pPrice) ? 'valid' : ''}`}
                                            onChange={handleInputChange}
                                            value={productData.pPrice}
                                            required
                                            id="pPrice"
                                            name="pPrice"

                                        />
                                        {!productData.pPrice && <label htmlFor="pPrice" className={`LabelInput ${(productData.pPrice) ? 'valid' : ''}`}> <Icon icon="solar:tag-price-bold" /> {languageText.ProductPrice}</label>}
                                    </div>
                                </div>
                            )}

                            <div className="InputRow">
                                <div className="InputField">
                                    <select
                                        className={`input ${(productData.pCondition) ? 'valid' : ''}`}
                                        value={productData.pCondition}
                                        onChange={handleInputChange}
                                        required
                                        name="pCondition"
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
                                        className={`input ${(productData.pDescription) ? 'valid' : ''}`}
                                        columns="20"
                                        required
                                        value={productData.pDescription}
                                        onChange={handleInputChange}
                                        id="pDescription"
                                        name='pDescription'

                                    />
                                    {!productData.pDescription && <label htmlFor="pDescription" className={`LabelInput ${(productData.pDescription) ? 'valid' : ''}`}><Icon icon="material-symbols:description" /> {languageText.ProductDescription}</label>}
                                </div>
                            </div>

                            <div className="InputRow">
                                <div className="InputField">

                                    <label htmlFor="img" className={`LabelInputImg ${(productData.pImage) ? 'valid' : ''}`}>
                                        <div style={{ gap: "8px", display: "flex", alignItems: "center" }}><Icon icon="line-md:image" />{selectedImageText || languageText.ProductImage}</div>
                                        {(productData.pImage)
                                            ? <button className="XImgButton" onClick={handleRemoveImage}>
                                                <Icon icon="line-md:close-circle" />
                                            </button>
                                            : <Icon icon="line-md:upload-loop" />}
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        id="img"
                                        className={`input ${(productData.pImage) ? 'valid' : ''}`}
                                        style={{ display: 'none' }}
                                        onChange={handleImgChange}
                                    // value={form.eventImg}
                                    />
                                </div>

                                {productData.pType === "Donations" ? (
                                    <button className="ChangeStatusFormButton" onClick={(e) => handleStatusUpdate({ e })}>{languageText.ChangeToSell}</button>
                                ) : (
                                    <button className="ChangeStatusFormButton" onClick={(e) => handleStatusUpdate({ e })}>{languageText.ChangeToDonation}</button>

                                )}

                            </div>
                            <button className='SubmitButton'>{languageText.Submit}</button>

                        </form>
                    </div >
                ))}

        </div >
    )
}

export default EditProduct
