import { getUser } from "../auth";
import React, { useState, useEffect } from "react";
import { finishCart, getOrderById, getAllOrders, checkOut } from "../api";
import { Button } from "react-bootstrap";
import "./myStyles.css";

const Cart = () => {
  const [order, setOrder] = useState([]);
  const [price, setPrice] = useState(0);

  let user = getUser();
  // console.log("this is userId", user.userId);
  // console.log("this is order", order)

  async function fetchOrderById() {
    const pinnedOrder = await getOrderById(user.userId);
    setPrice(pinnedOrder.order.totalprice);
    console.log("totalprice", pinnedOrder.order.totalprice)
    console.log("this is pinned order", pinnedOrder);
    console.log("this is price", price)
    let order1 = await finishCart(pinnedOrder);
    // console.log("this is order1", order1);
    setOrder(order1.products);
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
      <div className="checkout_button">
        <Button type="submit" onClick={() => {}}>
          Checkout
        </Button>
      </div>
      <h2 className="pricetotal">TotalPrice: ${price}</h2>
    </div>
  );
};

export default Cart;
