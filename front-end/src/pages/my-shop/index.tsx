import { useAppSelector } from "app/hook"
import Footer from "components/footer"
import Header from "components/header"
import HorizontalLinearStepper from "components/register-seller-form"
import { authState } from "redux/auth/authSlice"
import "./style.scss";
import ProductListSeller from "components/product-list-seller"
import axios from "axios"
import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCartShopping, faClipboard, faClockRotateLeft, faListCheck, faShield, faUser } from "@fortawesome/free-solid-svg-icons"
import { Link, Outlet, useNavigate } from "react-router-dom"

export const MyShop = () => {
    const selector = useAppSelector(authState);
    const user = selector.user;
    const path = window.location.pathname;
    const [products, setProducts] = useState([]);

    const navigate = useNavigate();
    useEffect(() => {
        if (path === "/my-shop")
            navigate("/my-shop/products");
    }, [path])

    return (
        <>
            {
                Object.keys(user).length > 0 &&
                <>
                    <Header />
                    <div className="my-shop">
                        {
                            user.role === 'normal_user' ?
                                (
                                    <div className="container">
                                        <div className="my-shop-main">
                                            <HorizontalLinearStepper />
                                        </div>
                                    </div>
                                )
                                :
                                <div className="my-shop-main">
                                    <h1 className="my-shop-main-title">Cửa hàng của tôi</h1>
                                    <div className="my-shop-main-manage">
                                        <div className="my-shop-main-manage-sidebar">
                                            <div
                                                className={`my-shop-main-manage-sidebar-group 
                                        ${path == '/my-shop/products' && "my-shop-main-manage-sidebar-group-active"} 
                                        `}>
                                                <div className="my-shop-main-manage-sidebar-group-icon">
                                                    <FontAwesomeIcon icon={faListCheck} />
                                                </div>
                                                <Link to="/my-shop/products" className="my-shop-main-manage-sidebar-group-title">
                                                    Quản lý sản phẩm
                                                </Link>
                                            </div>
                                            <div
                                                className={`my-shop-main-manage-sidebar-group 
                                        ${path == '/my-shop/history' && "my-shop-main-manage-sidebar-group-active"} 
                                        `}>
                                                <div className="my-shop-main-manage-sidebar-group-icon">
                                                    <FontAwesomeIcon icon={faClockRotateLeft} />
                                                </div>
                                                <Link to="/my-shop/history" className="my-shop-main-manage-sidebar-group-title">
                                                    Lịch sử bán hàng
                                                </Link>
                                            </div>
                                            <div
                                                className={`my-shop-main-manage-sidebar-group 
                                        ${path == '/my-shop/orders' && "my-shop-main-manage-sidebar-group-active"} 
                                        `}>
                                                <div className="my-shop-main-manage-sidebar-group-icon">
                                                    <FontAwesomeIcon icon={faClipboard} />
                                                </div>
                                                <Link to="/my-shop/orders" className="my-shop-main-manage-sidebar-group-title">
                                                    Đơn hàng chưa xử lý
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="my-shop-main-manage-content">
                                            <Outlet />
                                        </div>
                                    </div>
                                </div>
                        }
                    </div>
                    <Footer />
                </>
            }
        </>
    )
}

export default MyShop;