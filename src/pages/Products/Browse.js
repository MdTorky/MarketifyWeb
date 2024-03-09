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
// import { useLanguage } from '../../context/languageContext';
const categories = ({ text, status }) => {
    return (
        <div className="CategoriesCheckbox">
            <input id={text} className="CheckBoxInput" type="checkbox" disabled={status} />
            <label for={text} className="CheckBoxLabel">
                {!status && <span className="CheckBoxSpan"></span>}
                <div className="CheckBoxText">{text}</div>
            </label>
        </div>
    )
}

const condition = ({ text }) => {
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

    const { products, dispatch } = useItemsContext()
    useEffect(() => {
        const fetchItems = async () => {

            try {

                const response = await fetch(`${api}/api/products`)
                if (!response.ok) {
                    console.error(`Error fetching Items. Status: ${response.status}, ${response.statusText}`);
                    setError('Failed to fetch data');

                    return;
                }
                const json = await response.json()

                dispatch({
                    type: 'SET_ITEM',
                    collection: "products",
                    payload: json,
                });
                setLoading(false)


            } catch (error) {
                console.error('An error occurred while fetching data:', error);
                setError('An error occurred while fetching data');

            }
        };

        fetchItems()

    }, [])

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
                            <p>Categories</p>
                            {categories({ text: languageText.AllCategories })}
                            {categories({ text: languageText.MenClothing })}
                            {categories({ text: languageText.WomenClothing })}
                            {categories({ text: languageText.MenShoes })}
                            {categories({ text: languageText.WomenShoes })}
                            {categories({ text: languageText.MenBags })}
                            {categories({ text: languageText.WomenBags })}
                            {categories({ text: "-----------", status: true })}
                            {categories({ text: languageText.FoodBeverages })}
                            {categories({ text: languageText.Groceries })}
                            {categories({ text: "-----------", status: true })}
                            {categories({ text: languageText.Mobile })}
                            {categories({ text: languageText.Computer })}
                            {categories({ text: languageText.CamerasDrones })}
                            {categories({ text: languageText.GamingConsoles })}
                            {categories({ text: languageText.HomeAppliances })}
                            {categories({ text: languageText.OtherTechnology })}
                            {categories({ text: "-----------", status: true })}
                            {categories({ text: languageText.Healthcare })}
                            {categories({ text: languageText.Pharmaceuticals })}
                            {categories({ text: "-----------", status: true })}
                            {categories({ text: languageText.Furniture })}
                            {categories({ text: languageText.Automotive })}
                            {categories({ text: languageText.Tickets })}
                            {categories({ text: "-----------", status: true })}
                            {categories({ text: languageText.Books })}
                            {categories({ text: languageText.GamesHobbies })}
                            {categories({ text: languageText.SportsOutdoor })}
                        </div>
                        <div className="Categories">
                            <p>Condition</p>
                            {condition({ text: languageText.AllConditions })}
                            {condition({ text: languageText.BrandNew })}
                            {condition({ text: languageText.New })}
                            {condition({ text: languageText.Used })}
                        </div>
                        <div className="Categories Donation">
                            <p>Donations</p>
                            {donation({ text: languageText.Donations })}
                        </div>
                    </div>
                    <div className="RightSide">
                        {products && products.map((product) => (
                            <ProductCard key={product._id} edit={false} product={product} />

                        ))}
                        {/* {ProductCard({ edit: false })}
                    {ProductCard({ edit: false })}
                    {ProductCard({ edit: false })}
                    {ProductCard({ edit: false })}
                    {ProductCard({ edit: false })}
                    {ProductCard({ edit: false })}
                    {ProductCard({ edit: false })}
                    {ProductCard({ edit: false })}
                    {ProductCard({ edit: false })}
                    {ProductCard({ edit: false })}
                    {ProductCard({ edit: false })}
                    {ProductCard({ edit: false })}
                    {ProductCard({ edit: false })}
                    {ProductCard({ edit: false })}
                    {ProductCard({ edit: false })}
                    {ProductCard({ edit: false })} */}


                    </div>
                </div>
                {error && <div className="ErrorMessage"><Icon icon="ooui:error" />{error}</div>}
            </>
            )}
        </div>
    );
}

export default Browse;