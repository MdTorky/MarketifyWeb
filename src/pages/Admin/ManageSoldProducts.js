import './Admin.css'
import { Icon } from '@iconify-icon/react';
import React, { useState, useEffect } from 'react';
import { useItemsContext } from '../../hooks/useItemsContext'
import { useAuthContext } from '../../hooks/useAuthContext';
import Loader from "../../components/Loader/Loader";
import { Link } from 'react-router-dom';
const ManageSoldProducts = ({ api, languageText }) => {
    const { users = [], transactions = [], products = [], dispatch } = useItemsContext()
    const { user } = useAuthContext()
    const [searchInput, setSearchInput] = useState('');

    const [loading, setLoading] = useState(true)
    const [updating, setUpdating] = useState(false)
    const [error, setError] = useState(null);





    useEffect(() => {
        const fetchItems = async () => {
            setLoading(true)

            try {

                const response = await fetch(`${api}/api/transactions`, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                if (!response.ok) {
                    console.error(`Error fetching Items. Status: ${response.status}, ${response.statusText}`);
                    setError('Failed to fetch data');

                    return;
                }
                const json = await response.json()

                dispatch({
                    type: 'SET_ITEM',
                    collection: "transactions",
                    payload: json,
                });


                const userResponse = await fetch(`${api}/api/user`, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                if (!response.ok) {
                    console.error(`Error fetching Items. Status: ${response.status}, ${response.statusText}`);
                    setError('Failed to fetch data');

                    return;
                }
                const userJson = await userResponse.json()

                dispatch({
                    type: 'SET_ITEM',
                    collection: "users",
                    payload: userJson,
                });


                const productResponse = await fetch(`${api}/api/products`, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                if (!response.ok) {
                    console.error(`Error fetching Items. Status: ${response.status}, ${response.statusText}`);
                    setError('Failed to fetch data');

                    return;
                }
                const productJson = await productResponse.json()

                dispatch({
                    type: 'SET_ITEM',
                    collection: "products",
                    payload: productJson,
                });


                setLoading(false)


            } catch (error) {
                console.error('An error occurred while fetching data:', error);
                setError('An error occurred while fetching data');

            }
        };

        if (user) {
            fetchItems()
        }
    }, [api, dispatch, user])


    const filteredTransactions = transactions.filter((transaction) => {
        const seller = users.find(user => user._id === transaction.sellerID);
        const buyer = users.find(user => user._id === transaction.buyerID);
        const product = products.find(product => product._id === transaction.productID)
        const { paymentMethod, transactionStatus } = transaction;
        const searchTerm = searchInput.toLowerCase();
        return (
            paymentMethod.toLowerCase().includes(searchTerm) ||
            transactionStatus.toLowerCase().includes(searchTerm) ||
            seller.userFname.toLowerCase().includes(searchTerm) ||
            seller.userEmail.toLowerCase().includes(searchTerm) ||
            seller.userPhoneNo.toLowerCase().includes(searchTerm) ||
            seller.userPassport.toLowerCase().includes(searchTerm) ||
            buyer.userFname.toLowerCase().includes(searchTerm) ||
            buyer.userEmail.toLowerCase().includes(searchTerm) ||
            buyer.userPhoneNo.toLowerCase().includes(searchTerm) ||
            buyer.userPassport.toLowerCase().includes(searchTerm) ||
            product.pTitle.toLowerCase().includes(searchTerm) ||
            product.pStatus.toLowerCase().includes(searchTerm)
            // users.some((user) => (
            //     user.userFname.toLowerCase().includes(searchTerm) ||
            //     user.userPhoneNo.toLowerCase().includes(searchTerm)
            // ))
        );
    });

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    };


    const TableData = ({ transaction }) => {
        const seller = users.find(user => user._id === transaction.sellerID);
        const buyer = users.find(user => user._id === transaction.buyerID);
        const product = products.find(product => product._id === transaction.productID)
        return (
            <tr className="TableData">
                {/* <td><button className="DeleteButton"><Icon icon="mdi:delete-circle" /></button>1</td> */}
                <td style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    <img src={product?.pImage} alt="" />
                    {product?.pTitle}
                </td>
                <td>{product?.pType === "Sell" ? product.pPrice + " RM" : "Donation"}</td>

                <td>{seller?.userFname}</td>
                <td>{seller?.userPhoneNo}</td>
                <td>{buyer?.userFname}</td>
                <td>{buyer?.userPhoneNo}</td>
                <td>{transaction?.paymentMethod}</td>
                {/* <td>{transaction?.transactionStatus}</td> */}

                <td className={`${transaction?.transactionStatus === "Paid" ? "StatusBoxGreen" : 'StatusBoxRed'}`}>
                    {transaction?.transactionStatus}
                </td>

                <p className='PurchaseDate'>{formatDate(transaction.createdAt)}</p>
            </tr>
        )
    }

    return (
        <div className="Admin">
            <h2>Manage Sold Products</h2>
            <div className="AdminTopRow">
                <div className="SearchBox">
                    <input className="searchInput" type="text" name="" placeholder="Search something" />
                    <button className="searchButton" href="#">
                        <Icon icon="cil:search" />
                    </button>
                </div>

                <div className="InfoCard">
                    <Icon icon="mdi:package-variant-closed-check" className='InfoCardIcon' />
                    <div className="InfoCardText">
                        <h3>2</h3>
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
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Seller</th>
                                <th>Seller Phone</th>
                                <th>Buyer</th>
                                <th>Buyer Phone</th>
                                <th>Payment Method</th>
                                <th>Status</th>
                                {/* <th>Fine</th> */}
                            </tr>
                            {filteredTransactions.map((transaction) => (
                                <TableData transaction={transaction} />
                            ))}

                            {/* {TableData(21, true)}
                    {TableData(null, false)} */}

                        </table>
                    )
                )}
            </div>
        </div>
    );
}

export default ManageSoldProducts;