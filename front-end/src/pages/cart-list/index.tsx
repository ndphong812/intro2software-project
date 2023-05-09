import React, { useEffect, useState } from 'react';
import { Product } from 'redux/product/type';
import "./style.scss";
import CartItem from "components/cart-item";
import { useAppDispatch, useAppSelector } from 'app/hook';
import { authState } from 'redux/auth/authSlice';
import { getCarts } from 'redux/product/productThunk';
import numeral from 'numeral';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';


function Cart() {

  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const selector = useAppSelector(authState);
  const user = selector.user;
  const dispatch = useAppDispatch();

  const getData = async () => {
    const response = await dispatch(getCarts(user.user_id as string));
    setCartItems(response.payload.cart);
  }
  useEffect(() => {
    getData();
  }, [])

  const handleGoToCheckout = () => {
    navigate("/checkout");
  }

  console.log("cartItems", cartItems)
  return (
    <div className="shopping-cart">
      {
        !cartItems &&
        (
          <div>Giỏ hàng của bạn đang trống</div>
        )
      }
      {
        cartItems && cartItems.length > 0 &&
        <div>
          {cartItems.map((item, index) => (
            <CartItem
              product_id={item.product_id.product_id}
              key={index}
              imgSrc={item.product_id.image_link}
              name={item.product_id.name}
              price={item.product_id.sale_price}
              quantity={item.amount}
              setCartItems={setCartItems}
            />
          ))}
          <p className='total'><strong>Tổng tiền: </strong>
            {`${numeral(cartItems.reduce(
              (acc, item) => acc + item.product_id.sale_price * item.amount, 0)).format('0,0')} đ`}
          </p>
          <div className='checkout-btn'>
            <button className='checkout' onClick={() => handleGoToCheckout()}>
              Thanh toán
            </button>
          </div>
        </div>
      }
    </div>
  );
}

export default Cart;
