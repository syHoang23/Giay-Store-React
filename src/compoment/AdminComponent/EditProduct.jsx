import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
const API_URL = process.env.REACT_APP_API_URL;
const EditProductComponent = () => {
    // Lấy Id của sản phẩm từ URL sử dụng useParams
    const { Id } = useParams();
    // State để lưu thông tin sản phẩm và các trường thông tin của sản phẩm
    const [product, setProduct] = useState(null);
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
    
    // Lấy USER_ID của người dùng đã đăng nhập từ sessionStorage
    const loggedInUser_ID = sessionStorage.getItem('USER_ID');

    // Lấy ROLE của người dùng đã đăng nhập từ sessionStorage
    const loggedInUserRole = sessionStorage.getItem('ROLE');
    
    const loggedInUser_NAME = sessionStorage.getItem('USER_NAME');

    // Sử dụng useEffect để fetch thông tin sản phẩm từ server khi component được render
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`${API_URL}/products/${Id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProduct(data);
                setTenSanPham(data[1]);
                setMoTa(data[2]);
                setGia(data[3]);
                setAnhBia(data[4]);
                setLoaiGiay(data[5]);
                setTenHang(data[6]);
                setMauSac(data[7]);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };
        const fetchLoaiGiay = async () => {
            try {
                const response = await fetch(`${API_URL}/admin/loai-giay`);
                const data = await response.json();
                setLoaiGiayList(data);
            } catch (error) {
                console.error('Error fetching LoaiGiay:', error);
            }
        };
        fetchLoaiGiay();

        const fetchTenHang = async () => {
            try {
                const response = await fetch(`${API_URL}/admin/ten-hang`);
                const data = await response.json();
                setTenHangList(data);
            } catch (error) {
                console.error('Error fetching TenHang:', error);
            }
        };
        fetchTenHang();

        if (loggedInUserRole === 'admin') {
            fetchProduct();
        } else {
            navigate('/'); // Điều hướng người dùng về trang chủ hoặc trang khác
            alert('Quyền truy cập bị từ chối!');
        }
    // },);
    },[]);
    // Hàm xử lý khi người dùng nhấn nút "Update Product"
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Kiểm tra các trường bắt buộc
        if (!TenSanPham || !MoTa || !Gia || !AnhBia || !LoaiGiay || !TenHang || !MauSac) {
          alert('Please enter all required fields');
          return;
        }
        try {
          const response = await fetch(`${API_URL}/admin/product/${Id}`, {
            method: 'PUT',
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
            // Xử lý sau khi chỉnh sửa sản phẩm thành công
            console.log('Product updated successfully');
            alert('Product updated successfully');
            navigate('/list-products'); // Điều hướng người dùng về trang chủ hoặc trang khác
          } else {
            alert('Failed to update product');
          }
        } catch (error) {
          setError('Error updating product');
          console.error('Error updating product:', error);
        }
    };
     // Nếu sản phẩm chưa được fetch, hiển thị thông báo "Loading..."
    if (!product) {
        return <div>Loading...</div>;
    }
    if (loggedInUserRole !== 'admin') {
        return <div>Loading...</div>;
    }
    // Giao diện form để người dùng chỉnh sửa thông tin sản phẩm
    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-bold mb-2">Edit Product</h2>
           
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

            <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200">Update Product</button>
        </form>
    );
}

export default EditProductComponent;
