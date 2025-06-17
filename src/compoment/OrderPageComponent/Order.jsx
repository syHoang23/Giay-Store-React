import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { Link } from 'react-router-dom';
const API_URL = process.env.REACT_APP_API_URL;
const OrderCompoment= () => {
const [order, setOrder] = useState([]);
// const [totalSubtotal, setTotalSubtotal] = useState(0);
// const [isModalOpen, setIsModalOpen] = useState(false); // State để điều khiển modal
// const [address, setAddress] = useState(""); // State lưu địa chỉ nhập vào
// const USER_ID = sessionStorage.getItem('USER_ID'); // Lấy USER_ID từ sessionStorage để thêm vào giỏ hàng
// var tenKhachHang='';
const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  });
const navigate = useNavigate();

// Lấy USER_ID của người dùng đã đăng nhập từ sessionStorage
const loggedInUser_ID = sessionStorage.getItem('USER_ID');
// const loggedInUser_NAME = sessionStorage.getItem('USER_NAME');
// tenKhachHang=loggedInUser_NAME;
// Hàm fetch thông tin giỏ hàng từ server
const fetchCart = async () => {
    try {
        const response = await fetch(`${API_URL}/order/order-info`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ KhachHangID: loggedInUser_ID })
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const orderinfo = await response.json();
        // Cập nhật state với thông tin giỏ hàng mới
        setOrder(orderinfo);
        // // Tính tổng Subtotal
        // let sum = 0;
        // orderinfo.forEach(item => {
        //     sum += item[3] * item[4]; // Giả sử Subtotal được lưu trong phần tử thứ 7 của mỗi mục
        // });
        // setTotalSubtotal(sum);
    } catch (error) {
        console.error('Error fetching product:', error);
    }
};
useEffect(() => {
    // Gọi hàm fetchCart khi component được mount
    fetchCart();
}, []);

// const handleCheckout = () => {
//     setIsModalOpen(true); // Mở modal khi nhấn Checkout
// };
// const handleConfirmCheckout = async () => {
//     if (!address) {
//       alert("Vui lòng nhập địa chỉ giao hàng.");
//       return;
//     }
//     // Lấy tất cả SanPhamID từ giỏ hàng
//     const chiTietDonHang = cart.map(item => ({
//         SanPhamID: item[1],  // ID sản phẩm
//         SoLuong: item[3],    // Số lượng
//         Gia: item[4]         // Giá
//     }));
//     // Thêm logic xử lý xác nhận thanh toán tại đây
//     alert("Đã xác nhận địa chỉ: " + address);
//     setIsModalOpen(false); // Đóng modal sau khi xác nhận
//     try {
//         const response = await fetch('http://localhost:3002/order/adds', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             // Dữ liệu gửi đi bao gồm thông tin sản phẩm, số lượng và USER_ID
//             body: JSON.stringify({
//                 KhachHangID: USER_ID, // ID của người dùng đã đăng nhập
//                 TongGiaTri: totalSubtotal,
//                 TrangThai: "Đang Xử Lí",
//                 DiaChiGiaoHang: address,
//                 ChiTietDonHang: chiTietDonHang
//             })
//         });
//         // Kiểm tra nếu yêu cầu thành công (status code 200)
//         if (response.ok) {
//             alert('Đơn hàng được khởi tạo thành công!');
//             try {
//                 const responses = await fetch('http://localhost:3002/cart/delete-all-item', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json'
//                     },
//                     body: JSON.stringify({ KhachHangID: USER_ID })
//                 });
        
