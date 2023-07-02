import { useAppDispatch } from "app/hook";
import axios from "axios";
import ProductCard from "components/product-card";
import { useEffect, useState } from "react";
import { getAllProduct } from "redux/product/productThunk";
import { Product } from "redux/product/type";
import "./style.scss";

type Props = {
  list: Product[];
  setPage?: (index: number) => void;
  numberPages?: number;
};
const ProductList: React.FC<Props> = ({ list, setPage, numberPages }) => {
  console.log("numberPages", numberPages);
  const handleTransferPage = (index: number) => {
    setPage && setPage(index);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <div className="product-list">
      <div className="container">
        {list.length > 0 && (
          <>
            <div className="product-list-main">
              {list.map((product: Product, index: number) => {
                return <ProductCard key={index} product={product} />;
              })}
            </div>

            <div className="product-list-divide-pages">
              {numberPages &&
                Array.from({ length: numberPages }, (_, index) => (
                  <button
                    onClick={() => handleTransferPage(index + 1)}
                    className="product-list-divide-pages-button"
                  >
                    {index + 1}
                  </button>
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductList;
