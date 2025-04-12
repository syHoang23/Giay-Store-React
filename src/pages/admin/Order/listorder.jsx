import React from 'react';
import ListOrder from '../../../compoment/AdminComponent/ListOrder';
import MenuAdmin from '../menu';
const ListOrderPage = () => {
    return (
        <div className="bg-gray-100 h-screen">
           <MenuAdmin/>
           <ListOrder/>
        </div>
    );
};
export default ListOrderPage;