//                 const result = await responses.json(); // Phân tích phản hồi JSON
//                 if (responses.ok) {
//                     alert(result.message || 'Tất cả sản phẩm đã được xóa khỏi giỏ hàng');
//                 } else {
//                     alert(result.message || 'Không thể xóa tất cả sản phẩm khỏi giỏ hàng');
//                 }
//             } catch (error) {
//                 alert(`Lỗi xóa tất cả sản phẩm khỏi giỏ hàng: ${error}`);
//             }
//             navigate('/'); // Điều hướng người dùng về trang đơn hàng
//         } else {
//             // Hiển thị thông báo lỗi nếu yêu cầu không thành công
//             alert('Lỗi khởi tạo đơn hàng.');
//         }
//     } catch (error) {
//         // Xử lý lỗi nếu có
//         console.error('Lỗi tạo đơn hàng:', error);
//     }
// };
// Hàm xử lý khi người dùng xóa một sản phẩm khỏi giỏ hàng
// const handleDeleteItem = async (KhachHangID,SanPhamID) => {
//     try {
//         const response = await fetch('http://localhost:3002/cart/delete-item', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ KhachHangID: KhachHangID, SanPhamID: SanPhamID })
//         });

//         const result = await response.json(); // Phân tích phản hồi JSON
//         if (response.ok) {
//             fetchCart();
//             alert(result.message || 'Sản phẩm đã được xóa khỏi giỏ hàng');
//         } else {
//             alert(result.message || 'Không thể xóa sản phẩm khỏi giỏ hàng');
//         }
//     } catch (error) {
//         alert(`Lỗi xóa sản phẩm khỏi giỏ hàng: ${error}`);
//     }
// };


// Hàm xử lý tăng số lượng sản phẩm trong giỏ hàng khi người dùng nhấn nút tăng số lượng ở mỗi mục sản phẩm
// const handleIncreaseQuantity = (index) => {
//     // Tạo một bản sao của giỏ hàng để thay đổi mà không làm thay đổi trực tiếp giỏ hàng ban đầu
//     const updatedCart = [...cart];
//     // Tăng số lượng sản phẩm trong mục đi 1 đơn vị
//     updatedCart[index][3]++;
//     // Cập nhật giỏ hàng với số lượng sản phẩm mới đã tăng
//     setCart(updatedCart);
//     // Gọi hàm cập nhật tổng Subtotal sau khi thay đổi số lượng sản phẩm
//     updateSubtotal(updatedCart);
// };


// Hàm xử lý giảm số lượng sản phẩm trong giỏ hàng khi người dùng nhấn nút giảm số lượng ở mỗi mục sản phẩm
// const handleDecreaseQuantity = (index) => {
//     // Tạo một bản sao của giỏ hàng để thay đổi mà không làm thay đổi trực tiếp giỏ hàng ban đầu
//     const updatedCart = [...cart];
//     // Kiểm tra nếu số lượng sản phẩm trong mục được giảm lớn hơn 1
//     if (updatedCart[index][3] > 1) {
//         // Giảm số lượng sản phẩm trong mục đi 1 đơn vị
//         updatedCart[index][3]--;
//         // Cập nhật giỏ hàng với số lượng sản phẩm mới đã giảm
//         setCart(updatedCart);
//         // Gọi hàm cập nhật tổng Subtotal sau khi thay đổi số lượng sản phẩm
//         updateSubtotal(updatedCart);
//     }
// };

