import React from 'react';
import ADDPRODUCT from '../../../compoment/AdminComponent/Addproduct';
import MenuAdmin from '../menu';
const AddProductPage = () => {
    return (
        <div className="bg-gray-100 h-screen">
           <MenuAdmin/>
           <ADDPRODUCT/>
        </div>
    );
};
export default AddProductPage;