import React, { useState } from 'react';
import CartItem from "components/cart-item";


interface Product {
quantity: number;
  name: string;
  price: number;
  imgSrc: string;
}

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
    <div className="cart">
      <h2>Giỏ hàng</h2>
      {cartItems.length === 0 ? (
        <p>Giỏ hàng của bạn chưa có sản phẩm nào.</p>
      ) : (
        <div>
          {cartItems.map(item => (
            <CartItem 
              key={item.name} 
              name={item.name} 
              price={item.price} 
              imgSrc={item.imgSrc} 
              quantity={item.quantity} 
              onUpdateCart={handleUpdateCart}
              onRemoveFromCart={handleRemoveFromCart} 
            />
          ))}
          <p><strong>Tổng: </strong>{cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)} đ</p>
        </div>
      )}
    </div>
  );
}

export default Cart;
