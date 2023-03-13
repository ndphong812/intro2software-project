import { Link } from "react-router-dom"
import "./style.scss";

export const HeaderAuth = () => {
    return (
        <>
            <div className="header-auth">
                <div className="container">
                    <div className="header-auth-logo">
                        <Link to="/">
                            <img src="https://preview.colorlib.com/theme/electro/img/logo.png" />
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}