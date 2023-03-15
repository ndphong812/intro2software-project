import React, { useState } from 'react';
import "./style.css"
const ProductCard = ()=>{
    const{useState}=React;
const [addcart,setaddcart]=useState(1);
const[heart,setheart]=useState(true);
    const AddCart=()=>{
        if(addcart<10){ setaddcart(addcart+1); } }; const DecBag=()=>{
            if(addcart>=1){
            setaddcart(addcart-1);
            }
            };
        
    const Heart=()=>{
        if(heart){
            setheart(false);
            }
        else{
            setheart(true);
            }
            }
    return(
        <>
            <div className="card-container">
            <div className="card">
                <i className="fa fa-long-arrow-left"></i>
                <div className="image">
                    <img src="https://preview.colorlib.com/theme/electro/img/product01.png" />

                </div>
                <div className="text">
                    <h5>Category</h5>
                    <h3>PRODUCT NAME</h3>
                    <p>32 reviews</p>
                </div>
                <div className="price">
                        <h3>$15.90</h3>
                        <div className="qty">
                            <i onClick={AddCart} className="fa fa-plus"></i>
                        </div>
                    </div>
                <div className="last_section">
                        <button onClick={AddCart}>Add to cart</button>
                        <div className="heart">
                            <i onClick={Heart} className={`fa ${heart ? "fa-heart-o" : "fa-heart" }`}></i>
                        </div>
                    </div>
            </div>
            </div>
            
        </>
    )
}

export default ProductCard;