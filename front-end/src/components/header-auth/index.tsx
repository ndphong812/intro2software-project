import { Link } from "react-router-dom"
import "./style.scss";
import Logo from "assets/images/logo.png";
export const HeaderAuth = () => {
    return (
      <>
        <div className="header-auth">
          <div className="container">
            <div className="header-auth-logo">
              <Link to="/">
                <img src={Logo} />
              </Link>
            </div>
          </div>
        </div>
      </>
    );
}