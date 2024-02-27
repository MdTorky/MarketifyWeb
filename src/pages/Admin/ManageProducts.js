import './Admin.css'
import { Icon } from '@iconify-icon/react';

const ManageProducts = () => {
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
        </div>
    );
}

export default ManageProducts;