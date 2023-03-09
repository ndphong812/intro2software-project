import Footer from "components/footer";
import Header from "components/header";
import ProductList from "components/project-list";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    return (
        <div>
            <Header />
            <ProductList />
            <Footer />
        </div>
    )
}

export default HomePage;