import React from 'react';
import ListQuantity from '../../../compoment/AdminComponent/ListQuantity';
import MenuAdmin from '../menu';
const ListQuantityPage = () => {
    return (
        <div className="bg-gray-100 h-screen">
           <MenuAdmin/>
           <ListQuantity/>
        </div>
    );
};
export default ListQuantityPage;