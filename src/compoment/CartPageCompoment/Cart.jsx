import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ShippingAddress from './ShippingAddress';
const API_URL = process.env.REACT_APP_API_URL;
const CartComponent= () => {
    // State để lưu thông tin giỏ hàng và tổng subtotal
    const [cart, setCart] = useState([]);
    const [totalSubtotal, setTotalSubtotal] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false); // State để điều khiển modal
    const [address, setAddress] = useState({ province: '', district: '', addressDetail: '' });
    const [phuongThucThanhToan, setPhuongThucThanhToan] = useState('COD');
    const USER_ID = sessionStorage.getItem('USER_ID'); // Lấy USER_ID từ sessionStorage để thêm vào giỏ hàng
    var tenKhachHang='';
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    });
    const navigate = useNavigate();
    // Lấy USER_ID của người dùng đã đăng nhập từ sessionStorage
    const loggedInUser_ID = sessionStorage.getItem('USER_ID');
    const loggedInUser_NAME = sessionStorage.getItem('USER_NAME');
    tenKhachHang=loggedInUser_NAME;
    const QRUrl = `https://img.vietqr.io/image/MB-0942559378-qr_only.png?amount=${totalSubtotal}&addInfo=${USER_ID} ${tenKhachHang} Thanh Toan Shop Giay&accountName=PHAM%20VAN%20SY%20HOANG`;
    // Hàm fetch thông tin giỏ hàng từ server
    const fetchCart = async () => {
        try {
            const response = await fetch(`${API_URL}/cart/cart-info`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ KhachHangID: loggedInUser_ID })
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const cartinfo = await response.json();
            // Cập nhật state với thông tin giỏ hàng mới
            setCart(cartinfo);
            // Tính tổng Subtotal
            let sum = 0;
            cartinfo.forEach(item => {
                sum += item[3] * item[4];
            });
            setTotalSubtotal(sum);
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    };
    useEffect(() => {
        // Gọi hàm fetchCart khi component được mount và khi USER_ID thay đổi
        fetchCart();
    }, []);

    const handleCheckout = () => {
        setIsModalOpen(true); // Mở modal khi nhấn Checkout
    };
    const handleConfirmCheckout = async () => {
        const { province, district, addressDetail } = address;
        if (!province || !district || !addressDetail) {
            alert('Vui lòng chọn đầy đủ tỉnh, huyện và điền địa chỉ cụ thể.');
            return;
        }
        const fullAddress = `${addressDetail}, ${district}, ${province}`;
    // Lấy tất cả SanPhamID từ giỏ hàng
    const chiTietDonHang = cart.map(item => ({
        SanPhamID: item[1],  // ID sản phẩm
        SoLuong: item[3],    // Số lượng
        Gia: item[4]      ,  // Giá
        KichThuoc: item[5]   // Kích thước
    }));
    // Thêm logic xử lý xác nhận thanh toán tại đây
    alert("Đã xác nhận địa chỉ: " + fullAddress);
    setIsModalOpen(false); // Đóng modal sau khi xác nhận
    try {
        const response = await fetch(`${API_URL}/order/adds`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // Dữ liệu gửi đi bao gồm thông tin sản phẩm, số lượng và USER_ID
            body: JSON.stringify({
                KhachHangID: USER_ID, // ID của người dùng đã đăng nhập
                TongGiaTri: totalSubtotal,
                TrangThai: "Đang xử lý",
                DiaChiGiaoHang: fullAddress,
                ChiTietDonHang: chiTietDonHang
            })
        });
        // Kiểm tra nếu yêu cầu thành công (status code 200)
        if (response.ok) {
            alert('Đơn hàng được khởi tạo thành công!');
            try {
                const responses = await fetch(`${API_URL}/cart/delete-all-item`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ KhachHangID: USER_ID })
                });
        
                const result = await responses.json(); // Phân tích phản hồi JSON
                if (responses.ok) {
                    alert(result.message || 'Tất cả sản phẩm đã được xóa khỏi giỏ hàng');
                } else {
                    alert(result.message || 'Không thể xóa tất cả sản phẩm khỏi giỏ hàng');
                }
            } catch (error) {
                alert(`Lỗi xóa tất cả sản phẩm khỏi giỏ hàng: ${error}`);
            }
            navigate('/'); // Điều hướng người dùng về trang đơn hàng
        } else {
            // Hiển thị thông báo lỗi nếu yêu cầu không thành công
            const errorData = await response.json();
            alert('Lỗi khởi tạo đơn hàng, sản phẩm không đủ số lượng trong kho. ',errorData.message);
        }
    } catch (error) {
        // Xử lý lỗi nếu có
        console.error('Lỗi tạo đơn hàng:', error);
    }
};
// Hàm xử lý khi người dùng xóa một sản phẩm khỏi giỏ hàng
const handleDeleteItem = async (KhachHangID,SanPhamID) => {
    try {
        const response = await fetch(`${API_URL}/cart/delete-item`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ KhachHangID: KhachHangID, SanPhamID: SanPhamID })
        });

        const result = await response.json(); // Phân tích phản hồi JSON
        if (response.ok) {
            fetchCart();
            alert(result.message || 'Sản phẩm đã được xóa khỏi giỏ hàng');
        } else {
            alert(result.message || 'Không thể xóa sản phẩm khỏi giỏ hàng');
        }
    } catch (error) {
        alert(`Lỗi xóa sản phẩm khỏi giỏ hàng: ${error}`);
    }
};


