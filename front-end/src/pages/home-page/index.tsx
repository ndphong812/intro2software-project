import Footer from "components/footer";
import Header from "components/header";

const HomePage = () => {
    return (
        <div>
            <Header />
            <div className="container">
                <a href="cart">Cart</a>
            </div>
            <Footer />
        </div>
    )
}

export default HomePage;