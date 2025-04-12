import React from 'react';
import EditQuantityComponent from '../../../compoment/AdminComponent/EditQuantity';
import MenuAdmin from '../menu';
const EditQuantityPage = () => {
    return (
        <div className="bg-gray-100 h-screen">
           <MenuAdmin/>
           <EditQuantityComponent/>
        </div>
    );
};
export default EditQuantityPage;