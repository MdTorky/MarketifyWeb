import './Admin.css'
import { Icon } from '@iconify-icon/react';
import React, { useState, useEffect } from 'react';
import { useItemsContext } from '../../hooks/useItemsContext'
import { useAuthContext } from '../../hooks/useAuthContext';
import Loader from "../../components/Loader/Loader";
import { Link } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';
const ManageProducts = ({ api, languageText }) => {
    const { users = [], products = [], dispatch } = useItemsContext()
    const { user } = useAuthContext()
    const [searchInput, setSearchInput] = useState('');

    const [loading, setLoading] = useState(true)
    const [updating, setUpdating] = useState(false)
    const [error, setError] = useState(null);



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
                // const filteredJson = json.filter((userOne) => userOne.userType != "admin");
                dispatch({
                    type: 'SET_ITEM',
                    collection: "products",
                    payload: json,
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
    }, [api, dispatch, user]);


    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch(`${api}/api/user`, {
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
                dispatch({
                    type: 'SET_ITEM',
                    collection: "users",
                    payload: json,
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
    }, [api, dispatch, user]);

    const handleSearchInputChange = (e) => {
        // const searchTerm = e.target.value.toLowerCase();
        setSearchInput(e.target.value);
    }

    const filteredProducts = products.filter((product) => {
        const seller = users.find(user => user._id === product.userID);
        const { pTitle, pStatus, pDescription } = product;
        const searchTerm = searchInput.toLowerCase();
        console.log('Filtered Search Term:', searchTerm);
        return (
            pTitle.toLowerCase().includes(searchTerm) ||
            pStatus.toLowerCase().includes(searchTerm) ||
            pDescription.toLowerCase().includes(searchTerm) ||
            seller.userFname.toLowerCase().includes(searchTerm) ||
            seller.userEmail.toLowerCase().includes(searchTerm) ||
            seller.userPhoneNo.toLowerCase().includes(searchTerm) ||
            seller.userPassport.toLowerCase().includes(searchTerm)
            // users.some((user) => (
            //     user.userFname.toLowerCase().includes(searchTerm) ||
            //     user.userPhoneNo.toLowerCase().includes(searchTerm)
            // ))
        );
    });


    const handleStatusUpdate = async ({ e, product }) => {
        e.preventDefault();
        setUpdating(true);


        try {
            let productStatus = null;
            if (product.pStatus === "Valid") {
                productStatus = "Invalid"
            } else {
                productStatus = "Valid"

            }

            const response = await fetch(`${api}/api/products/${product._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({
                    pStatus: productStatus
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
                payload: { id: product._id, changes: updatedData },
            });

            {
                toast.success("Status Changed Successfully", {
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


    const handleDelete = async ({ e, product }) => {
        e.preventDefault();
        e.stopPropagation();


        const confirmDelete = window.confirm(languageText.AreYouSureProduct);

        if (!confirmDelete) {
            return;
        }
        setUpdating(true);

        try {
            const response = await fetch(`${api}/api/products/${product._id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                },
            });

            if (!response.ok) {
                console.error(`Error deleting suggestion. Status: ${response.status}, ${response.statusText}`);
                return;
            }
            if (response.ok) {
                const json = await response.json();
                dispatch({
                    type: 'DELETE_ITEM',
                    collection: "products",
                    payload: json
                });
                {
                    toast.success(`${languageText.DeletedSuccessfully}`, {
                        position: "bottom-center",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark"
                    });
                }
                setUpdating(false);


            }

        } catch (error) {
            console.error('An error occurred while deleting data:', error);
        }
    };



    const TableData = ({ product }) => {
        const seller = users.find(user => user._id === product.userID);
        return (
            <tr className="TableData">
                <td style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    <img src={product.pImage} alt="" />
                    {product.pTitle}
                </td>
                {/* <Link className="DeleteButton" to={`/product/${product._id}`}><Icon icon="mdi:delete-circle" /></Link> */}
                <td>{product.pType === "Sell" ? product.pPrice + " RM" : "Donation"}</td>
                <td>{product.pCondition}</td>
                <td>{seller.userFname}</td>
                <td>{seller.userPhoneNo}</td>
                <td className={`${product.pStatus === "Valid" ? "StatusGreen" : 'StatusRed'}`}>{product.pStatus}

                    {(product.pStatus === "Valid" || product.pStatus === "Invalid") &&
                        <button className="StatusButton" onClick={(e) => handleStatusUpdate({ e, product })}>
                            {product.pStatus != "Valid" ? "Activate" : "Deactivate"}
                        </button>}
                </td>

                {/* <td className={`${status ? "StatusGreen" : 'StatusRed'}`}>
                    {status ? "Active" : "Inactive"}
                    <button className="StatusButton">{!status ? "Activate" : "Deactivate"}</button>
                </td> */}

                <td><button className='TableButton' onClick={(e) => handleDelete({ e, product })}>Delete</button></td>
            </tr>
        )
    }




    return (
        <div className="Admin">
            <h2>Manage  Products</h2>
            <div className="AdminTopRow">
                <div className="SearchBox">
                    <input
                        className="searchInput"
                        type="text"
                        name=""
                        placeholder="Search for a Product or Seller Name, Passport No, Phone No, or Email"
                        value={searchInput}
                        onChange={handleSearchInputChange}
                    />
                    <button className="searchButton" href="#">
                        <Icon icon="cil:search" />
                    </button>
                </div>

                <div className="InfoCard">
                    <Icon icon="fluent-mdl2:product-variant" className='InfoCardIcon' />
                    <div className="InfoCardText">
                        <h3>{filteredProducts.length}</h3>
                        <p>Total Products</p>
                    </div>
                </div>

            </div>

            <div className="AdminBottomRow">
                {loading ? (
                    <div className="Loader">
                        <Loader />
                        <p className="LoaderText">{languageText.Loading}</p>
                    </div>
                ) : (
                    updating ? (
                        <div className="Loader">
                            <Loader />
                            <p className="LoaderText">Updating</p>
                        </div>
                    ) : (
                        <table>
                            <tr className='TableHeading'>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Condition</th>
                                <th>Seller</th>
                                <th>Phone No</th>
                                <th>Status</th>
                                <th>Action</th>
                                {/* <th>Fine</th> */}
                            </tr>
                            { }
                            {filteredProducts.map((product) => (
                                <TableData product={product} />
                            ))}

                        </table>
                    )
                )}
            </div>
        </div>
    );
}

export default ManageProducts;