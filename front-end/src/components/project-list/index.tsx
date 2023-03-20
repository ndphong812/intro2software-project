import { useAppDispatch } from "app/hook";
import axios from "axios";
import ProductCard from "components/product-card";
import { useEffect, useState } from "react";
import { getAllProduct } from "redux/product/productThunk";
import { Product } from "redux/product/type";
import "./style.scss";

const ProductList = () => {

    const dispatch = useAppDispatch();
    const [productList, setProductList] = useState<Product[]>([]);
    const getProductList = async () => {
        const response = await dispatch(getAllProduct());
        setProductList(response.payload.products);
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