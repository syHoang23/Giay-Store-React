import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

// Component để hiển thị danh sách sản phẩm
const ListQuantity = () => {
    // State để lưu danh sách sản phẩm và trang hiện tại
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 11; // Số lượng sản phẩm trên mỗi trang
    const navigate = useNavigate();
    // Lấy USER_ID của người dùng đã đăng nhập từ sessionStorage
    const loggedInUser_ID = sessionStorage.getItem('USER_ID');
    
    // Lấy ROLE của người dùng đã đăng nhập từ sessionStorage
    const loggedInUserRole = sessionStorage.getItem('ROLE');

    const loggedInUser_NAME = sessionStorage.getItem('USER_NAME');

    // Hàm fetch dữ liệu sản phẩm từ server
    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:3002/quantity');
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

    // Hàm xử lý khi người dùng nhấn nút "Delete"
    const handleDeleteItem = async (Id,TenSanPham) => {
        try {
            const response = await fetch('http://localhost:3002/admin/delete-quantity', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${loggedInUser_ID}`,  // Đưa userid vào header Authorization
                    'username': encodeURIComponent(loggedInUser_NAME),  // Đưa username vào header 

                },
                body: JSON.stringify({ID: Id, TenSanPham: TenSanPham })
            });
    
            if (response.ok) {
                // Fetch lại danh sách sản phẩm sau khi xóa thành công
                fetchData();
                alert('Số lượng sản phẩm đã được xóa khỏi database');
            } else {
                alert('Không thể xóa số lượng sản phẩm khỏi database');
            }
        } catch (error) {
            alert('Lỗi xóa số lượng sản phẩm:', error);
        }
    };
    
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
           <Link to="/add-quantity">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-200" style={{ marginTop: '10px', marginLeft: '20px' }}>
                    Add New Quantity
                </button>
            </Link>

            <div className="bg-white" style={{marginLeft:'-20px'}}>
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 text-center mb-8">Danh Sách Số Lượng Sản Phẩm</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    {/* Tiêu đề của các cột */}
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Sản Phẩm</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên sản phẩm</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kích Thước</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số Lượng</th>
                                    <th scope="col" className="relative px-6 py-3"><span className="sr-only">Edit</span></th>
                                    <th scope="col" className="relative px-6 py-3"><span className="sr-only">Delete</span></th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {/* Hiển thị thông tin của từng sản phẩm */}
                                {currentProducts.map((product, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product[0]}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product[1]}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product[2]}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product[3]}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product[4]}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            {/* Nút "Edit" để chuyển hướng đến trang chỉnh sửa sản phẩm */}
                                            <Link to={`/edit-quantity/${product[0]}`} className="text-indigo-600 hover:text-indigo-900">Edit</Link>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            {/* Nút "Delete" để xóa sản phẩm */}
                                            <button onClick={() => { if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm?")) {handleDeleteItem(product[0],product[2]);}}}className="text-red-600 hover:text-red-900">Delete</button>
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

export default ListQuantity;

