import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

const DetailOrderComponent= () => {
    const { Id } = useParams(); // Lấy thông tin ID sản phẩm từ URL
    const [order, setOrder] = useState(null); // State để lưu thông tin sản phẩm
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    // const USER_ID = sessionStorage.getItem('USER_ID'); // Lấy USER_ID từ sessionStorage để thêm vào giỏ hàng
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
      });
    useEffect(() => {
        // Hàm fetchOrder sẽ được gọi mỗi khi Id thay đổi
        const fetchOrder = async () => {
            try {
                // Gọi API để lấy thông tin sản phẩm dựa trên Id được truyền từ URL
                const response = await fetch(`http://localhost:3002/order/${Id}`);
                // Kiểm tra nếu response không thành công, ném ra một lỗi
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // Chuyển đổi response thành dạng JSON
                const data = await response.json();
                // Cập nhật state order với thông tin sản phẩm lấy được từ API
                setOrder(data);
            } catch (error) {
                // Xử lý lỗi nếu có
                console.error('Error fetching order:', error);
            }
        };
        // Gọi hàm fetchOrder để lấy thông tin sản phẩm khi component được render lần đầu tiên hoặc khi Id thay đổi
        fetchOrder();
    }, [Id]);
    const handleCancel = async (OrderID) => {
        try {
            const response = await fetch('http://localhost:3002/order/cancel-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ OrderID : OrderID })
            });
    
            const result = await response.json(); // Phân tích phản hồi JSON
            if (response.ok) {
                alert(result.message || 'Đơn hàng đã được hủy!');
            } else {
                alert(result.message || 'Không thể hủy đơn hàng!');
            }
        }catch(error) {
            alert(`Lỗi hủy đơn hàng: ${error}`);
        }
    };

// Hàm thêm sản phẩm vào giỏ hàng
// const addToCart = async () => {
//     // Kiểm tra nếu USER_ID đã được xác định từ sessionStorage
//     if (USER_ID) {
//         try {
//             // Gửi yêu cầu POST đến endpoint '/cart/adds' để thêm sản phẩm vào giỏ hàng
//             const response = await fetch('http://localhost:3002/cart/adds', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 // Dữ liệu gửi đi bao gồm thông tin sản phẩm, số lượng và USER_ID
//                 body: JSON.stringify({
//                     KhachHangID: USER_ID, // ID của người dùng đã đăng nhập
//                     SanPhamID: product[0], // Id của sản phẩm
//                     TenSanPham: product[1], // Tên sản phẩm
//                     SoLuong: quantity, // Số lượng sản phẩm được chọn
//                     Gia: product[3], // Giá của sản phẩm
//                     KichThuoc: size, // Giá của sản phẩm
//                     AnhBia : product[4], // URL hình ảnh của sản phẩm
//                 })
//             });
//             // Kiểm tra nếu yêu cầu thành công (status code 200)
//             if (response.ok) {
//                 alert('Sản phẩm được thêm vào giỏ hàng thành công!');
//             } else {
//                 // Hiển thị thông báo lỗi nếu yêu cầu không thành công
//                 alert('Không thêm được sản phẩm vào giỏ hàng.');
//             }
//         } catch (error) {
//             // Xử lý lỗi nếu có
//             console.error('Lỗi thêm sản phẩm vào giỏ hàng:', error);
//         }
//     } else {    
//         alert('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!');
//     }
// };

    // Kiểm tra xem sản phẩm đã được tải hay chưa, nếu chưa thì hiển thị thông báo "Loading..."
    if (!order) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ marginTop: '20px' }} >
            <div className="row">
                <div className="col-md-6">
                    <div className="card">
                        <div className="images p-3">
                        <div className="text-center p-4">
                            {/* Hiển thị slideshow của các hình ảnh sản phẩm */}
                            <Slide>
                                {order.map((value, index) => (
                                    <div key={index}>
                                        <img 
                                            id={`main-image-${index}`} 
                                            style={{ display: 'block', margin: '0 auto' }} 
                                            src={value[3]} 
                                            width="350" 
                                            alt={value[3]}
                                        />
                                    </div>
                                ))}
                            </Slide>
                        </div>

                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card">
                        <div className="product p-4">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center"> 
                                    <i className="fa fa-long-arrow-left"></i> <span className="ml-1">Chi Tiết Đơn Hàng</span> 
                                </div> 
                                <i className="fa fa-shopping-cart text-muted"></i>
                            </div>
                            <div className="mt-4 mb-3"> 
                                {/* <span className="text-uppercase text-muted brand">{product[2]}</span> */}
                                <h5 className="text-uppercase">Id Đơn Hàng: {order[0][1]}</h5>
                            </div>
                            <div className="specs mt-5">
                                <h6 className="text-uppercase">Danh sách sản phẩm</h6> 
                                <ul>
                                    {order && Array.isArray(order) && order.map((product, index) => (
                                        <li key={index} className="mb-3">
                                            <p><strong>Tên sản phẩm:</strong> {product[2]}</p>
                                            <p><strong>Kích thước:</strong> {product[4]}</p>
                                            <p><strong>Số lượng:</strong> {product[5]}</p>
                                            <p><strong>Giá:</strong> {formatter.format(product[6])}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <button onClick={() => setIsConfirmOpen(true)}  className="btn btn-danger text-uppercase mr-2 px-4">Hủy đơn hàng</button>
                        </div>
                        {/* Xác nhận xóa */}
                        {isConfirmOpen && (
                            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                            <div className="bg-white p-6 rounded-lg shadow-lg">
                                <h2 className="text-lg font-bold mb-4">Xác nhận hủy</h2>
                                <p className="mb-4">Bạn có chắc chắn muốn hủy đơn hàng này không?</p>
                                <div className="flex justify-end space-x-4">
                                <button
                                    onClick={() => setIsConfirmOpen(false)}
                                    className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                                >
                                    Trở về
                                </button>
                                <button
                                    onClick={() =>{
                                        handleCancel(order[0][1]); // Gọi hàm hủy đơn hàng
                                        setIsConfirmOpen(false);  // Đóng tab xác nhận
                                    }}
                                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                                >
                                    Xác nhận hủy
                                </button>
                                </div>
                            </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );   
};

export default DetailOrderComponent;
