import { useAppDispatch } from "app/hook";
import Footer from "components/footer";
import Header from "components/header";
import ProductList from "components/project-list";
import { useEffect, useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import { getAllProduct } from "redux/product/productThunk";
import { Product } from "redux/product/type";
import { loadingOveride } from "utils/loading";

const HomePage = () => {

    const [page, setPage] = useState(1);
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [productList, setProductList] = useState<Product[]>([]);
    const getProductList = async (page: number) => {
        const response = await dispatch(getAllProduct(page));
        setIsLoading(false);
        setProductList(response.payload.products);
    }

    useEffect(() => {
        console.log("useEffect")
        getProductList(page);
    }, [page])

    return (
        <div>
            <Header />
            <BeatLoader
                color={"#D10024"}
                loading={isLoading}
                cssOverride={loadingOveride}
                size={20}
                margin={2}
                speedMultiplier={1}
            />
            <ProductList list={productList} setPage={setPage} />
            <Footer />
        </div>
    )
}

export default HomePage;