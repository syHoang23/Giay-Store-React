import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const EditQuantityComponent = () => {
    // Lấy Id của sản phẩm từ URL sử dụng useParams
    const { Id } = useParams();
    // State để lưu thông tin sản phẩm và các trường thông tin của sản phẩm
    const [TonKho, setTonKho] = useState(null);
    const [TenSanPham, setTenSanPham] = useState('');
    const [KichThuoc, setKichThuoc] = useState('');
    const [SoLuong, setSoLuong] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    
    // Lấy USER_ID của người dùng đã đăng nhập từ sessionStorage
    const loggedInUser_ID = sessionStorage.getItem('USER_ID');

    // Lấy ROLE của người dùng đã đăng nhập từ sessionStorage
    const loggedInUserRole = sessionStorage.getItem('ROLE');
    
    const loggedInUser_NAME = sessionStorage.getItem('USER_NAME');

    // Sử dụng useEffect để fetch thông tin sản phẩm từ server khi component được render
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:3002/quantity/${Id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setTonKho(data);
                setTenSanPham(data[2]);
                setKichThuoc(data[3]);
                setSoLuong(data[4]);
                
            } catch (error) {
                console.error('Error fetching quantity:', error);
            }
        };
        if (loggedInUserRole === 'admin') {
            fetchProduct();
        } else {
            navigate('/'); // Điều hướng người dùng về trang chủ hoặc trang khác
            alert('Quyền truy cập bị từ chối!');
        }
    // },);
    },[]);
    // Hàm xử lý khi người dùng nhấn nút "Update Quantity"
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Kiểm tra các trường bắt buộc
        if (!TenSanPham || !KichThuoc || !SoLuong) {
          alert('Please enter all required fields');
          return;
        }
        try {
          const response = await fetch(`http://localhost:3002/admin/quantity/${Id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${loggedInUser_ID}`,  // Đưa userid vào header Authorization
              'username': encodeURIComponent(loggedInUser_NAME),  // Đưa username vào header 
            },
            body: JSON.stringify({
                TenSanPham,
                KichThuoc,
                SoLuong
             }),
          });
    
          if (response.ok) {
            // Xử lý sau khi chỉnh sửa sản phẩm thành công
            console.log('Quantity updated successfully');
            alert('Quantity updated successfully');
            navigate('/list-quantity'); // Điều hướng người dùng về trang chủ hoặc trang khác
          } else {
            alert('Failed to update quantity');
          }
        } catch (error) {
          setError('Error updating quantity');
          console.error('Error updating quantity:', error);
        }
    };
     // Nếu sản phẩm chưa được fetch, hiển thị thông báo "Loading..."
    if (!TonKho) {
        return <div>Loading...</div>;
    }
    if (loggedInUserRole !== 'admin') {
        return <div>Loading...</div>;
    }
    // Giao diện form để người dùng chỉnh sửa thông tin sản phẩm
    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-bold mb-2">Edit Quantity</h2>
           
            <div className="mb-4">
                <label htmlFor="TenSanPham" className="block text-gray-700 font-semibold mb-2">Tên sản phẩm:</label>
                <input type="text" id="TenSanPham" name="TenSanPham" value={TenSanPham} onChange={(e) => setTenSanPham(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 w-full" readOnly required />
            </div>
            <div className="mb-4">
                <label htmlFor="KichThuoc" className="block text-gray-700 font-semibold mb-2">Kích Thước:</label>
                <input type="number" id="KichThuoc" name="KichThuoc" min="35" max="45" value={KichThuoc} onChange={(e) => setKichThuoc(parseInt(e.target.value))} className="border border-gray-300 rounded-md px-3 py-2 w-full" required />
            </div>
            <div className="mb-4">
                <label htmlFor="SoLuong" className="block text-gray-700 font-semibold mb-2">Số Lượng:</label>
                <input type="number" id="SoLuong" name="SoLuong" value={SoLuong} onChange={(e) => setSoLuong(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 w-full" required />
            </div>
            <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200">Update Quantity</button>
        </form>
    );
}

export default EditQuantityComponent;
