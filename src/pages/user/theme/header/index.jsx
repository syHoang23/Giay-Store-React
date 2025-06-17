import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./header.css";
import logo from '../../../../assets/img/logo.png'
const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [USER_ID, setUSER_ID] = useState('');
  const navigate = useNavigate();
  // Effect này được sử dụng để kiểm tra xem có thông tin đăng nhập nào được lưu trữ không khi component được render
  useEffect(() => {
    const loggedInUser =  sessionStorage.getItem('USER_ID'); // Kiểm tra xem có tên người dùng nào được lưu trữ không
    if (loggedInUser) {
      setUSER_ID(loggedInUser);
      setIsLoggedIn(true);
    }
  }, []);

 

  const handleLogout = () => {
    // Xóa thông tin đăng nhập khỏi sessionStorage khi đăng xuất
    sessionStorage.removeItem('USER_NAME');
    sessionStorage.removeItem('USER_ID');
    sessionStorage.removeItem('ROLE');
    setUSER_ID('');
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div id="header" className="border-l-4 border-sky-500 rounded-md "style={{marginTop:'-30px'}}>
      <a href="/" className="logo">
        <img src={logo} style={{height:'170px'}} alt="" />
      </a>

      <div id="menu">
        <div className="item">
          <a className='hover:text-blue-800' href="/">Trang chủ</a>
        </div>
        <div className="item">
          <a className='hover:text-blue-800' href="/product">Tìm kiếm</a>
        </div>
        <div className="item">
          <a className='hover:text-blue-800' href="/order">Đơn Hàng</a>
        </div>
      </div>

      <div id="actions">
        {isLoggedIn ? (
          <><div className="item">
            <Link to={`/profile/${USER_ID}`}>
            <div class="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full ">
              <svg class="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
            </div>
            </Link>
          </div>
          <Link to="/cart">
          <div className="item" style={{ marginTop: "-0.8rem" }}>     
              <div class="relative overflow-hidden  rounded-full ">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="file: mt-4 h-6 w-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                  </svg>
              </div>          
          </div>
          </Link>
          <div className="item">
          <button className='primary-button' onClick={handleLogout}>Logout</button>
            </div>
            
            </>
        ) : (
          <div className="item">
            <Link to="/login">
              <button className='primary-button'>Login</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
