import { useAppSelector } from "app/hook"
import Footer from "components/footer"
import Header from "components/header"
import HorizontalLinearStepper from "components/register-seller-form"
import { authState } from "redux/auth/authSlice"
import "./style.scss";
import ProductListSeller from "components/product-list-seller"
import axios from "axios"
import { useEffect, useState } from "react"

export const MyShop = () => {
    const selector = useAppSelector(authState);
    const user = selector.user;

    const [products, setProducts] = useState([]);
    const getData = async () => {
        const response = await axios.post('http://localhost:5000/product/request', {
            owner_id: user.user_id,
            user_id: user.user_id,
        })
        setProducts(response.data.products);
    }

    useEffect(() => {
        getData();
    }, [])
    return (
        <>
            {
                Object.keys(user).length > 0 &&
                <>
                    <Header />
                    <div className="my-shop">
                        {
                            user.role === 'normal_user' ?
                                (
                                    <div className="container">
                                        <div className="my-shop-main">
                                            <HorizontalLinearStepper />
                                        </div>
                                    </div>
                                )
                                :
                                <div className="container">
                                    <div className="my-shop-main">
                                        <h1 className="my-shop-main-title">Cửa hàng của tôi</h1>
                                        <div className="my-shop-main-manage">
                                            <button className="my-shop-main-manage-add">Thêm sản phẩm mới</button>
                                            <div className="my-shop-main-manage-list">
                                                <ProductListSeller products={products} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        }
                    </div>
                    <Footer />
                </>
            }
        </>
    )
}

export default MyShop;