import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const API_URL = process.env.REACT_APP_API_URL;
const RegisterComponent = () => {
  const [TenDangNhap, setTenDangNhap] = useState(''); // State lưu trữ tên người dùng
  const [MatKhau, setMatKhau] = useState(''); 
  const [Email, setEmail] = useState('');
  const [TenKhachHang, setTenKhachHang] = useState(''); 
  const [soDienThoai, setSoDienThoai] = useState(''); 
  const [diaChi, setDiaChi] = useState(''); 
  const [confirmMatKhau, setConfirmMatKhau] = useState(''); 
  // const [error, setError] = useState(null); // State lưu trữ thông báo lỗi
  const navigate = useNavigate(); // Hook để điều hướng trang

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!TenDangNhap || !MatKhau || !Email || !TenKhachHang || !soDienThoai || !diaChi || !confirmMatKhau) {
      alert('Vui lòng nhập tất cả các trường bắt buộc!'); // Hiển thị thông báo lỗi nếu thiếu trường thông tin
      return;
    }
    if (MatKhau !== confirmMatKhau) {
      alert('Mật khẩu không trùng khớp!'); // Hiển thị thông báo lỗi nếu mật khẩu không khớp
      return;
    }
    try {
      const response = await fetch(`${API_URL}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ TenDangNhap, MatKhau, Email, TenKhachHang, soDienThoai, diaChi }),
      });

      if (response.ok) {
        navigate('/login'); // Điều hướng đến trang đăng nhập sau khi đăng ký thành công
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      // setError('Error registering account'); // Hiển thị thông báo lỗi nếu có lỗi khi đăng ký
      console.error('Error registering account:', error);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900" onSubmit={handleSubmit}>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
          PVSH Shop
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Tạo Tài Khoản
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label htmlFor="TenDangNhap" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên người dùng<span className="text-red-500">*</span></label>
                <input type="text" id="TenDangNhap" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your TenDangNhap" value={TenDangNhap}
                  onChange={(e) => setTenDangNhap(e.target.value)} required="" />
              </div>
              <div>
                <label htmlFor="Email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email<span className="text-red-500">*</span></label>
                <input type="text" id="Email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your Email" value={Email}
                  onChange={(e) => setEmail(e.target.value)} required="" />
              </div>
              <div>
                <label htmlFor="TenKhachHang" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Họ Và Tên<span className="text-red-500">*</span></label>
                <input type="text" id="TenKhachHang" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your full name" value={TenKhachHang}
                  onChange={(e) => setTenKhachHang(e.target.value)} required="" />
              </div>
              <div>
                <label htmlFor="MatKhau" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật khẩu<span className="text-red-500">*</span></label>
                <input type="password" id="MatKhau" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={MatKhau}
                  onChange={(e) => setMatKhau(e.target.value)} required="" />
              </div>
              <div>
                <label htmlFor="confirmMatKhau" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Xác nhận mật khẩu<span className="text-red-500">*</span></label>
                <input type="password" id="confirmMatKhau" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={confirmMatKhau}
                  onChange={(e) => setConfirmMatKhau(e.target.value)} required="" />
              </div>
              <div>
                <label htmlFor="soDienThoai" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Số Điện Thoại<span className="text-red-500">*</span></label>
                <input type="text" id="soDienThoai" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your number" value={soDienThoai}
                  onChange={(e) => setSoDienThoai(e.target.value)} required="" />
              </div>
              <div>
                <label htmlFor="diaChi" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Địa Chỉ<span className="text-red-500">*</span></label>
                <input type="text" id="diaChi" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your address" value={diaChi}
                  onChange={(e) => setDiaChi(e.target.value)} required="" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                  </div>
                </div>
              </div>
              <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Đăng Ký</button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Đã có tài khoản? <a href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Đăng Nhập</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterComponent;
