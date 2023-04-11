import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch, useAppSelector } from 'app/hook';
import React, { useEffect, useState } from 'react';
import { authReducer, authState } from 'redux/auth/authSlice';
import { getCarts, removeFromCarts, updateAmountCarts } from 'redux/product/productThunk';
import "./style.scss";

function OrderItem({ product_id, name, price, imgSrc, quantity }: {
    product_id: string,
    name: string,
    price: number,
    imgSrc: string,
    quantity: number,
}) {

    return (
        <div className="order-item">
            <div className="order-item-details">
                <div className="order-item-details-main">
                    <img src={imgSrc} alt={name} />
                    <h3>{name}</h3>
                </div>
                <div className="order-item-details-quantity">
                    <div className="product-detail-main-infor-stock-input">
                        <p>{quantity}</p>
                    </div>
                </div>
                <p className='order-item-details-price'>{price.toLocaleString()} đ</p>
                <p className='order-item-details-total'>{(price * quantity).toLocaleString()} đ</p>
            </div>
        </div>
    );
}

export default OrderItem;