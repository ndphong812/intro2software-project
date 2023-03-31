import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch, useAppSelector } from 'app/hook';
import React, { useEffect, useState } from 'react';
import { authReducer, authState } from 'redux/auth/authSlice';
import { getCarts, removeFromCarts, updateAmountCarts } from 'redux/product/productThunk';
import "./style.scss";

function CartItem({ product_id, name, price, imgSrc, quantity, onUpdateCart, onRemoveFromCart, setCartItems }: {
  product_id: string,
  name: string,
  price: number,
  imgSrc: string,
  quantity: number,
  onUpdateCart: any,
  onRemoveFromCart: any,
  setCartItems: any
}) {

  const [amount, setAmount] = useState(quantity);
  const dispatch = useAppDispatch();
  const selector = useAppSelector(authState);
  const user = selector.user;
  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateCart({ name, price, imgSrc, quantity: Number(event.target.value) });
  };

  const handleRemoveFromCartClick = async () => {
    const response = await dispatch(removeFromCarts({ user_id: user.user_id, product_id: product_id }));
    console.log('response', response)
    if (response.payload.status === "success") {
      const responseReload = await dispatch(getCarts(user.user_id));
      setCartItems(responseReload.payload.cart);
    }
  };

  const handleChangeAmountButton = (number: number) => {
    if (amount + number < 0) {
      setAmount(quantity);
    }
    else {
      console.log('amount + number', amount + number)
      setAmount(amount => amount + number);
      dispatch(updateAmountCarts({
        product_id: product_id,
        user_id: user.user_id,
        amount: amount + number
      }))
    }
  }
  const handleChangeAmount = (e: any) => {
    if (e.target.value < 0) {
      e.target.value = quantity;
    }
    else {
      dispatch(updateAmountCarts({
        product_id: product_id,
        user_id: user.user_id,
        amount: Number(e.target.value)
      }))
    }
  }

  return (
    <div className="cart-item">
      <img src={imgSrc} alt={name} />
      <div className="item-details">
        <h3>{name}</h3>
        <div className="quantity">
          <div className="product-detail-main-infor-stock-input">
            <button onClick={() => handleChangeAmountButton(-1)}>
              <FontAwesomeIcon icon={faMinus} />
            </button>
            <input type="number" value={amount}
              onChange={(e) => handleChangeAmount(e)}
            />
            <button onClick={() => handleChangeAmountButton(1)}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>
        <p>{price} x {quantity} = {(price * quantity).toLocaleString()} đ</p>
        <button onClick={handleRemoveFromCartClick}>Xóa</button>
      </div>
    </div>
  );
}

export default CartItem;