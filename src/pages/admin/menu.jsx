import React from "react";
const MenuAdmin = () => {
    return(
<nav className="bg-gray-800 p-4">
    <div className="container mx-auto flex justify-between items-center h-8"> {/* Thêm lớp h-16 để giảm chiều cao */}
        <div className="text-white font-bold">Admin Dashboard</div>
        <ul className="flex space-x-4">
            <li><a href="/" className="text-white hover:text-gray-200">WebPage</a></li>
            <li><a href="/admin" className="text-white hover:text-gray-200">Home</a></li>
            <li><a href="/list-users" className="text-white hover:text-gray-200">Users</a></li>
            <li><a href="/list-products" className="text-white hover:text-gray-200">Products</a></li>
            <li><a href="/list-quantity" className="text-white hover:text-gray-200">Quantity</a></li>
            <li><a href="/list-order" className="text-white hover:text-gray-200">Order</a></li>
            <li><a href="#" className="text-white hover:text-gray-200">Settings</a></li>
        </ul>
    </div>
</nav>

    )
}
export default MenuAdmin;