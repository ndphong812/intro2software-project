import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "components/footer";
import Header from "components/header";
import { Link, useNavigate } from "react-router-dom";
import "./style.scss";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "app/hook";
import { authState } from "redux/auth/authSlice";
import { getCarts } from "redux/product/productThunk";
import numeral from "numeral";
import OrderItem from "components/order-item";
import { Ordered } from "redux/product/type";
import axios from "axios";
import { SwalAlert } from "utils/sweet-alter";
const Checkout = () => {

    const [cartItems, setCartItems] = useState<any[]>([]);
    const selector = useAppSelector(authState);
    const user = selector.user;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const getData = async () => {
        const response = await dispatch(getCarts(user.user_id as string));
        setCartItems(response.payload.cart);
    }
    useEffect(() => {
        getData();
    }, [])

    const handleConfirmOrder = async () => {
        const orders = cartItems.map((cartItem) => {
            const newOrder: Ordered = {
                order_id: cartItem.product_id.owner_id,
                product_id: cartItem.product_id.product_id,
                customer_id: user.user_id,
                amount: cartItem.amount,
                date_time: new Date(),
                note: "",
                status: "",
                total_monney: 0
            }
            return newOrder;
        })
        console.log('orders', orders)
        const response: any = await axios.post("http://localhost:5000/order/add", orders);
        console.log('response', response);
        SwalAlert("success", response.data.message, "success").then(result => {
            navigate("/");
        });
    }
    return (
        <>
            <Header />
            <div className="checkout">
                <div className="container">
                    <div className="checkout-main">
                        <div className="checkout-main-user">
                            <div className="checkout-main-user-location">
                                <FontAwesomeIcon icon={faLocationDot} />
                                <span className="checkout-main-user-location-text">
                                    Địa chỉ nhận hàng
                                </span>
                            </div>
                            <div className="checkout-main-user-detail">
                                <span className="checkout-main-user-detail-name">Nguyễn Đình Phong (+84) 387672029</span>
                                <span>Thôn 3, Xã Vinh Hà, Huyện Phú Vang, Thừa Thiên Huế</span>
                                <div className="checkout-main-user-detail-change">
                                    <Link to="/profile">Thay đổi</Link>
                                </div>
                            </div>
                        </div>
                        <div className="checkout-main-order">
                            <div className="checkout-main-order-title">
                                <p className="checkout-main-order-title-name">Sản phẩm</p>
                                <p className="checkout-main-order-title-price">Đơn giá</p>
                                <p className="checkout-main-order-title-amount">Số lượng</p>
                                <p className="checkout-main-order-title-total">Thành tiền</p>
                            </div>
                            <div>
                                {cartItems.map((item, index) => (
                                    <OrderItem
                                        product_id={item.product_id.product_id}
                                        key={index}
                                        imgSrc={item.product_id.image_link}
                                        name={item.product_id.name}
                                        price={item.product_id.sale_price}
                                        quantity={item.amount}
                                    />
                                ))}
                                <p className='total'><strong>Tổng tiền: </strong>
                                    {`${numeral(cartItems.reduce(
                                        (acc, item) => acc + item.product_id.sale_price * item.amount, 0)).format('0,0')} đ`}
                                </p>
                                <div className='checkout-btn'>
                                    <button className='checkout' onClick={() => handleConfirmOrder()}>
                                        Đặt hàng
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Checkout;