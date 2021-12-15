import { getUser } from "../auth";
import React, { useState, useEffect } from "react";
import { finishCart, getOrderById, getAllOrders } from "../api";

const Cart = () => {
  const [order, setOrder] = useState([]);

  let user = getUser();
  // console.log("this is userId", user.userId);
  // console.log("this is order", order)

  async function fetchOrderById() {
    const pinnedOrder = await getOrderById(user.userId);
    // console.log("this is pinned order", pinnedOrder);
    let order1 = await finishCart(pinnedOrder);
    // console.log("this is order1", order1);
    setOrder(order1.products)
    // console.log("this is orders", order);
  }

  useEffect(() => {
    fetchOrderById();
  }, []);

  return (
    <div>
      {/* {console.log("this is order", order)} */}
      {/* {console.log("this is order.products", order.products)} */}
      
      <h1 className="text-center">Shopping Cart</h1>
      <div className="cart-items">
    
        {order.map((item) => {
          // console.log("this is item", item);
          return (
            <div className="cart_product" key={`${item.id}`}>
              <h2>{item.name}</h2>
              <h3>${item.price}</h3>
              <h6>{item.description}</h6>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cart;
