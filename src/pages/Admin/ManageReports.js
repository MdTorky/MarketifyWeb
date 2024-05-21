import './Admin.css'
import { Icon } from '@iconify-icon/react';
import React, { useState, useEffect } from 'react';
import { useItemsContext } from '../../hooks/useItemsContext'
import { useAuthContext } from '../../hooks/useAuthContext';
import Loader from "../../components/Loader/Loader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';
import Pending from '../../components/UserError/Pending';
const ManageReports = ({ api, languageText }) => {

    const { users = [], reports = [], dispatch } = useItemsContext()
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true)
    const [updating, setUpdating] = useState(false)
    const { user } = useAuthContext()
    const [searchInput, setSearchInput] = useState('');

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


                const reportResponse = await fetch(`${api}/api/reports`, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                if (!reportResponse.ok) {
                    console.error(`Error fetching Items. Status: ${reportResponse.status}, ${reportResponse.statusText}`);
                    setError('Failed to fetch data');
                    return;
                }
                const reportJson = await reportResponse.json();
                dispatch({
                    type: 'SET_ITEM',
                    collection: "reports",
                    payload: reportJson,
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


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    };

    const handleSearchInputChange = (e) => {
        setSearchInput(e.target.value);
    };



    const filteredReports = reports.filter((report) => {
        const userData = users.find(userOne => userOne._id === report.userId)
        const searchTerm = searchInput.toLowerCase();
        return (
            userData.userFname.toLowerCase().includes(searchTerm) ||
            userData.userEmail.toLowerCase().includes(searchTerm) ||
            formatDate(report.createdAt).toLowerCase().includes(searchTerm) ||
            userData.userPhoneNo.toLowerCase().includes(searchTerm)
        );
    });


    const handleStatusChange = async ({ e, report }) => {
        e.preventDefault();
        setUpdating(true);


        try {

            const response = await fetch(`${api}/api/reports/${report._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`

                },
                body: JSON.stringify({
                    reportStatus: true
                }),
            });

            if (!response.ok) {
                console.error(`Error updating form status. Status: ${response.status}, ${response.statusText}`);
                return;
            }

            const updatedData = await response.json();
            dispatch({
                type: 'UPDATE_ITEM',
                collection: 'reports',
                payload: { id: report._id, changes: updatedData },
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


    const handleDelete = async ({ e, report }) => {
        e.preventDefault();
        e.stopPropagation();


        const confirmDelete = window.confirm(languageText.AreYouSureReport);

        if (!confirmDelete) {
            return;
        }
        setUpdating(true);

        try {
            const response = await fetch(`${api}/api/reports/${report._id}`, {
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
                    collection: "reports",
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

    const TableData = ({ report }) => {
        const userData = users.find(userOne => userOne._id === report.userId)

        return (
            <tr className="TableData">
                {/* <td><button className="DeleteButton"><Icon icon="mdi:delete-circle" /></button>1</td> */}
                <td>{userData.userFname}</td>
                <td>{formatDate(report.createdAt)}</td>
                <td>{report.reportMessage}</td>
                {/* <td>{}</td> */}

                {/* <td className={`${report.reportStatus ? "StatusGreen" : 'StatusRed'}`}>
                    {report.reportStatus ? "Active" : "Inactive"}
                    <button className="StatusButton">{!report.reportStatus ? "Activate" : "Deactivate"}</button>
                </td> */}

                <td className={`StatusBox ${report.reportStatus ? "StatusBoxGreen" : 'StatusBoxYellow'}`}>
                    {report.reportStatus ? "Solved" : "Pending"}
                    {!report.reportStatus && <button className="StatusButton" onClick={(e) => handleStatusChange({ e, report })}>Resolve</button>}
                </td>
                <td><button className='TableButton' onClick={(e) => handleDelete({ e, report })}>Delete</button></td>

            </tr>
        )
    }

    return (
        <div className="Admin">
            <h2>Manage Reports</h2>
            <div className="AdminTopRow">
                <div className="SearchBox">
                    <input
                        className="searchInput"
                        type="text"
                        name=""
                        placeholder="Search for a Name, Phone No, Email, or Date"
                        value={searchInput}
                        onChange={handleSearchInputChange}
                    />
                    <button className="searchButton" href="#">
                        <Icon icon="cil:search" />
                    </button>
                </div>

                <div className="InfoCard">
                    <Icon icon="tabler:file-report" className='InfoCardIcon' />
                    <div className="InfoCardText">
                        <h3>{reports.length}</h3>
                        <p>Total Reports</p>
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
                                <th>Name</th>
                                <th>Report Date</th>
                                <th>Report Issue</th>
                                <th>Status</th>
                                <th>Action</th>

                                {/* <th>Fine</th> */}
                            </tr>

                            {filteredReports.map((report) => (
                                <TableData report={report} />
                            ))

                            }
                            {/* {TableData(true)}
                    {TableData(false)} */}

                        </table>
                    )
                )}
            </div>
        </div>
    );
}

export default ManageReports;