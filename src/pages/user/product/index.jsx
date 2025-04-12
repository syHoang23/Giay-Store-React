import React, { memo } from 'react';
import "./product.css";

import ProductComponent from "../../../compoment/ProductComponent/Product";



const Product = () => {
    
    return (
        <>
        <div id="wp-products">
        < ProductComponent />

            </div>
        </>
    );
};

export default memo(Product);

