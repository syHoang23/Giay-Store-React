import React from 'react';
import AdminDashboard from '../../../compoment/AdminComponent/Admin';
import MenuAdmin from '../menu';
const AdminPage = () => {
    return (
        <div className="bg-gray-100 h-screen">
            <MenuAdmin/>
           <AdminDashboard/>
        </div>
    );
};
export default AdminPage;