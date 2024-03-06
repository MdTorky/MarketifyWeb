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
const categories = ({ text }) => {
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

    console.log(products)
    return (

        <div className="Browse">
            {loading ? (
                <div className="Loader">
                    <Loader />
                    <p className="LoaderText">Loading</p>
                </div>
            ) : (<>
                <h2>{languageText.BrowseProducts}</h2>
                <div className="AllBrowse">
                    <div className="LeftSide">
                        <div className="Categories">
                            <p>Categories</p>
                            {categories({ text: "All Categories" })}
                            {categories({ text: "Clothes" })}
                        </div>
                        <div className="Categories">
                            <p>Condition</p>
                            {condition({ text: "All Conditions" })}
                            {condition({ text: "Brand New" })}
                            {condition({ text: "New" })}
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