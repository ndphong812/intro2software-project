import ProductCard from "components/product-card";
import "./style.scss";

const ProductList = () => {
    return (
        <div className="product-list">
            <div className="container">
                <div className="product-list-main">
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                </div>
            </div>
        </div>
    )
}

export default ProductList;