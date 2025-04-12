import React from 'react';
import EditProductComponent from '../../../compoment/AdminComponent/EditProduct';
import MenuAdmin from '../menu';
const EditProductPage = () => {
    return (
        <div className="bg-gray-100 h-screen">
           <MenuAdmin/>
           <EditProductComponent/>
        </div>
    );
};
export default EditProductPage;