import 'react-dropdown/style.css';
import { Avatar, Box, Divider, IconButton, ListItemIcon, Tooltip } from "@mui/material";
import { useState } from "react";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Logout from '@mui/icons-material/Logout';
import Store from '@mui/icons-material/Store';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faSearch } from '@fortawesome/free-solid-svg-icons';
import "./style.scss";
import { useAppDispatch, useAppSelector } from 'app/hook';
import { authSlice, authState, logout } from 'redux/auth/authSlice';
const Header = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const selector = useAppSelector(authState);
    const user = selector.user;
    const isLoggin = selector.isLoggin;

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleClose();
        dispatch(logout());
        navigate("/auth/login");
    }

    const handleAccount = () => {
        handleClose();
        navigate("/profile");
    }

    return (
        <>
            <div className="header">
                <div className="container">
                    <div className="header-main">
                        <div className="header-main-logo">
                            <Link to="/">
                                <img src="https://preview.colorlib.com/theme/electro/img/logo.png" />
                            </Link>
                        </div>
                        <div className="header-main-search">
                            <input className="header-main-search-input" placeholder="Nhập sản phẩm cần tìm kiếm" />
                            <button className="header-main-search-button">
                                <p className='header-main-search-button-desktop'>Tìm kiếm</p>
                                <FontAwesomeIcon className='header-main-search-button-mobile' icon={faSearch} />
                            </button>
                        </div>
                        <div className="header-main-user">
                            <div className="header-main-user-upper">
                                <Link to="/cart" className="header-main-user-upper-cart">
                                    <div className="header-main-user-upper-cart-icon">
                                        <FontAwesomeIcon icon={faCartShopping} />

                                        <div className="header-main-user-upper-cart-icon-quantity">
                                            2
                                        </div>
                                    </div>
                                    <div className="header-main-user-upper-cart-text">
                                        Giỏ hàng
                                    </div>
                                </Link>

                                <div className="header-main-user-upper-profile">
                                    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                                        <IconButton
                                            onClick={handleClick}
                                            size="small"
                                            sx={{ ml: 2 }}
                                            aria-controls={open ? 'account-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={open ? 'true' : undefined}
                                        >
                                            {
                                                (Object.keys(user).length > 0 && user.avatar_link) ?
                                                    <Avatar sx={{ width: 40, height: 40 }} src={user.avatar_link as string} />
                                                    :
                                                    <Avatar sx={{ width: 40, height: 40 }} />

                                            }
                                        </IconButton>
                                    </Box>
                                    <Menu
                                        anchorEl={anchorEl}
                                        id="account-menu"
                                        open={open}
                                        onClose={handleClose}
                                        onClick={handleClose}
                                        PaperProps={{
                                            elevation: 0,
                                            sx: {
                                                overflow: 'visible',
                                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                                mt: 1.5,
                                                '& .MuiAvatar-root': {
                                                    width: 32,
                                                    height: 32,
                                                    ml: -0.5,
                                                    mr: 1,
                                                },
                                                '&:before': {
                                                    content: '""',
                                                    display: 'block',
                                                    position: 'absolute',
                                                    top: 0,
                                                    right: 14,
                                                    width: 10,
                                                    height: 10,
                                                    bgcolor: 'background.paper',
                                                    transform: 'translateY(-50%) rotate(45deg)',
                                                    zIndex: 0,
                                                },
                                            },
                                        }}
                                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                    >
                                        <MenuItem onClick={() => handleAccount()}>
                                            <Avatar />
                                            {
                                                isLoggin ? "Tài khoản" : "Đăng nhập"
                                            }
                                        </MenuItem>
                                        <MenuItem onClick={handleClose}>
                                            <ListItemIcon>
                                                <Store fontSize="small" />
                                            </ListItemIcon>
                                            Shop của tôi
                                        </MenuItem>
                                        {
                                            isLoggin && <Divider />
                                        }
                                        {
                                            isLoggin &&
                                            <MenuItem onClick={() => handleLogout()}>
                                                <ListItemIcon>
                                                    <Logout fontSize="small" />
                                                </ListItemIcon>
                                                Đăng xuất
                                            </MenuItem>
                                        }
                                    </Menu>
                                </div>
                            </div>
                            {
                                (Object.keys(user).length > 0 && user.email) ?
                                    <div className="header-main-user-lower">
                                        <p>
                                            Xin chào,
                                        </p>
                                        <p>
                                            {user.email}
                                        </p>
                                    </div>
                                    :

                                    <div className="header-main-user-lower">
                                        Xin chào
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header;