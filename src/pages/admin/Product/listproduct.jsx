import React from 'react';
import ListProduct from '../../../compoment/AdminComponent/ListProduct';
import MenuAdmin from '../menu';
const ListProductPage = () => {
    return (
        <div className="bg-gray-100 h-screen">
           <MenuAdmin/>
           <ListProduct/>
        </div>
    );
};
export default ListProductPage;