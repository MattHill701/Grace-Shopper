import { getUser } from "../auth";
import React, { useState, useEffect } from "react";
import { finishCart, getOrderById } from "../api";

const Cart = () => {
  const [order, setOrder] = useState([]);
  // const [order1, setOrder1] = useState([]);
  // let order;
  let user = getUser();
  // console.log("this is current user", user);
  // console.log("this is userId", user.userId);

  async function fetchOrderById() {
    const pinnedOrder = await getOrderById(user.userId);
    console.log("this is pinned order", pinnedOrder)
    let order1 = await finishCart(pinnedOrder)
    console.log("this is order1", order1)
    setOrder(order1)
  }


  useEffect(() => {
    fetchOrderById();
  }, []);

  console.log("this is order", order)
    
  return (
  
    <div>
      {
        console.log("this is order11", order)
      }
      <h1 className="text-center">Shopping Cart</h1>
      <div className="cart-items">
        { 
        order !== undefined
            ? order.products.map((item) => {
                console.log("this is item", item);
                return (
                  <div className="cart_product" key={`${item.id}`}>
                    <h3>{item.name}</h3>
                    <h3>{item.price}</h3>
                    <h6>{item.description}</h6>

                  </div>
                );
              })
          : null}
      </div>
    </div>
  );
};

export default Cart;
