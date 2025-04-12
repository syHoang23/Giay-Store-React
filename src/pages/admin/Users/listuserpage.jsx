import React from 'react';
import ListUser from '../../../compoment/AdminComponent/ListUsers';
import MenuAdmin from '../menu';
const ListUsersPage = () => {
    return (
        <div className="bg-gray-100 h-screen">
           <MenuAdmin/>
           <ListUser/>
        </div>
    );
};
export default ListUsersPage;