// Hàm xử lý tăng số lượng sản phẩm trong giỏ hàng khi người dùng nhấn nút tăng số lượng ở mỗi mục sản phẩm
const handleIncreaseQuantity = (index) => {
    // Tạo một bản sao của giỏ hàng để thay đổi mà không làm thay đổi trực tiếp giỏ hàng ban đầu
    const updatedCart = [...cart];
    // Tăng số lượng sản phẩm trong mục đi 1 đơn vị
    updatedCart[index][3]++;
    // Cập nhật giỏ hàng với số lượng sản phẩm mới đã tăng
    setCart(updatedCart);
    // Gọi hàm cập nhật tổng Subtotal sau khi thay đổi số lượng sản phẩm
    updateSubtotal(updatedCart);
};


// Hàm xử lý giảm số lượng sản phẩm trong giỏ hàng khi người dùng nhấn nút giảm số lượng ở mỗi mục sản phẩm
const handleDecreaseQuantity = (index) => {
    // Tạo một bản sao của giỏ hàng để thay đổi mà không làm thay đổi trực tiếp giỏ hàng ban đầu
    const updatedCart = [...cart];
    // Kiểm tra nếu số lượng sản phẩm trong mục được giảm lớn hơn 1
    if (updatedCart[index][3] > 1) {
        // Giảm số lượng sản phẩm trong mục đi 1 đơn vị
        updatedCart[index][3]--;
        // Cập nhật giỏ hàng với số lượng sản phẩm mới đã giảm
        setCart(updatedCart);
        // Gọi hàm cập nhật tổng Subtotal sau khi thay đổi số lượng sản phẩm
        updateSubtotal(updatedCart);
    }
};

