import { faBell, faCartShopping, faClipboard, faShield, faUser, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar } from "@mui/material";
import { useAppSelector } from "app/hook";
import Footer from "components/footer";
import Header from "components/header";
import ApplicationPage from "pages/application-page";
import { useEffect } from "react";
import { Link, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { authState } from "redux/auth/authSlice";
import "./style.scss";

const Profile = () => {

    const path = window.location.pathname;

    const navigate = useNavigate();
    useEffect(() => {
        if (path === "/profile")
            navigate("/profile/account");
    }, [path])


    const selector = useAppSelector(authState);
    const user = selector.user;
    return (
        <>
            {
                Object.keys(user).length > 0 &&
                <>
                    <Header />
                    <div className="profile-user">
                        <div className="container">
                            <div className="profile-user-main">
                                <div className="profile-user-main-sidebar">
                                    <div className="profile-user-main-sidebar">
                                        <div className="profile-user-main-sidebar-upper">
                                            <Avatar sx={{ width: 45, height: 45 }} src={user.avatar_link} />
                                            <p className="profile-user-main-sidebar-upper-email">nguyendinhphonglove08@gmail.com</p>
                                        </div>
                                        <div className="profile-user-main-sidebar-lower">
                                            <div
                                                className={`profile-user-main-sidebar-lower-group 
                                        ${path == '/profile/account' && "profile-user-main-sidebar-lower-group-active"} 
                                        `}>
                                                <FontAwesomeIcon
                                                    icon={faUser} />
                                                <Link to="/profile/account" className="profile-user-main-sidebar-lower-group-title">
                                                    Hồ sơ
                                                </Link>
                                            </div>
                                            <div
                                                className={`profile-user-main-sidebar-lower-group 
                                        ${path == '/profile/change-password' && "profile-user-main-sidebar-lower-group-active"} 
                                        `}>
                                                <FontAwesomeIcon icon={faShield} />
                                                <Link to="/profile/change-password" className="profile-user-main-sidebar-lower-group-title">
                                                    Đổi mật khẩu
                                                </Link>
                                            </div>
                                            <div
                                                className={`profile-user-main-sidebar-lower-group 
                                        ${path == '/profile/cart' && "profile-user-main-sidebar-lower-group-active"} 
                                        `}>
                                                <FontAwesomeIcon
                                                    icon={faCartShopping} />
                                                <Link to="/profile/cart" className="profile-user-main-sidebar-lower-group-title">
                                                    Giỏ hàng
                                                </Link>
                                            </div>
                                            <div
                                                className={`profile-user-main-sidebar-lower-group 
                                        ${path == '/profile/order' && "profile-user-main-sidebar-lower-group-active"} 
                                        `}>
                                                <FontAwesomeIcon
                                                    icon={faClipboard} />
                                                <Link to="/profile/order" className="profile-user-main-sidebar-lower-group-title">
                                                    Đơn mua
                                                </Link>
                                            </div>
                                            {/* <div
                                                className={`profile-user-main-sidebar-lower-group 
                                        ${path == '/profile/notification' && "profile-user-main-sidebar-lower-group-active"} 
                                        `}>
                                                <FontAwesomeIcon
                                                    icon={faBell} />
                                                <Link to="/profile/notification" className="profile-user-main-sidebar-lower-group-title">
                                                    Thông báo
                                                </Link>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                                <Outlet />
                            </div>
                        </div>
                    </div>
                    <Footer />
                </>
            }
        </>
    )
}
export default Profile;