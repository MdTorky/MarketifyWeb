import './Products.css'
import logo from '../../images/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import productCard from '../../components/ProductCard/ProductCard';

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



const Browse = () => {
    return (
        <div className="Browse">
            <h2>Browse Products</h2>
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
                    {productCard({ edit: false })}
                    {productCard({ edit: false })}
                    {productCard({ edit: false })}
                    {productCard({ edit: false })}
                    {productCard({ edit: false })}
                    {productCard({ edit: false })}
                    {productCard({ edit: false })}
                    {productCard({ edit: false })}
                    {productCard({ edit: false })}
                    {productCard({ edit: false })}
                    {productCard({ edit: false })}
                    {productCard({ edit: false })}
                    {productCard({ edit: false })}
                    {productCard({ edit: false })}
                    {productCard({ edit: false })}

                </div>
            </div>
        </div>
    );
}

export default Browse;