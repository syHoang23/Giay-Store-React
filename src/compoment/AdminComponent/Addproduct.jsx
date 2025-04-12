import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ADDPRODUCT = () => {
    // State để lưu thông tin sản phẩm mới
    const [TenSanPham, setTenSanPham] = useState('');
    const [MoTa, setMoTa] = useState('');
    const [Gia, setGia] = useState('');
    const [AnhBia, setAnhBia] = useState('');
    const [LoaiGiay, setLoaiGiay] = useState('');
    const [loaiGiayList, setLoaiGiayList] = useState([]);
    const [TenHang, setTenHang] = useState('');
    const [tenHangList, setTenHangList] = useState([]);
    const [MauSac, setMauSac] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    // Hàm tải danh sách các loại giày dựa vào hãng (có thể gọi khi component mount)
    useEffect(() => {
        const fetchLoaiGiay = async () => {
            try {
                const response = await fetch('http://localhost:3002/admin/loai-giay');
                const data = await response.json();
                setLoaiGiayList(data);
            } catch (error) {
                console.error('Error fetching LoaiGiay:', error);
            }
        };
        fetchLoaiGiay();

        const fetchTenHang = async () => {
            try {
                const response = await fetch('http://localhost:3002/admin/ten-hang');
                const data = await response.json();
                setTenHangList(data);
            } catch (error) {
                console.error('Error fetching TenHang:', error);
            }
        };
        fetchTenHang();
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
        if (!TenSanPham || !MoTa || !Gia || !AnhBia || !LoaiGiay || !TenHang || !MauSac) {
          alert('Please enter all required fields');
          return;
        }
        try {
          const response = await fetch('http://localhost:3002/admin/product', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${loggedInUser_ID}`,  // Đưa userid vào header Authorization
              'username': encodeURIComponent(loggedInUser_NAME),  // Đưa username vào header 
            },
            body: JSON.stringify({
                TenSanPham,
                MoTa,
                Gia,
                AnhBia,
                LoaiGiay,
                TenHang,
                MauSac
             }),
          });
    
          if (response.ok) {
            // Xử lý sau khi thêm sản phẩm thành công
            console.log('Product added successfully');
            alert('Product added successfully');
            navigate('/list-products'); // Điều hướng người dùng về trang chủ hoặc trang khác
          } else {
            alert('Không thể thể thêm sản phẩm vào database');
          }
        } catch (error) {
          setError('Error adding product');
          console.error('Error adding product:', error);
        }
    };
     // Giao diện form để người dùng nhập thông tin sản phẩm mới
    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-bold mb-2">Add New Product</h2>
           
            <div className="mb-4">
                <label htmlFor="TenSanPham" className="block text-gray-700 font-semibold mb-2">Tên sản phẩm:</label>
                <input type="text" id="TenSanPham" name="TenSanPham" value={TenSanPham} onChange={(e) => setTenSanPham(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 w-full" required />
            </div>
            <div className="mb-4">
                <label htmlFor="MoTa" className="block text-gray-700 font-semibold mb-2">Mô tả:</label>
                <input type="text" id="MoTa" name="MoTa" value={MoTa} onChange={(e) => setMoTa(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 w-full" required />
            </div>
            <div className="mb-4">
                <label htmlFor="Gia" className="block text-gray-700 font-semibold mb-2">Giá:</label>
                <input type="text" id="Gia" name="Gia" value={Gia} onChange={(e) => setGia(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 w-full" required />
            </div>
            <div className="mb-4">
                <label htmlFor="AnhBia" className="block text-gray-700 font-semibold mb-2">Ảnh Bìa:</label>
                <input type="text" id="AnhBia" name="AnhBia" value={AnhBia} onChange={(e) => setAnhBia(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 w-full"  required/>
            </div>
            <div className="mb-4">
                <label htmlFor="LoaiGiay" className="block text-gray-700 font-semibold mb-2">Loại Giày:</label>
                <select 
                    id="LoaiGiay" 
                    name="LoaiGiay" 
                    value={LoaiGiay} 
                    onChange={(e) => setLoaiGiay(e.target.value)} 
                    className="border border-gray-300 rounded-md px-3 py-2 w-full"
                >
                    <option value="">Chọn loại giày</option>
                    {loaiGiayList.map((loai) => (
                        loai[0] && loai[1] ? (
                            <option key={loai[0]} value={loai[1]}>
                                {loai[1]}
                            </option>
                        ) : null
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label htmlFor="TenHang" className="block text-gray-700 font-semibold mb-2">Hãng:</label>
                <select 
                    id="TenHang" 
                    name="TenHang" 
                    value={TenHang} 
                    onChange={(e) => setTenHang(e.target.value)} 
                    className="border border-gray-300 rounded-md px-3 py-2 w-full"
                >
                    <option value="">Chọn hãng</option>
                    {tenHangList.map((hang) => (
                        hang[0] && hang[1] ? (
                            <option key={hang[0]} value={hang[1]}>
                                {hang[1]}
                            </option>
                        ) : null
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label htmlFor="MauSac" className="block text-gray-700 font-semibold mb-2">Màu Sắc:</label>
                <input type="text" id="MauSac" name="MauSac" value={MauSac} onChange={(e) => setMauSac(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 w-full" required />
            </div>
            <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200">Add Product</button>
        </form>
    );
}

export default ADDPRODUCT;
