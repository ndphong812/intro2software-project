import { useAppSelector } from "app/hook"
import Footer from "components/footer"
import Header from "components/header"
import HorizontalLinearStepper from "components/register-seller-form"
import { authState } from "redux/auth/authSlice"
import "./style.scss";
import ProductListSeller from "components/product-list-seller"

export const MyShop = () => {
    const selector = useAppSelector(authState);
    const user = selector.user;
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
                                                <ProductListSeller />
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