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


    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [productList, setProductList] = useState<Product[]>([]);
    const getProductList = async () => {
        const response = await dispatch(getAllProduct());
        setIsLoading(false);
        setProductList(response.payload.products);
    }

    useEffect(() => {
        getProductList();
    }, [])

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
            <ProductList list={productList} />
            <Footer />
        </div>
    )
}

export default HomePage;