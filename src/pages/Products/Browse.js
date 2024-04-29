import './Products.css'
import logo from '../../images/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLandMineOn, faStar } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';
import { useState, useEffect } from 'react'
import Loader from '../../components/Loader/Loader'
import { useItemsContext } from '../../hooks/useItemsContext'
import { Icon } from '@iconify/react';
import { useAuthContext } from '../../hooks/useAuthContext';

// import { useLanguage } from '../../context/languageContext';
// const categories = ({ text, status }) => {
//     return (
//         <div className="CategoriesCheckbox">
//             <input id={text} className="CheckBoxInput" type="checkbox" disabled={status} />
//             <label for={text} className="CheckBoxLabel">
//                 {!status && <span className="CheckBoxSpan"></span>}
//                 <div className="CheckBoxText">{text}</div>
//             </label>
//         </div>
//     )
// }


const Categories = ({ text, status, onChange, type }) => {

    return (
        <div className="CategoriesCheckbox">
            <input
                id={text}
                className="CheckBoxInput"
                type="checkbox"
                checked={status}
                onChange={() => onChange(type)}
                disabled={status === "true" ? "disabled" : ""}
            />
            <label htmlFor={text} className="CheckBoxLabel">
                {!status && <span className="CheckBoxSpan"></span>}
                <div className="CheckBoxText">{text}</div>
            </label>
        </div>
    );
};






const condition = ({ text, status, onChange, type }) => {
    return (
        <div className="CategoriesCheckbox">
            <input
                id={text}
                className="CheckBoxInput"
                type="checkbox"
                checked={status}
                onChange={() => onChange(type)}
            />
            <label htmlFor={text} className="CheckBoxLabel">
                {/* <span className="CheckBoxSpan"></span> */}
                {!status && <span className="CheckBoxSpan"></span>}

                <div className="CheckBoxText">{text}</div>
            </label>
        </div>
    );
};


const donation = ({ text, onChange, type }) => {
    return (
        <div className="CategoriesCheckbox">
            <input id={text} className="CheckBoxInput" type="checkbox"
                onChange={() => onChange(type)}
            />
            <label for={text} className="CheckBoxLabel">
                <span className="CheckBoxSpan"></span>
                <div className="CheckBoxText">{text}</div>
            </label>
        </div>
    )
}

