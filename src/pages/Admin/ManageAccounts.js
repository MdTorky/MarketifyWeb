import './Admin.css'
import { Icon } from '@iconify-icon/react';

const ManageAccounts = () => {



    const TableData = (status, fine) => {
        return (
            <tr className="TableData">
                <td><button className="DeleteButton"><Icon icon="mdi:delete-circle" /></button>1</td>
                <td>Data</td>
                <td>Data</td>
                <td>Data</td>
                <td>Data</td>
                <td>Data</td>
                <td className={`${status ? "StatusGreen" : 'StatusRed'}`}>
                    {status ? "Active" : "Inactive"}
                    <button className="StatusButton">{!status ? "Activate" : "Deactivate"}</button>
                </td>

                <td>{fine ? fine + " RM" : <button className='TableButton'>Add</button>}</td>
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
                        <th>Address</th>
                        <th>Status</th>
                        <th>Fine</th>
                    </tr>
                    {TableData(true, 12)}
                    {TableData(false, null)}

                </table>
            </div>
        </div>
    );
}

export default ManageAccounts;