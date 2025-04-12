import React from 'react';
import EditUserComponent from '../../../compoment/AdminComponent/EditUser';
import MenuAdmin from '../menu';
const EditUserPage = () => {
    return (
        <div className="bg-gray-100 h-screen">
           <MenuAdmin/>
           <EditUserComponent/>
        </div>
    );
};
export default EditUserPage;