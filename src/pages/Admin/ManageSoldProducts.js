import './Admin.css'
import { Icon } from '@iconify-icon/react';

const ManageSoldProducts = () => {
    const TableData = (price, status) => {
        return (
            <tr className="TableData">
                {/* <td><button className="DeleteButton"><Icon icon="mdi:delete-circle" /></button>1</td> */}
                <td>Data</td>
                <td>{price ? price + " RM" : "Donation"}</td>
                <td>Data</td>
                <td>Data</td>
                <td>Data</td>
                <td>Data</td>
                <td>Data</td>
                <td>Data</td>
                {/* <td className={`${status ? "StatusGreen" : 'StatusRed'}`}>
                    {status ? "Active" : "Inactive"}
                    <button className="StatusButton">{!status ? "Activate" : "Deactivate"}</button>
                </td> */}

                <td className={`${status ? "StatusBoxGreen" : 'StatusBoxRed'}`}>
                    {status ? "Paid" : "Unpaid"}
                    {/* <button className="StatusButton">{!status ? "Activate" : "Deactivate"}</button> */}
                </td>
                <p className='PurchaseDate'>21/23/2023</p>
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
                <table>
                    <tr className='TableHeading'>
                        <th>Id</th>
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
                    {TableData(21, true)}
                    {TableData(null, false)}

                </table>
            </div>
        </div>
    );
}

export default ManageSoldProducts;