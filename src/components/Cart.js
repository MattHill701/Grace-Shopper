import React, { useState } from "react";


const Cart = ({cartItems, setCartItems}) => {

  return (
    <div>
      <h1 className="text-center">Shopping Cart</h1>
      <div className="cart-items">
           {
             cartItems.Length ? cartItems.map((item)=>{
               console.log("this is item",item)
                return (
                  <div>
                    <h3></h3>
                    <h4></h4>
                  </div>
                )
             }) : null
           }
      </div>
    </div>
  );
};

export default Cart