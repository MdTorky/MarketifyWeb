import './Admin.css'
import { Icon } from '@iconify-icon/react';

const ManageReports = () => {
    const TableData = (status) => {
        return (
            <tr className="TableData">
                {/* <td><button className="DeleteButton"><Icon icon="mdi:delete-circle" /></button>1</td> */}
                <td>Data</td>
                <td>Data</td>
                <td>Data</td>
                <td>Data</td>

                {/* <td className={`${status ? "StatusGreen" : 'StatusRed'}`}>
                    {status ? "Active" : "Inactive"}
                    <button className="StatusButton">{!status ? "Activate" : "Deactivate"}</button>
                </td> */}

                <td className={`StatusBox ${status ? "StatusBoxGreen" : 'StatusBoxYellow'}`}>
                    {status ? "Solved" : "Pending"}
                    {!status && <button className="StatusButton">Resolve</button>}
                </td>
            </tr>
        )
    }

    return (
        <div className="Admin">
            <h2>Manage Reports</h2>
            <div className="AdminTopRow">
                <div className="SearchBox">
                    <input className="searchInput" type="text" name="" placeholder="Search something" />
                    <button className="searchButton" href="#">
                        <Icon icon="cil:search" />
                    </button>
                </div>

                <div className="InfoCard">
                    <Icon icon="tabler:file-report" className='InfoCardIcon' />
                    <div className="InfoCardText">
                        <h3>2</h3>
                        <p>Total Reports</p>
                    </div>
                </div>

            </div>

            <div className="AdminBottomRow">
                <table>
                    <tr className='TableHeading'>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Report Date</th>
                        <th>Report Issue</th>
                        <th>Status</th>

                        {/* <th>Fine</th> */}
                    </tr>
                    {TableData(true)}
                    {TableData(false)}

                </table>
            </div>
        </div>
    );
}

export default ManageReports;