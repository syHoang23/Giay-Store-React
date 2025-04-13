import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
const API_URL = process.env.REACT_APP_API_URL;
const EditOrderComponent = () => {
    // Lấy Id của sản phẩm từ URL sử dụng useParams
    const { Id } = useParams();
    // State để lưu thông tin sản phẩm và các trường thông tin của sản phẩm
    const [order, setOrder] = useState(null);
    const [tenKhachHang, setTenKhachHang] = useState('');
    const [ngayDat, setNgayDat] = useState('');
    const [tongGiaTri, setTongGiaTri] = useState('');
    const [trangThai, setTrangThai] = useState('');
    const [diaChi, setDiaChi] = useState('');
    const [ngayGiao, setNgayGiao] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
      });
    // Lấy USER_ID của người dùng đã đăng nhập từ sessionStorage
    const loggedInUser_ID = sessionStorage.getItem('USER_ID');

    // Lấy ROLE của người dùng đã đăng nhập từ sessionStorage
    const loggedInUserRole = sessionStorage.getItem('ROLE');
    
    const loggedInUser_NAME = sessionStorage.getItem('USER_NAME');

    // Sử dụng useEffect để fetch thông tin sản phẩm từ server khi component được render
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`${API_URL}/order/ten-khach-hang/${Id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setOrder(data);
                setTenKhachHang(data[1]);
                setNgayDat(data[2]);
                setTongGiaTri(data[3]);
                setTrangThai(data[4]);
                setDiaChi(data[5]);
                setNgayGiao(data[6]);
                
            } catch (error) {
                console.error('Error fetching order:', error);
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
        if (!tenKhachHang || !ngayDat || !tongGiaTri || !trangThai || !diaChi || !ngayGiao) {
          alert('Please enter all required fields');
          return;
        }
        try {
          const response = await fetch(`${API_URL}/admin/order/${Id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${loggedInUser_ID}`,  // Đưa userid vào header Authorization
              'username': encodeURIComponent(loggedInUser_NAME),  // Đưa username vào header 
            },
            body: JSON.stringify({
                trangThai,
                diaChi,
                ngayGiao
             }),
          });
    
          if (response.ok) {
            // Xử lý sau khi chỉnh sửa sản phẩm thành công
            console.log('Order updated successfully');
            alert('Order updated successfully');
            navigate('/list-order'); // Điều hướng người dùng về trang chủ hoặc trang khác
          } else {
            alert('Failed to update order');
          }
        } catch (error) {
          setError('Error updating order');
          console.error('Error updating order:', error);
        }
    };
     // Nếu sản phẩm chưa được fetch, hiển thị thông báo "Loading..."
    if (!order) {
        return <div>Loading...</div>;
    }
    if (loggedInUserRole !== 'admin') {
        return <div>Loading...</div>;
    }
    // Giao diện form để người dùng chỉnh sửa thông tin sản phẩm
    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-bold mb-2">Edit Order</h2>
            <div className="mb-4">
                <label htmlFor="tenKhachHang" className="block text-gray-700 font-semibold mb-2">Tên khách hàng:</label>
                <input type="text" id="tenKhachHang" name="tenKhachHang" value={tenKhachHang} onChange={(e) => setTenKhachHang(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 w-full" readOnly required />
            </div>
            <div className="mb-4">
                <label htmlFor="ngayDat" className="block text-gray-700 font-semibold mb-2">Ngày đặt:</label>
                <input type="text" id="ngayDat" name="ngayDat" value={new Date(ngayDat).toLocaleDateString("vi-VN")} onChange={(e) => setNgayDat(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 w-full" readOnly />
            </div>
            <div className="mb-4">
                <label htmlFor="tongGiaTri" className="block text-gray-700 font-semibold mb-2">Tổng giá trị:</label>
                <input type="text" id="tongGiaTri" name="tongGiaTri" value={formatter.format(tongGiaTri)} onChange={(e) => setTongGiaTri(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 w-full" readOnly required />
            </div>
            <div className="mb-4">
                <label htmlFor="trangThai" className="block text-gray-700 font-semibold mb-2">Trạng thái:</label>
                <select
                    id="trangThai"
                    name="trangThai"
                    value={trangThai}
                    onChange={(e) => setTrangThai(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 w-full"
                    required
                    >
                    <option value="Đang xử lý">Đang xử lý</option>
                    <option value="Đang giao hàng">Đang giao hàng</option>
                    <option value="Đã giao hàng">Đã giao hàng</option>
                    <option value="Đã hủy">Đã hủy</option>
                </select>            
            </div>
            <div className="mb-4">
                <label htmlFor="diaChi" className="block text-gray-700 font-semibold mb-2">Địa chỉ:</label>
                <input type="text" id="diaChi" name="diaChi" value={diaChi} onChange={(e) => setDiaChi(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 w-full" required />
            </div>
            <div className="mb-4">
                <label htmlFor="ngayGiao" className="block text-gray-700 font-semibold mb-2">Ngày giao dự kiến:</label>
                <input type="text" id="ngayGiao" name="ngayGiao" value={ngayGiao} onChange={(e) => setNgayGiao(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 w-full" required />
            </div>
            <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200">Update Order</button>
        </form>
    );
}

export default EditOrderComponent;
