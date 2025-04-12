import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

const ProductCompoment = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState('Tất Cả');

    useEffect(() => {
        // Hàm để lấy dữ liệu từ máy chủ
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3002/products');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Lỗi khi tải dữ liệu:', error);
            }
        };
        fetchData();
    }, []); // Thêm dependency để tránh chạy lại useEffect liên tục
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    });
    // Số lượng sản phẩm hiển thị trên mỗi trang
    const productsPerPage = 8;

    // Lọc sản phẩm dựa trên thương hiệu đã chọn
    const filteredProducts = selectedCategory === 'Tất Cả' 
        ? products 
        : products.filter(product => product[6] === selectedCategory); // product[6] là thương hiệu

    // Tính tổng số trang
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    // Tính chỉ mục của các sản phẩm để hiển thị trên trang hiện tại
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    // Hàm xử lý khi chuyển trang
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        const middleOfPageX = 0; 
        const middleOfPageY = window.innerHeight / 4;
        window.scrollTo(middleOfPageX, middleOfPageY);
    };

    // Hàm xử lý khi thay đổi thương hiệu
    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setCurrentPage(1); // Reset về trang đầu tiên sau khi lọc
    };

    return (
        <>
            {/* Hiển thị danh sách sản phẩm */}
            <div className="bg-white" style={{ marginTop: '-20px' }}>
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    {/* Dropdown menu */}
                    <div className="dropdown-container">
                        <span className="dropdown-title">Thương Hiệu</span> {selectedCategory}<span></span>
                        <div className="dropdown-content">
                            <button onClick={() => handleCategoryChange('Tất Cả')} className="dropdown-item">Tất Cả</button>
                            <button onClick={() => handleCategoryChange('Balenciaga')} className="dropdown-item">Balenciaga</button>
                            <button onClick={() => handleCategoryChange('Puma')} className="dropdown-item">Puma</button>
                            <button onClick={() => handleCategoryChange('Converse')} className="dropdown-item">Converse</button>
                            <button onClick={() => handleCategoryChange('Nike')} className="dropdown-item">Nike</button>
                            <button onClick={() => handleCategoryChange('Adidas')} className="dropdown-item">Adidas</button>
                            <button onClick={() => handleCategoryChange('Vans')} className="dropdown-item">Vans</button>
                            <button onClick={() => handleCategoryChange('Jordan')} className="dropdown-item">Jordan</button>
                            <button onClick={() => handleCategoryChange('No Brand')} className="dropdown-item">No Brand</button>
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 text-center mb-8">Danh Sách Sản Phẩm</h2>
                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {currentProducts.map((product, index) => (
                            <div key={index} className="group relative border border-sky-500 rounded-md">
                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                    <img
                                        src={product[4]}
                                        alt={product[4]}
                                        className="w-full h-full object-cover object-center lg:h-full lg:w-full"
                                    />
                                </div>
                                <div className="mt-4 flex justify-between">
                                    <div>
                                        <h3 className="text-sm text-gray-700">
                                            <Link to={`/product/${product[0]}`}>
                                                <span aria-hidden="true" className="absolute inset-0" />
                                                {product[1]}
                                            </Link>
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500">Mô Tả: {product[2]}</p>
                                        <p className="mt-1 text-sm text-gray-500">Loại: {product[5]}</p>
                                        <p className="mt-1 text-sm text-gray-500">Thương Hiệu: {product[6]}</p>
                                        <p className="mt-1 text-sm text-gray-500">Màu sắc: {product[7]}</p>
                                    </div>
                                    <p className="text-sm font-medium text-gray-900">{formatter.format(product[3])}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Hiển thị phân trang */}
            <div style={{ marginTop: '-10px' }} className="list-page">
                {Array.from({ length: totalPages }).map((_, index) => (
                    <div key={index} className="item">
                        <button className='primary-button' onClick={() => handlePageChange(index + 1)}>{index + 1}</button>
                    </div>
                ))}
            </div>
        </>
    );
};

export default ProductCompoment;
