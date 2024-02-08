import productCard from '../../components/ProductCard/ProductCard';


const MyProducts = () => {
    return (
        <div className="MyProducts">
            <h2>My Products</h2>
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