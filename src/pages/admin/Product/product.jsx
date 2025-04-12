import React from 'react';
import ProductAdmin from '../../../compoment/AdminComponent/Product';
import MenuAdmin from '../menu';
const ProductPage = () => {
    return (
        <div className="bg-gray-100 h-screen">
           <MenuAdmin/>
           <ProductAdmin/>
        </div>
    );
};
export default ProductPage;