import productCard from '../../components/ProductCard/ProductCard';


const MyProducts = ({ languageText, api }) => {
    return (
        <div className="MyProducts">
            <h2>{languageText.MyProducts}</h2>
            <div className="MyProductsCards">
                {productCard({ edit: true })}
                {productCard({ edit: true })}
                {productCard({ edit: true })}
                {productCard({ edit: true })}

            </div>
        </div>
    );
}

export default MyProducts;