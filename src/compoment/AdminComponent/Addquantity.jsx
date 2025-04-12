import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ADDQUANTITY = () => {
    // State để lưu thông tin sản phẩm mới
    const [TenSanPham, setTenSanPham] = useState('');
    const [tenSanPhamList, setTenSanPhamList] = useState([]);
    const [KichThuoc, setKichThuoc] = useState('');
    const [SoLuong, setSoLuong] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    // Hàm tải danh sách các loại giày dựa vào hãng (có thể gọi khi component mount)
    useEffect(() => {
      const fetchSanPham = async () => {
          try {
              const response = await fetch('http://localhost:3002/admin/san-pham');
              const data = await response.json();
              setTenSanPhamList(data);
          } catch (error) {
              console.error('Error fetching TenSanPham:', error);
          }
      };
      fetchSanPham();
  }, []);
    // Lấy USER_ID của người dùng đã đăng nhập từ sessionStorage
    const loggedInUser_ID = sessionStorage.getItem('USER_ID');
    const loggedInUser_NAME = sessionStorage.getItem('USER_NAME');
    // Lấy ROLE của người dùng đã đăng nhập từ sessionStorage
    // const loggedInUserRole = sessionStorage.getItem('ROLE');
     // Hàm xử lý khi admin nhấn nút "Thêm sản phẩm"
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Kiểm tra các trường bắt buộc
        if (!TenSanPham || !KichThuoc || !SoLuong) {
          alert('Please enter all required fields');
          return;
        }
        try {
          const response = await fetch('http://localhost:3002/admin/quantity', {
            method: 'POST',
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
            // Xử lý sau khi thêm sản phẩm thành công
            console.log('Quantity added successfully');
            alert('Quantity added successfully');
            navigate('/list-quantity'); // Điều hướng người dùng về trang chủ hoặc trang khác
          } else {
            alert('Không thể thể thêm sản phẩm vào database');
          }
        } catch (error) {
          setError('Error adding quantity');
          console.error('Error adding quantity:', error);
        }
    };
     // Giao diện form để người dùng nhập thông tin sản phẩm mới
    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-bold mb-2">Add New Product</h2>
            
            <div className="mb-4">
                <label htmlFor="TenSanPham" className="block text-gray-700 font-semibold mb-2">Tên Sản Phẩm:</label>
                <select 
                    id="TenSanPham" 
                    name="TenSanPham" 
                    value={TenSanPham} 
                    onChange={(e) => setTenSanPham(e.target.value)} 
                    className="border border-gray-300 rounded-md px-3 py-2 w-full"
                >
                    <option value="">Chọn Tên Sản Phẩm</option>
                    {tenSanPhamList.map((sanpham) => (
                        sanpham[0] && sanpham[1] ? (
                            <option key={sanpham[0]} value={sanpham[1]}>
                                {sanpham[1]}
                            </option>
                        ) : null
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label htmlFor="KichThuoc" className="block text-gray-700 font-semibold mb-2">Kích Thước:</label>
                <input type="text" id="KichThuoc" name="KichThuoc" value={KichThuoc} onChange={(e) => setKichThuoc(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 w-full" required />
            </div>
            <div className="mb-4">
                <label htmlFor="SoLuong" className="block text-gray-700 font-semibold mb-2">Số Lượng:</label>
                <input type="text" id="Gia" name="SoLuong" value={SoLuong} onChange={(e) => setSoLuong(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 w-full" required />
            </div>
            <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200">Add Quantity</button>
        </form>
    );
}

export default ADDQUANTITY;
