// import React, { Component } from 'react';
import React from 'react';
import { ROUTER } from "./utils/router";
import { Routes, Route } from 'react-router-dom';
import Homepage from "./pages/user/homepage";
import MasterLayout from './pages/user/theme/masterLayout';
import ProfilePage from './pages/user/profilePage';
import LoginPage from './pages/user/LoginPage';
import DetailPage from './pages/user/detailpage/index';
import DetailOrderPage from './pages/user/detailpage/indexorder';
import RegisterPage from './pages/user/registerpage';
import cartpage from './pages/user/cartpage';
import orderpage from './pages/user/orderpage';
import AdminPage from './pages/admin/admindashboard';
import ListProductPage from './pages/admin/Product/listproduct';
import AddProductPage from './pages/admin/Product/addproduct';
import AddQuantityPage from './pages/admin/Quantity/addquantity';
import EditProductPage from './pages/admin/Product/editproduct';
import EditQuantityPage from './pages/admin/Quantity/editquantity';
import EditOrderPage from './pages/admin/Order/editorder';
import ListUsersPage from './pages/admin/Users/listuserpage';
import Productpage from "./pages/user/product";
import ListQuantityPage from "./pages/admin/Quantity/listquantity";
import ListOrderPage from "./pages/admin/Order/listorder";

const renderUserRouter = () => {
  const Routers = [ 
    {
      path: ROUTER.USER.HOME,
      Component: Homepage,
      wrapWithLayout: true // Bao lại Homepage với MasterLayout
    },
    {
      path: ROUTER.USER.PRODUCT,
      Component: Productpage,
      wrapWithLayout: true // Bao lại Homepage với MasterLayout
    },
    {
      path: `${ROUTER.USER.PROFILE}/:Id`,
      Component: ProfilePage,
      wrapWithLayout: true // Bao lại ProfilePage với MasterLayout
    },
    {
      path: ROUTER.USER.CART,
      Component: cartpage,
      wrapWithLayout: true
    },
    {
      path: ROUTER.USER.ORDER,
      Component: orderpage,
      wrapWithLayout: true
    },
    {
      path: ROUTER.USER.LOGIN,
      Component: LoginPage,
      wrapWithLayout: false // Không bao lại LoginPage với MasterLayout
    },
    {
      path: ROUTER.USER.REGISTER,
      Component: RegisterPage,
      wrapWithLayout: false // Không bao lại LoginPage với MasterLayout
    },
    {
      path: `${ROUTER.USER.PRODUCT}/:Id`, // Định nghĩa route cho trang chi tiết sản phẩm
      Component: DetailPage,
      wrapWithLayout: true // Bao lại ProductDetailPage với MasterLayout 
    },
    {
      path: `${ROUTER.USER.ORDER}/:Id`, // Định nghĩa route cho trang chi tiết sản phẩm
      Component: DetailOrderPage,
      wrapWithLayout: true // Bao lại ProductDetailPage với MasterLayout 
    },
    {
      path: ROUTER.ADMIN.ADMINDASHBOAR,
      Component: AdminPage,
      wrapWithLayout: false 
    },
    {
      path: ROUTER.ADMIN.ADDPRODUCT,
      Component: AddProductPage,
      wrapWithLayout: false 
    },
    {
      path: ROUTER.ADMIN.ADDQUANTITY,
      Component: AddQuantityPage,
      wrapWithLayout: false 
    },
    {
      path: ROUTER.ADMIN.LISTPRODUCT,
      Component: ListProductPage,
      wrapWithLayout: false 
    },
    {
      path: ROUTER.ADMIN.LISTQUANTITY,
      Component: ListQuantityPage,
      wrapWithLayout: false 
    },
    {
      path: ROUTER.ADMIN.LISTORDER,
      Component: ListOrderPage,
      wrapWithLayout: false 
    },
    {
      path: `${ROUTER.ADMIN.EDITPRODUDCT}/:Id`,
      Component: EditProductPage,
      wrapWithLayout: false 
    },
    {
      path: `${ROUTER.ADMIN.EDITQUANTITY}/:Id`,
      Component: EditQuantityPage,
      wrapWithLayout: false 
    },
    {
      path: `${ROUTER.ADMIN.EDITORDER}/:Id`,
      Component: EditOrderPage,
      wrapWithLayout: false 
    },
    {
      path: ROUTER.ADMIN.LISTUSERS,
      Component: ListUsersPage,
      wrapWithLayout: false 
    },

  ];

  return (
    <Routes>
      {Routers.map(({ path, Component, wrapWithLayout }, key) => (
        <Route
          key={key}
          path={path}
          element={wrapWithLayout ? <MasterLayout><Component /></MasterLayout> : <Component />}
        />
      ))}
    </Routes>
  );
};

const RouterCustom = () => {
  return renderUserRouter();
};

export default RouterCustom;
