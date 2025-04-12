import React from 'react';
import ADDQUANTITY from '../../../compoment/AdminComponent/Addquantity';
import MenuAdmin from '../menu';
const AddQuantityPage = () => {
    return (
        <div className="bg-gray-100 h-screen">
           <MenuAdmin/>
           <ADDQUANTITY/>
        </div>
    );
};
export default AddQuantityPage;