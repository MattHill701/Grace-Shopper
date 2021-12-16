import { getUser } from "../auth";
import React, { useState, useEffect } from "react";
import { finishCart, getOrderById, getAllOrders, checkOut } from "../api";
import { Button } from "react-bootstrap";
import "./myStyles.css";

const Cart = () => {
  const [order, setOrder] = useState([]);
  const [price, setPrice] = useState(0);
  const [products, setProducts] = useState([]);
  let user = getUser();
  // console.log("this is userId", user.userId);
  // console.log("this is order", order)

  async function fetchOrderById() {
    const pinnedOrder = await getOrderById(user.userId);
    setPrice(pinnedOrder.order.totalprice);
    setProducts(pinnedOrder.order.products);
    // console.log("these are products", products)
    let order1 = await finishCart(pinnedOrder);
    setOrder(order1.products);
  }

  useEffect(() => {
    fetchOrderById();
  }, []);

  return (
    <div>
      {/* {console.log("this is order", order)} */}
      {/* {console.log("this is order.products", order.products)} */}

      <h2 className="text-center">Shopping Cart</h2>
      <div className="cart-items">
        {order.map((item) => {
          // console.log("this is item", item);

          return (
            <div className="cart_product" key={`${item.id}`}>
              <h4>{item.name}</h4>
              <h5>${item.price}</h5>
              <h6>{item.description}</h6>
              <h6>x {products.filter((x) => x === item.id).length}</h6>
            </div>
          );
        })}
      </div>
      <div className="checkout_button">
        <Button
          type="submit"
          onClick={(e) => {
            // console.log("this is userID", user.userId)
            // console.log("this is products", products)
            checkOut(user.userId, products);
          }}
        >
          Checkout
        </Button>
      </div>
      <h2 className="pricetotal">TotalPrice: ${price}</h2>
    </div>
  );
};

export default Cart;
