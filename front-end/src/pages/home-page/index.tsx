import Footer from "components/footer";
import Header from "components/header";
import { useNavigate } from "react-router-dom";

const HomePage = () => {

    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("access_token");
        navigate('/auth/login');
    }

    return (
        <div>
            <Header />
            <button onClick={() => { handleLogout() }}>Đăng xuất</button>
            <div className="container">
                <a href="cart">Cart</a>
            </div>
            <Footer />
        </div>
    )
}

export default HomePage;