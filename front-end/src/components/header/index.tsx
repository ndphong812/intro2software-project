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
                                <img src="https://preview.colorlib.com/theme/electro/img/logo.png"/>
                            </Link>
                        </div>
                        <div className="header-main-search">
                            Search
                        </div>
                        <div className="header-main-user">
                            User
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header;