import ProductCard from '../../components/ProductCard/ProductCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react'
import Loader from '../../components/Loader/Loader'
import { useItemsContext } from '../../hooks/useItemsContext'
import { Icon } from '@iconify/react';
import { useAuthContext } from '../../hooks/useAuthContext';

const MyProducts = ({ languageText, api }) => {


    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const { user } = useAuthContext()
    const { products, dispatch } = useItemsContext()





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
                const filteredJson = json.filter((product) => product.userID === user.userId);
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
    }, [dispatch, user]);


    return (
        <div className="MyProducts">
            {loading ? (
                <div className="Loader">
                    <Loader />
                    <p className="LoaderText">{languageText.Loading}</p>
                </div>
            ) : (<>
                <h2>{languageText.MyProducts}</h2>
                <div className="MyProductsCards">
                    {products && products.map((product) => (
                        <ProductCard key={product._id} edit={true} product={product} languageText={languageText} />

                    ))}
                    {products.length <= 0 && (
                        <div className="NoProductsContainer">
                            <p><Icon icon="lucide:package-x" />{languageText.NoProducts}</p>
                        </div>
                    )}
                    {/* {productCard({ edit: true })}
                    {productCard({ edit: true })}
                    {productCard({ edit: true })}
                    {productCard({ edit: true })} */}

                </div>
            </>
            )}
        </div>
    );
}

export default MyProducts;