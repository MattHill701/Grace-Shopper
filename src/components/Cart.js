import { getUser } from "../auth";
import React, { useState, useEffect } from "react";
import { getOrderById } from "../api";

const Cart = () => {
  const [order, setOrder] = useState([]);
  
  let user = getUser();
  console.log("this is current user", user);
  console.log("this is userId", user.userId);
  
  async function fetchOrderById() {
    const pinnedOrder = await getOrderById(user.userId);
    console.log("this is order", order);
    setOrder(pinnedOrder);
  }

  useEffect(() => {
    fetchOrderById();
  }, []);



  return (
    <div>
      <h1 className="text-center">Shopping Cart</h1>
      <div className="cart-items">
        {
         order.length
            ? order.map((item) => {
                console.log("this is item", item);
                return (
                  <div>
                    <h3> {item.name}</h3>
                    <h4></h4>
                  </div>
                );
              })
            : null
          }
      </div>
    </div>
  );
};

export default Cart;
