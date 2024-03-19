import './Products.css'
import logo from '../../images/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
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


const Categories = ({ text, status, onChange }) => {

    return (
        <div className="CategoriesCheckbox">
            <input
                id={text}
                className="CheckBoxInput"
                type="checkbox"
                checked={status}
                onChange={() => onChange(text)}
                disabled={status === "true" ? "disabled" : ""}
            />
            <label htmlFor={text} className="CheckBoxLabel">
                {!status && <span className="CheckBoxSpan"></span>}
                <div className="CheckBoxText">{text}</div>
            </label>
        </div>
    );
};






const condition = ({ text, status, onChange }) => {
    return (
        <div className="CategoriesCheckbox">
            <input
                id={text}
                className="CheckBoxInput"
                type="checkbox"
                checked={status}
                onChange={() => onChange(text)}
            />
            <label htmlFor={text} className="CheckBoxLabel">
                {/* <span className="CheckBoxSpan"></span> */}
                {!status && <span className="CheckBoxSpan"></span>}

                <div className="CheckBoxText">{text}</div>
            </label>
        </div>
    );
};


const donation = ({ text }) => {
    return (
        <div className="CategoriesCheckbox">
            <input id={text} className="CheckBoxInput" type="checkbox" />
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
                const filteredJson = json.filter((product) => product.userID !== user.userId);
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
        if (category === languageText.AllCategories) {
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
        if (condition === languageText.AllConditions) {
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



    const filterProductsByCategoryAndCondition = (product) => {
        const categoryFilter = selectedCategories.length === 0 || product.pCategory.some((category) => selectedCategories.includes(category));
        const conditionFilter = selectedConditions.length === 0 || selectedConditions.includes(product.pCondition);
        return categoryFilter && conditionFilter;
    };

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
                            {Categories({ text: languageText.AllCategories, status: selectedCategories.includes(languageText.AllCategories), onChange: handleCategoryChange })}
                            {/* {categories({ text: languageText.MenClothing, status: selectedCategories.includes(languageText.MenClothing) })} */}
                            {/* {categories({ text: languageText.WomenClothing })} */}
                            {Categories({ text: languageText.MenClothing, status: selectedCategories.includes(languageText.MenClothing), onChange: handleCategoryChange })}
                            {Categories({ text: languageText.WomenClothing, status: selectedCategories.includes(languageText.WomenClothing), onChange: handleCategoryChange })}
                            {Categories({ text: languageText.MenShoes, status: selectedCategories.includes(languageText.MenShoes), onChange: handleCategoryChange })}
                            {Categories({ text: languageText.WomenShoes, status: selectedCategories.includes(languageText.WomenShoes), onChange: handleCategoryChange })}
                            {Categories({ text: languageText.MenBags, status: selectedCategories.includes(languageText.MenBags), onChange: handleCategoryChange })}
                            {Categories({ text: languageText.WomenBags, status: selectedCategories.includes(languageText.WomenBags), onChange: handleCategoryChange })}
                            {/* {categories({ text: languageText.WomenBags })} */}
                            {Categories({ text: "-----------", status: "true", onChange: handleCategoryChange })}
                            {Categories({ text: languageText.FoodBeverages, status: selectedCategories.includes(languageText.FoodBeverages), onChange: handleCategoryChange })}
                            {Categories({ text: languageText.Groceries, status: selectedCategories.includes(languageText.Groceries), onChange: handleCategoryChange })}
                            {Categories({ text: "-----------", status: "true", onChange: handleCategoryChange })}
                            {Categories({ text: languageText.Mobile, status: selectedCategories.includes(languageText.Mobile), onChange: handleCategoryChange })}
                            {Categories({ text: languageText.Computer, status: selectedCategories.includes(languageText.Computer), onChange: handleCategoryChange })}
                            {Categories({ text: languageText.CamerasDrones, status: selectedCategories.includes(languageText.CamerasDrones), onChange: handleCategoryChange })}
                            {Categories({ text: languageText.GamingConsoles, status: selectedCategories.includes(languageText.GamingConsoles), onChange: handleCategoryChange })}
                            {Categories({ text: languageText.HomeAppliances, status: selectedCategories.includes(languageText.HomeAppliances), onChange: handleCategoryChange })}
                            {Categories({ text: languageText.OtherTechnology, status: selectedCategories.includes(languageText.OtherTechnology), onChange: handleCategoryChange })}
                            {Categories({ text: "-----------", status: "true" })}
                            {Categories({ text: languageText.Healthcare, status: selectedCategories.includes(languageText.Healthcare), onChange: handleCategoryChange })}
                            {Categories({ text: languageText.Pharmaceuticals, status: selectedCategories.includes(languageText.Pharmaceuticals), onChange: handleCategoryChange })}
                            {Categories({ text: "-----------", status: "true" })}
                            {Categories({ text: languageText.Furniture, status: selectedCategories.includes(languageText.Furniture), onChange: handleCategoryChange })}
                            {Categories({ text: languageText.Automotive, status: selectedCategories.includes(languageText.Automotive), onChange: handleCategoryChange })}
                            {Categories({ text: "-----------", status: "true" })}
                            {Categories({ text: languageText.Books, status: selectedCategories.includes(languageText.Books), onChange: handleCategoryChange })}
                            {Categories({ text: languageText.GamesHobbies, status: selectedCategories.includes(languageText.GamesHobbies), onChange: handleCategoryChange })}
                            {Categories({ text: languageText.SportsOutdoor, status: selectedCategories.includes(languageText.SportsOutdoor), onChange: handleCategoryChange })}
                            {Categories({ text: languageText.Tickets, status: selectedCategories.includes(languageText.Tickets), onChange: handleCategoryChange })}
                        </div>
                        <div className="Categories">
                            {/* <p>Condition</p> */}
                            <p>{languageText.Condition}</p>

                            {condition({ text: languageText.AllConditions, status: selectedConditions.includes(languageText.AllConditions), onChange: handleConditionChange })}
                            {condition({ text: languageText.BrandNew, status: selectedConditions.includes(languageText.BrandNew), onChange: handleConditionChange })}
                            {condition({ text: languageText.New, status: selectedConditions.includes(languageText.New), onChange: handleConditionChange })}
                            {condition({ text: languageText.Used, status: selectedConditions.includes(languageText.Used), onChange: handleConditionChange })}
                        </div>
                        <div className="Categories Donation">
                            <p>{languageText.Donations}</p>

                            {donation({ text: languageText.Donations })}
                        </div>
                    </div>
                    <div className="RightSide">
                        {/* {products && products.filter(filterProductsByCategory && filterProductsByCondition).map((product) => ( */}
                        {products && products.filter(filterProductsByCategoryAndCondition).map((product) => (
                            <ProductCard key={product._id} edit={false} product={product} />

                        ))}


                    </div>
                </div>
                {error && <div className="ErrorMessage"><Icon icon="ooui:error" />{error}</div>}
            </>
            )}
        </div>
    );
}

export default Browse;