const Browse = ({ api, languageText }) => {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const { user } = useAuthContext()
    const { products, dispatch } = useItemsContext()
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedConditions, setSelectedConditions] = useState([]);
    const [selectedDonations, setSelectedDonations] = useState([]);
    const [showCategories, setShowCategories] = useState(false);
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch(`${api}/api/products`, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                if (!response.ok) {
                    console.error(`Error fetching Items. Status: ${response.status}, ${response.statusText}`);
                    setError('Failed to fetch data');
                    return;
                }
                const json = await response.json();
                const filteredJson = json.filter((product) => product.userID !== user.userId && product.pStatus === "Valid");
                dispatch({
                    type: 'SET_ITEM',
                    collection: "products",
                    payload: filteredJson,
                });
                setLoading(false);
            } catch (error) {
                console.error('An error occurred while fetching data:', error);
                setError('An error occurred while fetching data');
            }
        };

        if (user) {
            fetchItems();
        }
    }, [dispatch, user, api, languageText, selectedCategories, selectedConditions]);


    // const handleCategoryChange = (category) => {
    //     const index = selectedCategories.indexOf(category);
    //     if (index === -1) {
    //         setSelectedCategories([...selectedCategories, category]);
    //     } else {
    //         setSelectedCategories(selectedCategories.filter((cat) => cat !== category));
    //     }
    // };

    const handleCategoryChange = (category) => {
        if (category === 'All Categories') {
            setSelectedCategories([]);
        } else {
            const index = selectedCategories.indexOf(category);
            if (index === -1) {
                setSelectedCategories([...selectedCategories, category]);
            } else {
                setSelectedCategories(selectedCategories.filter((cat) => cat !== category));
            }
        }
    };


    const handleConditionChange = (condition) => {
        if (condition === "All Conditions") {
            setSelectedConditions([]);
        } else {
            const index = selectedConditions.indexOf(condition);
            if (index === -1) {
                setSelectedConditions([...selectedConditions, condition]);
            } else {
                setSelectedConditions(selectedConditions.filter((cond) => cond !== condition));
            }
        }
    };

    const handleDonationChange = (donation) => {
        if (donation != "Donations") {
            setSelectedDonations([]);
        } else {
            const index = selectedDonations.indexOf(donation);
            if (index === -1) {
                setSelectedDonations([...selectedDonations, donation]);
            } else {
                setSelectedDonations(selectedDonations.filter((dont) => dont !== donation));
            }
        }
    }




    const filterProductsByCategoryAndCondition = (product) => {
        const categoryFilter = selectedCategories.length === 0 || product.pCategory.some((category) => selectedCategories.includes(category));
        const conditionFilter = selectedConditions.length === 0 || selectedConditions.includes(product.pCondition);
        const donationFilter = selectedDonations.length === 0 || selectedDonations.includes(product.pType);
        return categoryFilter && conditionFilter && donationFilter;
    };

    const handleShowCategories = () => {
        setShowCategories(true);
    }

    const handleHideCategories = () => {
        setShowCategories(false);

    }

    return (

        <div className="Browse">
            {loading ? (
                <div className="Loader">
                    <Loader />
                    <p className="LoaderText">{languageText.Loading}</p>
                </div>
            ) : (<>
                <h2>{languageText.BrowseProducts}</h2>
                <div className="AllBrowse">
                    <div className="LeftSide">
                        <div className="Categories">
                            <p>{languageText.Categories}</p>
                            {!showCategories &&


                                <div class="ShowCategoriesButton" data-tooltip={languageText.Show} onClick={handleShowCategories}>
                                    <div class="button-wrapper">
                                        <div class="text">{languageText.ShowCategories}</div>
                                        <span class="icon">
                                            {/* <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="2em" height="2em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.878a2 2 0 0 0 1.94-1.515L22 17"></path></svg> */}
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m12 20l6-6m-6 6l-6-6m6 6V9.5M12 4v2.5" /></svg>
                                        </span>
                                    </div>
                                </div>

                            }
                            {showCategories &&



                                <div class="ShowCategoriesButton" data-tooltip={languageText.Hide} onClick={handleHideCategories}>
                                    <div class="button-wrapper">
                                        <div class="text">{languageText.HideCategories}</div>

                                        <span class="icon">
                                            {/* <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="2em" height="2em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.878a2 2 0 0 0 1.94-1.515L22 17"></path></svg> */}
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m12 4l-6 6m6-6l6 6m-6-6v10.5m0 5.5v-2.5" /></svg>
                                        </span>
                                    </div>
                                </div>
                            }
                            <div className={`${showCategories ? "Category" : "Disabled"}`}>
                                {Categories({ text: languageText.AllCategories, status: selectedCategories.includes(languageText.AllCategories), onChange: handleCategoryChange, type: "All Categories" })}
                                {/* {categories({ text: languageText.MenClothing, status: selectedCategories.includes(languageText.MenClothing) })} */}
                                {/* {categories({ text: languageText.WomenClothing })} */}
                                {Categories({ text: languageText.MenClothing, status: selectedCategories.includes(languageText.MenClothing), onChange: handleCategoryChange, type: "Men's Clothing" })}
                                {Categories({ text: languageText.WomenClothing, status: selectedCategories.includes(languageText.WomenClothing), onChange: handleCategoryChange, type: "Women's Clothing" })}
                                {Categories({ text: languageText.MenShoes, status: selectedCategories.includes(languageText.MenShoes), onChange: handleCategoryChange, type: "Men's Shoes" })}
                                {Categories({ text: languageText.WomenShoes, status: selectedCategories.includes(languageText.WomenShoes), onChange: handleCategoryChange, type: "Women's Shoes" })}
                                {Categories({ text: languageText.MenBags, status: selectedCategories.includes(languageText.MenBags), onChange: handleCategoryChange, type: "Men's Bags" })}
                                {Categories({ text: languageText.WomenBags, status: selectedCategories.includes(languageText.WomenBags), onChange: handleCategoryChange, type: "Women's Bags" })}
                                {/* {categories({ text: languageText.WomenBags })} */}
                                {Categories({ text: "-----------", status: "true", onChange: handleCategoryChange })}
                                {Categories({ text: languageText.FoodBeverages, status: selectedCategories.includes(languageText.FoodBeverages), onChange: handleCategoryChange, type: "Food & Beverages" })}
                                {Categories({ text: languageText.Groceries, status: selectedCategories.includes(languageText.Groceries), onChange: handleCategoryChange, type: "Groceries" })}
                                {Categories({ text: "-----------", status: "true", onChange: handleCategoryChange })}
                                {Categories({ text: languageText.Mobile, status: selectedCategories.includes(languageText.Mobile), onChange: handleCategoryChange, type: "Mobile" })}
                                {Categories({ text: languageText.Computer, status: selectedCategories.includes(languageText.Computer), onChange: handleCategoryChange, type: "Computer" })}
                                {Categories({ text: languageText.CamerasDrones, status: selectedCategories.includes(languageText.CamerasDrones), onChange: handleCategoryChange, type: "Cameras & Drones" })}
                                {Categories({ text: languageText.GamingConsoles, status: selectedCategories.includes(languageText.GamingConsoles), onChange: handleCategoryChange, type: "Gaming Consoles" })}
                                {Categories({ text: languageText.HomeAppliances, status: selectedCategories.includes(languageText.HomeAppliances), onChange: handleCategoryChange, type: "Home Appliances" })}
                                {Categories({ text: languageText.OtherTechnology, status: selectedCategories.includes(languageText.OtherTechnology), onChange: handleCategoryChange, type: "Other Technology" })}
                                {Categories({ text: "-----------", status: "true" })}
                                {Categories({ text: languageText.Healthcare, status: selectedCategories.includes(languageText.Healthcare), onChange: handleCategoryChange, type: "Healthcare" })}
                                {Categories({ text: languageText.Pharmaceuticals, status: selectedCategories.includes(languageText.Pharmaceuticals), onChange: handleCategoryChange, type: "Pharmaceuticals" })}
                                {Categories({ text: "-----------", status: "true" })}
                                {Categories({ text: languageText.Furniture, status: selectedCategories.includes(languageText.Furniture), onChange: handleCategoryChange, type: "Furniture" })}
                                {Categories({ text: languageText.Automotive, status: selectedCategories.includes(languageText.Automotive), onChange: handleCategoryChange, type: "Automotive" })}
                                {Categories({ text: "-----------", status: "true" })}
                                {Categories({ text: languageText.Books, status: selectedCategories.includes(languageText.Books), onChange: handleCategoryChange, type: "Books" })}
                                {Categories({ text: languageText.GamesHobbies, status: selectedCategories.includes(languageText.GamesHobbies), onChange: handleCategoryChange, type: "Games & Hobbies" })}
                                {Categories({ text: languageText.SportsOutdoor, status: selectedCategories.includes(languageText.SportsOutdoor), onChange: handleCategoryChange, type: "Sports & Outdoor" })}
                                {Categories({ text: languageText.Tickets, status: selectedCategories.includes(languageText.Tickets), onChange: handleCategoryChange, type: "Tickets" })}
                            </div>
                        </div>
                        <div className="Categories">
                            {/* <p>Condition</p> */}
                            <p>{languageText.Condition}</p>

                            {condition({ text: languageText.AllConditions, status: selectedConditions.includes(languageText.AllConditions), onChange: handleConditionChange, type: "All Conditions" })}
                            {condition({ text: languageText.BrandNew, status: selectedConditions.includes(languageText.BrandNew), onChange: handleConditionChange, type: "Brand New" })}
                            {condition({ text: languageText.New, status: selectedConditions.includes(languageText.New), onChange: handleConditionChange, type: "New" })}
                            {condition({ text: languageText.Used, status: selectedConditions.includes(languageText.Used), onChange: handleConditionChange, type: "Used" })}
                        </div>
                        <div className="Categories Donation">
                            <p>{languageText.Donations}</p>

                            {donation({ text: languageText.Donations, onChange: handleDonationChange, type: "Donations" })}
                        </div>
                    </div>
                    <div className="RightSide">
                        {/* {products && products.filter(filterProductsByCategory && filterProductsByCondition).map((product) => ( */}
                        {products && products.filter(filterProductsByCategoryAndCondition).map((product) => (
                            <ProductCard key={product._id} edit={false} product={product} languageText={languageText} api={api} />
                        ))}
                    </div>

                    {products.length <= 0 && (
                        <div className="NoProductsContainer">
                            <p><Icon icon="lucide:package-x" />{languageText.NoProducts}</p>
                        </div>
                    )}
                </div>
                {error && <div className="ErrorMessage"><Icon icon="ooui:error" />{error}</div>}
            </>
            )}
        </div>
    );
}

export default Browse;