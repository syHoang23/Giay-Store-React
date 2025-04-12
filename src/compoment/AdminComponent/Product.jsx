import React from 'react';
import { Link } from 'react-router-dom';

const ProductAdmin = () => {
    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold mb-4">Product Page</h1>
            <Link to="/list-products">
            <div className="mb-4">View Product List
            </div>
            </Link>
            <div className="mb-4">
            <Link to="/add-product">
                <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200">
                    Add New Product
                </button>
                </Link>
            </div>
        </div>
    );
}

export default ProductAdmin;
