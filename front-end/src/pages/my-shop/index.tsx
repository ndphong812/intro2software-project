import { useAppSelector } from "app/hook"
import Footer from "components/footer"
import Header from "components/header"
import HorizontalLinearStepper from "components/register-seller-form"
import { authState } from "redux/auth/authSlice"
import "./style.scss";

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
                                <h1>This is My Shop</h1>
                        }
                    </div>
                    <Footer />
                </>
            }
        </>
    )
}

export default MyShop;