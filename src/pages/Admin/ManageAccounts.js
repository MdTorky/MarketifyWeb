import Fine from '../../components/Fine/Fine';
import './Admin.css'
import { Icon } from '@iconify-icon/react';
import React, { useState } from 'react';

const ManageAccounts = () => {

    const [isFineFormOpen, setFineFormOpen] = useState(false);


    const openFineForm = () => {
        setFineFormOpen(true);
    };

    const CloseFineForm = () => {
        setFineFormOpen(false);
    };

    const TableData = (status, fine, proof) => {
        return (
            <tr className="TableData">
                <td><button className="DeleteButton"><Icon icon="mdi:delete-circle" /></button>1</td>
                <td>Data</td>
                <td>Data</td>
                <td>Data</td>
                <td>Data</td>
                <td className="StatusGreen">
                    A12123124
                    {proof && <button className="StatusButton">View Proof</button>}
                </td>
                <td>Data</td>
                <td className={`${status ? "StatusGreen" : 'StatusRed'}`}>
                    {status ? "Active" : "Inactive"}
                    <button className="StatusButton">{!status ? "Activate" : "Deactivate"}</button>
                </td>

                <td>{fine ? fine + " RM" : <button className='TableButton' onClick={openFineForm}>Add</button>}</td>
            </tr>
        )
    }

    return (
        <div className="Admin">
            <h2>Manage  Accounts</h2>
            <div className="AdminTopRow">
                <div className="SearchBox">
                    <input className="searchInput" type="text" name="" placeholder="Search something" />
                    <button className="searchButton" href="#">
                        <Icon icon="cil:search" />
                    </button>
                </div>

                <div className="InfoCard">
                    <Icon icon="mdi:accounts-group" className='InfoCardIcon' />
                    <div className="InfoCardText">
                        <h3>2</h3>
                        <p>Total Accounts</p>
                    </div>
                </div>
            </div>

            <div className="AdminBottomRow">
                <table>
                    <tr className='TableHeading'>
                        <th>Id</th>
                        <th>Username</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone No</th>
                        <th>Passport</th>
                        <th>Address</th>
                        <th>Status</th>
                        <th>Fine</th>
                    </tr>
                    {TableData(true, 12, true)}
                    {TableData(false, null, false)}

                </table>
            </div>
            {isFineFormOpen && (

                <Fine CloseFineForm={CloseFineForm} />
            )}
        </div>
    );
}

export default ManageAccounts;