// Hàm cập nhật tổng Subtotal sau khi thay đổi số lượng sản phẩm trong giỏ hàng
// const updateSubtotal = (updatedCart) => {
//     let sum = 0;
//     // Duyệt qua mỗi mục trong giỏ hàng đã cập nhật
//     updatedCart.forEach(item => {
//         // Tính toán Subtotal cho mỗi mục bằng cách nhân giá của sản phẩm (phần tử thứ 7 trong mảng) với số lượng sản phẩm (phần tử thứ 4 trong mảng)
//         sum += item[4] * item[3]; // Giả sử Subtotal được lưu trong phần tử thứ 7 của mỗi mục
//     });
//     // Cập nhật tổng Subtotal mới
//     setTotalSubtotal(sum);
// };


    return (
      <section className="py-24 relative" >
          <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto" style={{marginTop:'-80px'}}>
              <h2 className="title font-manrope font-bold text-4xl leading-10 mb-8 text-center text-black">Đơn Hàng</h2>
              
              {order.map((item, index) => (
                  <div key={index} className="rounded-3xl border-2 border-gray-200 p-4 lg:p-8 mb-8 max-lg:max-w-lg max-lg:mx-auto gap-y-4 cursor-pointer hover:bg-gray-100 transition duration-200" onClick={() => navigate(`/order/${item[0]}`)}>
                      <div className="col-span-12 lg:col-span-10 detail w-full lg:pl-3">
                          <div className="flex items-center justify-between w-full mb-4">
                              <h5 className="font-manrope font-bold text-2xl leading-9 text-gray-900">{item[0]}. Ngày đặt hàng: {new Date(item[2]).toLocaleTimeString("vi-VN")}, {new Date(item[2]).toLocaleDateString("vi-VN")}</h5>
                              <h5 className="font-manrope font-bold text-2xl leading-9 text-gray-900">Ngày giao dự kiến: {new Date(item[6]).toLocaleDateString("vi-VN")}</h5>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <p className="font-manrope font-bold text-2x leading-9 text-gray-900">Trạng Thái:</p>
                                <div style={{ color: "red" }}  className="font-manrope font-bold text-2x leading-9 text-gray-900">{item[4]}</div>
                                <div style={{ color: "red" }}  className="font-manrope font-bold text-2x leading-9 text-gray-900"></div>
                                <p className="pl-16 font-manrope font-bold text-2x leading-9 text-gray-900">Địa Chỉ: {item[5]}</p>
                            </div>
                          </div>
                          <div className="flex justify-between items-center mt-2">
                            <div className="flex items-center gap-4">
                                <p className="font-manrope font-bold text-2x leading-9 text-gray-900">Phương Thức Thanh Toán: Thanh toán khi nhận hàng</p>
                            </div>
                              <h6 className="text-indigo-600 font-manrope font-bold text-2xl leading-9 text-right">Tổng Giá Trị: {formatter.format(item[3])}</h6>
                          </div>
                      </div>
                  </div>
              ))}

              {/* <div className="flex flex-col md:flex-row items-center md:items-center justify-between lg:px-6 pb-6 border-b border-gray-200 max-lg:max-w-lg max-lg:mx-auto">
                  <h5 className="text-gray-900 font-manrope font-semibold text-2xl leading-9 w-full max-md:text-center max-md:mb-4">Subtotal</h5>
                  <div className="flex items-center justify-between gap-5 ">
                      <h6 className="font-manrope font-bold text-3xl lead-10 text-indigo-600">{formatter.format(totalSubtotal)}</h6>
                  </div>
              </div> */}
              {/* <div className="max-lg:max-w-lg max-lg:mx-auto">
                  <p className="font-normal text-base leading-7 text-gray-500 text-center mb-5 mt-6">Shipping taxes, and discounts calculated at checkout</p>
                  <button onClick={handleCheckout} className="rounded-full py-4 px-6 bg-indigo-600 text-white font-semibold text-lg w-full text-center transition-all duration-500 hover:bg-indigo-700 ">Checkout</button>
              </div> */}
          </div>
        {/* Modal Xác nhận */}
        {/* {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            {/* <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <h3 className="text-xl font-bold mb-4">Xác nhận đơn hàng</h3>
            {/* Tổng giá trị sản phẩm */}
            {/* <div className="flex justify-between items-center mb-4">
                <span className="text-gray-700 font-medium">Tổng giá trị sản phẩm:</span>
                <span className="font-bold text-indigo-600 text-lg">{formatter.format(totalSubtotal)}</span>
            </div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Tên Khách Hàng:</label>
            <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-2 mb-4"
                value={tenKhachHang}
                placeholder="Nhập địa chỉ của bạn"
                readOnly */}
            {/* /> */}
            {/* <label className="block text-gray-700 text-sm font-bold mb-2">Địa chỉ giao hàng:</label> */}
            {/* <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-2 mb-4"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Nhập địa chỉ của bạn"
            /> */}
            {/* <div className="flex justify-end gap-4">
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
            </div> */}
            {/* </div> */}
        {/* </div> */}
        {/* )} */}
      </section>
  );
    
    
};
export default OrderCompoment;