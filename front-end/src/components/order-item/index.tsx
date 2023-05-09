import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch, useAppSelector } from 'app/hook';
import React, { useEffect, useState } from 'react';
import { authReducer, authState } from 'redux/auth/authSlice';
import { getCarts, removeFromCarts, updateAmountCarts } from 'redux/product/productThunk';
import "./style.scss";
import { TextareaAutosize } from '@mui/material';

type Props = {
    product_id: string,
    name: string,
    price: number,
    imgSrc: string,
    quantity: number,
    handleChangeNote: (product_id: string, content: string) => void
}

const OrderItem: React.FC<Props> = ({ product_id, name, price, imgSrc, quantity, handleChangeNote }) => {

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
            <TextareaAutosize
                onChange={(e) => handleChangeNote(product_id, e.target.value)}
                placeholder="Ghi chú cho chủ shop"
                style={{ width: '40%', marginTop: '10px' }}
                minRows={2}
            />
        </div>
    );
}

export default OrderItem;