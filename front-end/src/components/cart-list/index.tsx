import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Product } from 'redux/product/type';
import "./style.scss";
import numeral from "numeral";
import StarRatings from 'react-star-ratings';
import { useNavigate } from 'react-router-dom';
import ProductCard from 'components/product-card';
import CartItem from "components/cart-item";


function Cart() {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const handleAddToCart = (product: Product) => {
    const existingItem = cartItems.find(item => item.name === product.name);
    if (existingItem) {
      setCartItems(cartItems.map(item => item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const handleUpdateCart = (product: Product) => {
    setCartItems(cartItems.map(item => item.name === product.name ? product : item));
  };

  const handleRemoveFromCart = (product: Product) => {
    setCartItems(cartItems.filter(item => item.name !== product.name));
  };

  return (
    <div className="shopping-cart">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is emty.</p>
      ) : (
        <div>
          {cartItems.map(item => (
              <CartItem 
              imgSrc={item.image_link} 
              name={item.name} 
              price={item.sale_price} 
              quantity={item.quantity} 
              onUpdateCart={handleUpdateCart}
              onRemoveFromCart={handleRemoveFromCart} 
            />
          ))}
          <p><strong>Subtotal: </strong>{cartItems.reduce((acc, item) => acc + item.sale_price * item.quantity, 0)} đ</p>
        </div>
      )}
    </div>
  );
}

export default Cart;
