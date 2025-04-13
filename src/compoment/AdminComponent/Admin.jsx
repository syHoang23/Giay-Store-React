import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const API_URL = process.env.REACT_APP_API_URL;
const AdminDashboard = () => {
    const [totals, setTotals] = useState({ totalCustomers: 0, totalProducts: 0, recentAction: [] });
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 10; // Số lượng sản phẩm trên mỗi trang
    // Lấy ROLE của người dùng đã đăng nhập từ sessionStorage
    const loggedInUserRole = sessionStorage.getItem('ROLE');
    

    // Tính số trang
    const totalPages = Math.ceil(totals.recentAction.length / productsPerPage);

    // Lấy sản phẩm của trang hiện tại
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = totals.recentAction.slice(indexOfFirstProduct, indexOfLastProduct);

    // Hàm xử lý khi chuyển trang
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo(0, 0); // Cuộn lên đầu trang khi chuyển trang
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_URL}/admin`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setTotals(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        if (loggedInUserRole === 'admin') {
            fetchData();
        } else {
            navigate('/'); // Điều hướng người dùng về trang chủ hoặc trang khác
            alert('Quyền truy cập bị từ chối! Bạn không có quyền Admin!!!');
        }
    // });
    }, []);
    
    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold mb-4">Welcome to Admin Dashboard</h1>
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-bold mb-2">Total Users</h2>
                    <p className="text-gray-700">{totals.totalCustomers}</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-bold mb-2">Total Products</h2>
                    <p className="text-gray-700">{totals.totalProducts}</p>
                </div>
                <div className="bg-white p-4 rounded shadow col-span-2">
                    <h2 className="text-xl font-bold mb-2">Recent Activities</h2>
                    <ul>
                        {currentProducts.map((action, index) => (
                            <li key={index} className="text-gray-700">{`${new Date(action.create_at).toLocaleDateString("vi-VN")}, ${new Date(action.create_at).toLocaleTimeString("vi-VN")} | Admin ${action.userName} ${action.action}`}</li>
                        ))}
                    </ul>
                </div>
            </div>
            {/* Hiển thị danh sách các trang */}
            <div style={{ display: 'flex', gap: '10px', marginLeft: '20%'}}>
                {Array.from({ length: totalPages }).map((_, index) => (
                    <div key={index} className="item">
                        <button className='primary-button' onClick={() => handlePageChange(index + 1)}>{index + 1}</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AdminDashboard;