import Fine from '../../components/Fine/Fine';
import UserError from '../../components/UserError/UserError';
import './Admin.css'
import { Icon } from '@iconify-icon/react';
import React, { useState, useEffect } from 'react';
import { useItemsContext } from '../../hooks/useItemsContext'
import { useAuthContext } from '../../hooks/useAuthContext';
import Loader from "../../components/Loader/Loader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ManageAccounts = ({ api, languageText }) => {

    const [isFineFormOpen, setFineFormOpen] = useState(false);
    const [isUserErrorFormOpen, setErrorFormOpen] = useState(false);
    const { users = [], dispatch } = useItemsContext()
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true)
    const [updating, setUpdating] = useState(false)
    // const navigate = useNavigate();
    const { user } = useAuthContext()
    const [userOneError, setUserOneError] = useState(null);
    const [searchInput, setSearchInput] = useState('');

    const openFineForm = (userOne) => {
        setUserOneError(userOne);
        setFineFormOpen(true);
    };

    const CloseFineForm = () => {
        setFineFormOpen(false);
    };

    const openErrorForm = (userOne) => {
        setUserOneError(userOne);
        setErrorFormOpen(true);
    };

    const CloseErrorForm = () => {
        setErrorFormOpen(false);
    };


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
                const filteredJson = json.filter((userOne) => userOne.userType != "admin");
                dispatch({
                    type: 'SET_ITEM',
                    collection: "users",
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
    }, [api, dispatch]);



    const handleStatusUpdate = async ({ e, userOne }) => {
        e.preventDefault();
        setUpdating(true);


        try {
            let userStatus = userOne.userStatus;
            if (userOne.userStatus === "Active") {
                userStatus = "Inactive"
                openErrorForm(userOne)
            }
            else if (userOne.userStatus === "Inactive") {
                userStatus = "Active"
            }
            else if (userOne.userStatus === "Waiting") {
                userStatus = "Active"
            }

            const response = await fetch(`${api}/api/user/${userOne._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userStatus: userStatus
                }),
            });

            if (!response.ok) {
                console.error(`Error updating form status. Status: ${response.status}, ${response.statusText}`);
                return;
            }

            const updatedData = await response.json();
            dispatch({
                type: 'UPDATE_ITEM',
                collection: 'users',
                payload: { id: userOne._id, changes: updatedData },
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



    const handleStatusUpdateSecond = async ({ e, userOne, status }) => {
        e.preventDefault();
        setUpdating(true);


        try {
            let userStatus = null;
            if (status === "Pending") {
                userStatus = "Pending"
                openErrorForm(userOne)
            }
            else if (status === "Activate") {
                userStatus = "Active"
            }

            const response = await fetch(`${api}/api/user/${userOne._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userStatus: userStatus
                }),
            });

            if (!response.ok) {
                console.error(`Error updating form status. Status: ${response.status}, ${response.statusText}`);
                return;
            }

            const updatedData = await response.json();
            dispatch({
                type: 'UPDATE_ITEM',
                collection: 'users',
                payload: { id: userOne._id, changes: updatedData },
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


    // const userLength = users.

    const handleSearchInputChange = (e) => {
        setSearchInput(e.target.value);
    };

    // const filteredUsers = users.filter((userOne) => {
    //     // return userOne.userFname.toLowerCase().includes(searchInput.toLowerCase());

    // });


    const filteredUsers = users.filter((userOne) => {
        const { userFname, userEmail, userPassport, userPhoneNo } = userOne;
        const searchTerm = searchInput.toLowerCase();
        return (
            userFname.toLowerCase().includes(searchTerm) ||
            userEmail.toLowerCase().includes(searchTerm) ||
            userPassport.toLowerCase().includes(searchTerm) ||
            userPhoneNo.toLowerCase().includes(searchTerm)
        );
    });
    const TableData = ({ userOne }) => {
        return (
            <tr className="TableData">
                {/* <td><button className="DeleteButton"><Icon icon="mdi:delete-circle" /></button>1</td> */}
                {/* <td>Data</td> */}
                <td>{userOne.userFname}</td>
                <td className='UserEmail'>{userOne.userEmail}</td>
                <td>{userOne.userPhoneNo}</td>
                <td className="StatusGreen">
                    {userOne.userPassport}
                    {userOne.userPassportImage && <button className="StatusButton" onClick={() => { window.open(userOne.userPassportImage, "_blank") }}>View Proof</button>}
                </td>
                <td>{userOne.userAddress}</td>
                <td className={`${userOne.userStatus === "Active" ? "StatusGreen" : 'StatusRed'}`}>
                    {userOne.userStatus}
                    {/* <button className="StatusButton" oncClick={handleStatusUpdate({ user })}>{userOne.userStatus === "NotActive" || userOne.userStatus === "Waiting" ? "Activate" : "Deactivate"}</button> */}
                    {(userOne.userStatus === "Active" || userOne.userStatus === "Inactive") && <button className="StatusButton" onClick={(e) => handleStatusUpdate({ e, userOne: userOne })}>
                        {userOne.userStatus === "Inactive" || userOne.userStatus === "Waiting" ? "Activate" : "Deactivate"}
                    </button>}
                    {userOne.userStatus === "Pending" && <button className="StatusButton" onClick={(e) => handleStatusUpdate({ e, userOne: userOne })}>
                        {userOne.userStatus === "Pending" && "Send Message"}
                    </button>}
                    {userOne.userStatus === "Waiting" &&
                        <div className="StatusButtons">
                            <button className="StatusButton StatusButton1" onClick={(e) => handleStatusUpdateSecond({ e, userOne: userOne, status: "Activate" })}>
                                Activate
                            </button>
                            <button className="StatusButton StatusButton2" onClick={(e) => handleStatusUpdateSecond({ e, userOne: userOne, status: "Pending" })}>
                                Pending
                            </button>
                        </div>


                    }
                </td>

                <td>{userOne.userFine ? userOne.userFine + " RM" : <button className='TableButton' onClick={() => openFineForm(userOne)}>Add</button>}</td>
            </tr>
        )
    }

    return (
        <div className="Admin">
            <h2>Manage Accounts</h2>
            <div className="AdminTopRow">
                <div className="SearchBox">
                    <input
                        className="searchInput"
                        type="text"
                        name=""
                        placeholder="Search for a Name, Passport No, Phone No, or Email"
                        value={searchInput}
                        onChange={handleSearchInputChange}
                    />
                    <button className="searchButton" href="#">
                        <Icon icon="cil:search" />
                    </button>
                </div>
                <div className="InfoCard">
                    <Icon icon="mdi:accounts-group" className='InfoCardIcon' />
                    <div className="InfoCardText">
                        <h3>{users.length}</h3>
                        <p>Total Accounts</p>
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
                                {/* <th>Id</th> */}
                                {/* <th>Username</th> */}
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone No</th>
                                <th>Passport</th>
                                <th>Address</th>
                                <th>Status</th>
                                <th>Fine</th>
                            </tr>
                            {/* {users.map((userOne) => (
                                <TableData userOne={userOne} />
                                { isUserErrorFormOpen && (

                                    <UserError CloseErrorForm={CloseErrorForm} userOne={userOne} api={api} />
                                )}
                            ))} */}

                            {filteredUsers.map((userOne) => (

                                <TableData userOne={userOne} />



                            ))}
                            {/* {isUserErrorFormOpen && (

                                <UserError CloseErrorForm={CloseErrorForm} userOne={userOne} />
                            )} */}
                            {isFineFormOpen && (

                                <Fine CloseFineForm={CloseFineForm} userOne={userOneError} api={api} />
                            )}
                            {/* {isUserErrorFormOpen && (
                                // <UserError CloseErrorForm={CloseErrorForm} api={api} />
                                
                            )} */}
                            {isUserErrorFormOpen && (
                                <UserError CloseErrorForm={CloseErrorForm} userOne={userOneError} api={api} />
                            )}

                        </table>
                    )
                )}
            </div>

        </div>
    );
}

export default ManageAccounts;