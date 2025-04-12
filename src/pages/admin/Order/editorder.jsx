import React from 'react';
import EditOrderComponent from '../../../compoment/AdminComponent/EditOrder';
import MenuAdmin from '../menu';
const EditOrderPage = () => {
    return (
        <div className="bg-gray-100 h-screen">
           <MenuAdmin/>
           <EditOrderComponent/>
        </div>
    );
};
export default EditOrderPage;