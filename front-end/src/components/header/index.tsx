import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import "./style.scss";

const Header = () => {
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
                                Tìm kiếm
                            </button>
                        </div>
                        <div className="header-main-user">
                            <Link to="/cart" className="header-main-user-cart">
                                <div className="header-main-user-cart-icon">
                                    <FontAwesomeIcon icon={faCartShopping} />

                                    <div className="header-main-user-cart-icon-quantity">
                                        2
                                    </div>
                                </div>
                                <div className="header-main-user-cart-text">
                                    Giỏ hàng
                                </div>
                            </Link>

                            <div className="header-main-user-profile">
                                <img src="https://picsum.photos/id/237/200/300" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header;