// Hàm cập nhật tổng Subtotal sau khi thay đổi số lượng sản phẩm trong giỏ hàng
const updateSubtotal = (updatedCart) => {
    let sum = 0;
    // Duyệt qua mỗi mục trong giỏ hàng đã cập nhật
    updatedCart.forEach(item => {
        // Tính toán Subtotal cho mỗi mục bằng cách nhân giá của sản phẩm (phần tử thứ 7 trong mảng) với số lượng sản phẩm (phần tử thứ 4 trong mảng)
        sum += item[4] * item[3]; // Giả sử Subtotal được lưu trong phần tử thứ 7 của mỗi mục
    });
    // Cập nhật tổng Subtotal mới
    setTotalSubtotal(sum);
};


    return (
      <section className="py-24 relative" >
          <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto" style={{marginTop:'-80px'}}>
              <h2 className="title font-manrope font-bold text-4xl leading-10 mb-8 text-center text-black">Giỏ Hàng</h2>
              
              {cart.map((item, index) => (
                  <div key={index} className="rounded-3xl border-2 border-gray-200 p-4 lg:p-8 grid grid-cols-12 mb-8 max-lg:max-w-lg max-lg:mx-auto gap-y-4">
                      <div className="col-span-12 lg:col-span-2 img box">
                          <img src={item[6]} alt="img" className="max-lg:w-full lg:w-[180px]" />
                      </div>
                      <div className="col-span-12 lg:col-span-10 detail w-full lg:pl-3">
                          <div className="flex items-center justify-between w-full mb-4">
                              <h5 className="font-manrope font-bold text-2xl leading-9 text-gray-900">{item[1]}. {item[2]}</h5>
                              <button onClick={() => handleDeleteItem(item[0], item[1])} className="rounded-full group flex items-center justify-center focus-within:outline-red-500">
                                  <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <circle className="fill-red-50 transition-all duration-500 group-hover:fill-red-400" cx="17" cy="17" r="17" fill="" />
                                      <path className="stroke-red-500 transition-all duration-500 group-hover:stroke-white" d="M14.1673 13.5997V12.5923C14.1673 11.8968 14.7311 11.333 15.4266 11.333H18.5747C19.2702 11.333 19.834 11.8968 19.834 12.5923V13.5997M19.834 13.5997C19.834 13.5997 14.6534 13.5997 11.334 13.5997C6.90804 13.5998 27.0933 13.5998 22.6673 13.5997C21.5608 13.5997 19.834 13.5997 19.834 13.5997ZM12.4673 13.5997H21.534V18.8886C21.534 20.6695 21.534 21.5599 20.9807 22.1131C20.4275 22.6664 19.5371 22.6664 17.7562 22.6664H16.2451C14.4642 22.6664 13.5738 22.6664 13.0206 22.1131C12.4673 21.5599 12.4673 20.6695 12.4673 18.8886V13.5997Z" stroke="#EF4444" strokeWidth="1.6" strokeLinecap="round" />
                                  </svg>
                              </button>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <button className="group rounded-[50px] border border-gray-200 shadow-sm shadow-transparent p-2.5 flex items-center justify-center bg-white transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-300 focus-within:outline-gray-300" onClick={() => handleDecreaseQuantity(index)}>
                                    <svg className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black" width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4.5 9.5H13.5" stroke="" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                                <input 
                                    type="text" 
                                    id="number" 
                                    className="border border-gray-200 rounded-full w-12 aspect-square outline-none text-gray-900 font-semibold text-sm py-1.5 px-3 bg-gray-100 text-center"  
                                    value={item[3]}  
                                    readOnly   
                                />
                                <button className="group rounded-[50px] border border-gray-200 shadow-sm shadow-transparent p-2.5 flex items-center justify-center bg-white transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-300 focus-within:outline-gray-300" onClick={() => handleIncreaseQuantity(index)}>
                                    <svg className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black" width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.75 9.5H14.25M9 14.75V4.25" stroke="" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                                <p className="font-manrope font-bold text-2x leading-9 text-gray-900">Size: {item[5]}</p>
                            </div>
                              <h6 className="text-indigo-600 font-manrope font-bold text-2xl leading-9 text-right">Giá sản phẩm: {formatter.format(item[4])}</h6>
                          </div>
                      </div>
                  </div>
              ))}

              <div className="flex flex-col md:flex-row items-center md:items-center justify-between lg:px-6 pb-6 border-b border-gray-200 max-lg:max-w-lg max-lg:mx-auto">
                  <h5 className="text-gray-900 font-manrope font-semibold text-2xl leading-9 w-full max-md:text-center max-md:mb-4">Subtotal</h5>
                  <div className="flex items-center justify-between gap-5 ">
                      <h6 className="font-manrope font-bold text-3xl lead-10 text-indigo-600">{formatter.format(totalSubtotal)}</h6>
                  </div>
              </div>
              <div className="max-lg:max-w-lg max-lg:mx-auto">
                  <p className="font-normal text-base leading-7 text-gray-500 text-center mb-5 mt-6">Shipping taxes, and discounts calculated at checkout</p>
                  <button onClick={handleCheckout} className="rounded-full py-4 px-6 bg-indigo-600 text-white font-semibold text-lg w-full text-center transition-all duration-500 hover:bg-indigo-700 ">Checkout</button>
              </div>
          </div>
        {/* Modal Xác nhận */}
        {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">Xác nhận đơn hàng</h3>
            {/* Tổng giá trị sản phẩm */}
            <div className="flex justify-between items-center mb-4">
                <span className="text-gray-700 font-medium">Tổng giá trị sản phẩm:</span>
                <span className="font-bold text-indigo-600 text-lg">{formatter.format(totalSubtotal)}</span>
            </div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Tên Khách Hàng:</label>
            <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-2 mb-4"
                value={tenKhachHang}
                placeholder="Nhập địa chỉ của bạn"
                readOnly
            />
            <label className="block text-gray-700 text-sm font-bold mb-2">Phương thức thanh toán:</label>
            <select
                className="w-full border border-gray-300 rounded-lg p-2 mb-4"
                value={phuongThucThanhToan}
                onChange={(e) => setPhuongThucThanhToan(e.target.value)}
                >
                <option value="COD">Thanh toán khi nhận hàng (COD)</option>
                <option value="BankTransfer">Chuyển khoản ngân hàng</option>
            </select>
            {phuongThucThanhToan === 'BankTransfer' && (
            <div className="bg-gray-50 border p-3 rounded mb-4">
                <p><strong>Ngân hàng:</strong> MB Bank</p>
                <p><strong>Số tài khoản:</strong> 094 255 9378</p>
                <p><strong>Chủ tài khoản:</strong> PHAM VAN SY HOANG</p>
                <img src={QRUrl} alt="QR chuyển khoản" className="w-32 h-32" />
                <p className="mt-2">Quét mã QR để thanh toán</p>
            </div>
            )}
            <ShippingAddress onChange={(value) => setAddress(value)} />
            <div className="flex justify-end gap-4">
                <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                >
                Hủy
                </button>
                <button
                onClick={handleConfirmCheckout}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                >
                Đặt Hàng
                </button>
            </div>
            </div>
        </div>
        )}
      </section>
  );
    
    
};
export default CartComponent;