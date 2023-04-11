import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch, useAppSelector } from 'app/hook';
import React, { useEffect, useState } from 'react';
import { authReducer, authState } from 'redux/auth/authSlice';
import { getCarts, removeFromCarts, updateAmountCarts } from 'redux/product/productThunk';
import "./style.scss";

function CartItem({ product_id, name, price, imgSrc, quantity, setCartItems }: {
  product_id: string,
  name: string,
  price: number,
  imgSrc: string,
  quantity: number,
  setCartItems: any
}) {

  const [amount, setAmount] = useState(quantity);
  const dispatch = useAppDispatch();
  const selector = useAppSelector(authState);
  const user = selector.user;

  const handleRemoveFromCartClick = async () => {
    const response = await dispatch(removeFromCarts({ user_id: user.user_id, product_id: product_id }));
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
      <div className="item-details">
        <div className="item-details-main">
          <img src={imgSrc} alt={name} />
          <h3>{name}</h3>
        </div>
        <div className="item-details-quantity">
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
        <p className='item-details-price'>{price} x {quantity} = {(price * quantity).toLocaleString()} đ</p>
        <button className='item-details-btn' onClick={handleRemoveFromCartClick}>Xóa</button>
      </div>
    </div>
  );
}

export default CartItem;