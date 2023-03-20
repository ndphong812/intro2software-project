import axios from "axios";
import ProductCard from "components/product-card";
import { useEffect, useState } from "react";
import { Product } from "redux/product/type";
import "./style.scss";

const ProductList = () => {

    const [productList, setProductList] = useState<Product[]>([]);
    const getProductList = async () => {
        const response = await axios.get("http://localhost:5000/product");
        setProductList(response.data.products)
    }

    useEffect(() => {
        getProductList();
    }, [])
    return (
        <div className="product-list">
            <div className="container">
                <div className="product-list-main">
                    {
                        productList.map((product: Product, index: number) => {
                            return (
                                <ProductCard product={product} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default ProductList;