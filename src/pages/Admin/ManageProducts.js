import './Admin.css'
import { Icon } from '@iconify-icon/react';

const ManageProducts = () => {
    const TableData = () => {
        return (
            <tr className="TableData">
                <td><button className="DeleteButton"><Icon icon="mdi:delete-circle" /></button>1</td>
                <td>Data</td>
                <td>Data</td>
                <td>Data</td>
                <td>Data</td>
                {/* <td className={`${status ? "StatusGreen" : 'StatusRed'}`}>
                    {status ? "Active" : "Inactive"}
                    <button className="StatusButton">{!status ? "Activate" : "Deactivate"}</button>
                </td> */}

                <td><button className='TableButton'>Delete</button></td>
            </tr>
        )
    }

    return (
        <div className="Admin">
            <h2>Manage  Products</h2>
            <div className="AdminTopRow">
                <div className="SearchBox">
                    <input className="searchInput" type="text" name="" placeholder="Search something" />
                    <button className="searchButton" href="#">
                        <Icon icon="cil:search" />
                    </button>
                </div>

                <div className="InfoCard">
                    <Icon icon="fluent-mdl2:product-variant" className='InfoCardIcon' />
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
                        <th>Name</th>
                        <th>Price</th>
                        <th>Seller</th>
                        <th>Phone No</th>
                        <th>Action</th>
                        {/* <th>Fine</th> */}
                    </tr>
                    {TableData()}
                    {TableData()}

                </table>
            </div>
        </div>
    );
}

export default ManageProducts;