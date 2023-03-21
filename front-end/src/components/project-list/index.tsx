import { useAppDispatch } from "app/hook";
import axios from "axios";
import ProductCard from "components/product-card";
import { useEffect, useState } from "react";
import { getAllProduct } from "redux/product/productThunk";
import { Product } from "redux/product/type";
import "./style.scss";

type Props = {
    list: Product[]
}
const ProductList: React.FC<Props> = ({ list }) => {

    return (
        <div className="product-list">
            <div className="container">
                <div className="product-list-main">
                    {
                        list.map((product: Product, index: number) => {
                            return (
                                <ProductCard key={index} product={product} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default ProductList;