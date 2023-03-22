import React from 'react';
function CartItem({ name, price, imgSrc, quantity, onUpdateCart, onRemoveFromCart }: { 
    name: string, 
    price: number, 
    imgSrc: string, 
    quantity: number, 
    onUpdateCart: any, 
    onRemoveFromCart: any 
  }) {
    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onUpdateCart({ name, price, imgSrc, quantity: Number(event.target.value) });
    };
  
    const handleRemoveFromCartClick = () => {
      onRemoveFromCart({ name, price, imgSrc, quantity });
    };
  
    return (
      <div className="cart-item">
        <img src={imgSrc} alt={name} />
        <div className="item-details">
          <h3>{name}</h3>
          <p>{price} x {quantity} = {(price * quantity).toLocaleString()} đ</p>
          <div className="quantity">
            <label htmlFor="quantity-input">Số lượng:</label>
            <input type="number" id="quantity-input" value={quantity} min={1} onChange={handleQuantityChange} />
          </div>
          <button onClick={handleRemoveFromCartClick}>Xóa</button>
        </div>
      </div>
    );
  }
  
  export default CartItem;
  