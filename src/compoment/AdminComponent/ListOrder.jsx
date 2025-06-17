import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
const API_URL = process.env.REACT_APP_API_URL;
// Component để hiển thị danh sách sản phẩm
const ListOrder = () => {
    // State để lưu danh sách sản phẩm và trang hiện tại
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 6; // Số lượng sản phẩm trên mỗi trang
    const navigate = useNavigate();
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    });
    // Lấy USER_ID của người dùng đã đăng nhập từ sessionStorage
    // const loggedInUser_ID = sessionStorage.getItem('USER_ID');
    
    // Lấy ROLE của người dùng đã đăng nhập từ sessionStorage
    const loggedInUserRole = sessionStorage.getItem('ROLE');

    // const loggedInUser_NAME = sessionStorage.getItem('USER_NAME');

    // Hàm fetch dữ liệu sản phẩm từ server
    const fetchData = async () => {
        try {
            const response = await fetch(`${API_URL}/order`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    

    // Sử dụng useEffect để fetch dữ liệu khi component được render
    useEffect(() => {
        if (loggedInUserRole === 'admin') {
            fetchData();
        } else {
            navigate('/'); // Điều hướng người dùng về trang chủ hoặc trang khác
            alert('Quyền truy cập bị từ chối!');
        }
    // });
    }, []);
    
    // Tính số trang
    const totalPages = Math.ceil(products.length / productsPerPage);

    // Lấy sản phẩm của trang hiện tại
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    // Hàm xử lý khi chuyển trang
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo(0, 0); // Cuộn lên đầu trang khi chuyển trang
    };

    // Giao diện danh sách sản phẩm và các nút chuyển trang
    return (
        <>
            <div className="bg-white" style={{marginLeft:'-20px'}}>
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 text-center mb-8">Danh Sách Đơn Hàng</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    {/* Tiêu đề của các cột */}
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên khách hàng</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày đặt hàng</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tổng giá trị</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Địa chỉ</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phương thức thanh toán</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày giao dự kiến</th>
                                    <th scope="col" className="relative px-6 py-3"><span className="sr-only">Edit</span></th>
                                    <th scope="col" className="relative px-6 py-3"><span className="sr-only">Check</span></th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {/* Hiển thị thông tin của từng sản phẩm */}
                                {currentProducts.map((product, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product[0]}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product[1]}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(product[2]).toLocaleTimeString("vi-VN")}, {new Date(product[2]).toLocaleDateString("vi-VN")}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatter.format(product[3])}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product[4]}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product[5]}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">COD</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(product[6]).toLocaleDateString("vi-VN")}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            {/* Nút "Edit" để chuyển hướng đến trang chỉnh sửa sản phẩm */}
                                            <Link to={`/edit-order/${product[0]}`} className="text-indigo-600 hover:text-indigo-900">Edit</Link>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            {/* Nút "Edit" để chuyển hướng đến trang chỉnh sửa sản phẩm */}
                                            <Link to={`/order/${product[0]}`} className="text-indigo-600 hover:text-indigo-900">Check</Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Hiển thị danh sách các trang */}
            <div className="list-page">
                {Array.from({ length: totalPages }).map((_, index) => (
                    <div key={index} className="item">
                        <button className='primary-button' onClick={() => handlePageChange(index + 1)}>{index + 1}</button>
                    </div>
                ))}
            </div>
        </>
    );
};

export default ListOrder;

