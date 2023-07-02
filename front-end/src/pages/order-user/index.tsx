import React, { useEffect, useState } from "react";
import { Product } from "redux/product/type";
import CartItem from "components/cart-item";
import { useAppDispatch, useAppSelector } from "app/hook";
import { authState } from "redux/auth/authSlice";
import { getCarts, historyUser } from "redux/product/productThunk";
import numeral from "numeral";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

function OrderUser() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const selector = useAppSelector(authState);
  const user = selector.user;
  const dispatch = useAppDispatch();

  const getData = async () => {
    const request = {
      customer_id: user.user_id,
    };
    const response = await dispatch(historyUser(request));
    setCartItems(response.payload.orders);
  };
  useEffect(() => {
    getData();
  }, []);

  const handleGoToCheckout = () => {
    navigate("/checkout");
  };

  console.log("cartItems", cartItems);
  return (
    <div className="shopping-cart">
      {!cartItems && <div>Giỏ hàng của bạn đang trống</div>}
      {cartItems && cartItems.length > 0 && (
        <div>
          {cartItems.map((item, index) => (
            // <CartItem
            //   product_id={item.product_id.product_id}
            //   key={index}
            //   imgSrc={item.product_id.image_link}
            //   name={item.product_id.name}
            //   price={item.product_id.sale_price}
            //   quantity={item.amount}
            //   setCartItems={setCartItems}
            // />

            <div className="cart-item">
              <div className="item-details">
                <div className="item-details-main">
                  <img src={item.image_link} />
                  <h3>{item.name}</h3>
                </div>
                {/* <p className="item-details-price">
                  {price} x {quantity} = {(price * quantity).toLocaleString()} đ
                </p>
                <button
                  className="item-details-btn"
                  onClick={handleRemoveFromCartClick}
                >
                  Xóa
                </button> */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderUser;
