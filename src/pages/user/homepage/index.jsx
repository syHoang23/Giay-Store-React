import React, { memo } from 'react';
import "./homepage.css";

import Banner from "../theme/banner";
import HomePageCompoment from "../../../compoment/HomPageCompoment/HomePage";



const Homepage = () => {
    
    return (
        <>
        <Banner />
        <div id="wp-products">
        < HomePageCompoment />

            </div>
        </>
    );
};

export default memo(Homepage);

