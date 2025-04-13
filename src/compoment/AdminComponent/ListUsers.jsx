import React, { useState, useEffect } from "react";
// import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
const API_URL = process.env.REACT_APP_API_URL;
// Component để hiển thị danh sách người dùng
const ListUser = () => {
    // State để lưu danh sách người dùng và trang hiện tại
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 6; // Số lượng người dùng trên mỗi trang
    const navigate = useNavigate();

    // Lấy ROLE của người dùng đã đăng nhập từ sessionStorage
    const loggedInUserRole = sessionStorage.getItem('ROLE');
    // Hàm fetch dữ liệu người dùng từ server
    const fetchData = async () => {
        try {
            const response = await fetch(`${API_URL}/admin/users`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setUsers(data);
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
    // const handleDeleteUser = async (id) => {
    //     try {
    //         const response = await fetch('http://localhost:3002/admin/delete-user', {
    //             method: 'post',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({ id: id })
    //         });

    //         if (response.ok) {
    //             // Fetch lại danh sách người dùng sau khi xóa thành công
    //             fetchData();
    //             alert('Người dùng đã được xóa khỏi hệ thống');
    //         } else {
    //             alert('Không thể xóa người dùng khỏi hệ thống');
    //         }
    //     } catch (error) {
    //         alert('Lỗi xóa người dùng:', error);
    //     }
    // };

    // Tính số trang
    const totalPages = Math.ceil(users.length / usersPerPage);

    // Lấy người dùng của trang hiện tại
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    // Hàm xử lý khi chuyển trang
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo(0, 0); // Cuộn lên đầu trang khi chuyển trang
    };

    // Giao diện danh sách người dùng và các nút chuyển trang
    return (
        <>
            <div className="bg-white" style={{ marginLeft: '-20px' }}>
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 text-center mb-8">Danh Sách Người Dùng</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    {/* Tiêu đề của các cột */}
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Id</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên đăng nhập</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên đầy đủ</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số điện thoại</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Địa chỉ</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày đăng kí</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quyền</th>
                                    <th scope="col" className="relative px-6 py-3"><span className="sr-only">Edit</span></th>
                                    <th scope="col" className="relative px-6 py-3"><span className="sr-only">Delete</span></th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {/* Hiển thị thông tin của từng người dùng */}
                                {currentUsers.map((user, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user[0]}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user[1]}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user[3]}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user[4]}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user[5]}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user[6]}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(user[7]).toLocaleDateString("vi-VN")}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user[8]}</td>
                                      
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            {/* Nút "Delete" để xóa người dùng */}
                                            {/* <button onClick={() => handleDeleteUser(user[0])} className="text-red-600 hover:text-red-900">Delete</button> */}
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

export default ListUser;
