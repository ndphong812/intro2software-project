import { useAppDispatch } from "app/hook";
import axios from "axios";
import Footer from "components/footer";
import Header from "components/header";
import ProductList from "components/project-list";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchProduct } from "redux/product/productThunk";
import { Product } from "redux/product/type";

const SearchPage = () => {

    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [productList, setProductList] = useState<Product[]>([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const keyword = searchParams.get("keyword");

    const getSearchResponse = async () => {

        try {
            const response = await dispatch(searchProduct(keyword as string));
            console.log('response', response);
            setIsLoading(false);
            setProductList(response.payload.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getSearchResponse();
    }, [])
    return (
        <>
            <Header />
            <ProductList list={productList} />
            <Footer />
        </>
    )
}

export default SearchPage;